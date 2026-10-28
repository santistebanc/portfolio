import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import {
  Spring,
  VelocityTracker,
  SPRING_MOMENTUM,
  SPRING_SMOOTH,
  nearest,
  project,
  rubberbandClamp,
} from './physics'

interface Item {
  key: string
  title: string
  node: ReactNode
}

const SLOP = 8 // px of hysteresis before a drag commits to a direction
const FLICK = 450 // px/s above which the release counts as momentum

/**
 * A gallery that follows the finger 1:1, projects flicks forward, rubber-bands
 * at the ends and settles on a spring. It can be grabbed mid-flight.
 */
export function Carousel({ label, items }: { label: string; items: Item[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const api = useRef<{ go: (i: number) => void } | null>(null)
  const [index, setIndex] = useState(0)
  const [stops, setStops] = useState(1)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const spring = new Spring(0, (x) => {
      track.style.transform = `translate3d(${x}px, 0, 0)`
    })
    const tracker = new VelocityTracker()

    let snaps = [0]
    let min = 0
    let current = 0

    const measure = () => {
      const cards = Array.from(track.children) as HTMLElement[]
      if (cards.length === 0) return
      const first = cards[0].offsetLeft
      const max = Math.max(0, track.offsetWidth - viewport.clientWidth)
      const next: number[] = []
      for (const card of cards) {
        const x = -Math.round(Math.min(card.offsetLeft - first, max))
        if (!next.includes(x)) next.push(x)
      }
      snaps = next
      min = -max
      current = Math.min(current, snaps.length - 1)
      setStops(snaps.length)
      setIndex(current)
      spring.set(snaps[current])
    }

    const settle = (i: number, velocity = 0) => {
      current = Math.max(0, Math.min(snaps.length - 1, i))
      setIndex(current)
      const momentum = Math.abs(velocity) > FLICK && spring.value <= 0 && spring.value >= min
      spring.to(snaps[current], { velocity, config: momentum ? SPRING_MOMENTUM : SPRING_SMOOTH })
    }

    api.current = { go: (i) => settle(i) }

    // ---- Pointer: hysteresis, then 1:1 tracking from the grab point ----
    let mode: 'idle' | 'pending' | 'drag' = 'idle'
    let pointerId = -1
    let startX = 0
    let startY = 0
    let startValue = 0
    let suppressClick = false

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || snaps.length < 2) return
      // Grabbing a moving gallery stops it where it is (presentation value)
      // and swallows the tap, like touching a scrolling list.
      suppressClick = spring.animating
      spring.stop()
      mode = 'pending'
      pointerId = e.pointerId
      startX = e.clientX
      startY = e.clientY
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      if (mode === 'pending') {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        if (Math.abs(dx) > SLOP && Math.abs(dx) > Math.abs(dy)) {
          mode = 'drag'
          suppressClick = true
          viewport.setPointerCapture(e.pointerId)
          viewport.dataset.dragging = ''
          // Rebase so the content doesn't jump by the slop distance.
          startX = e.clientX
          startValue = spring.value
          tracker.reset()
          tracker.add(startValue)
        } else if (Math.abs(dy) > SLOP) {
          mode = 'idle' // vertical intent: let the page scroll
        }
        return
      }
      if (mode !== 'drag') return
      const raw = startValue + (e.clientX - startX)
      tracker.add(raw)
      spring.set(rubberbandClamp(raw, min, 0, viewport.clientWidth))
    }

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      const wasDragging = mode === 'drag'
      mode = 'idle'
      pointerId = -1
      delete viewport.dataset.dragging
      if (!wasDragging) {
        // A tap that stopped the gallery mid-flight: settle on the closest card.
        if (suppressClick) settle(nearest(snaps, spring.value))
        return
      }
      const velocity = e.type === 'pointercancel' ? 0 : tracker.velocity()
      const projected = spring.value + project(velocity)
      let target = nearest(snaps, projected)
      // A deliberate flick always moves at least one card in its direction.
      if (Math.abs(velocity) > FLICK && target === current) {
        target = current + (velocity < 0 ? 1 : -1)
      }
      settle(target, velocity)
    }

    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return
      e.preventDefault()
      e.stopPropagation()
      suppressClick = false
    }

    // ---- Trackpad horizontal scrolling: 1:1, then snap once it goes quiet ----
    let wheelTimer = 0
    let wheelRaw = 0
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || snaps.length < 2) return
      e.preventDefault()
      if (wheelTimer === 0) wheelRaw = spring.value // new wheel session starts from what's on screen
      wheelRaw = Math.max(min - 400, Math.min(400, wheelRaw - e.deltaX))
      spring.set(rubberbandClamp(wheelRaw, min, 0, viewport.clientWidth / 3))
      window.clearTimeout(wheelTimer)
      wheelTimer = window.setTimeout(() => {
        wheelTimer = 0
        settle(nearest(snaps, spring.value))
      }, 140)
    }

    // ---- Keyboard focus inside a card brings that card into place ----
    const onFocusIn = (e: FocusEvent) => {
      const li = (e.target as HTMLElement).closest('li')
      if (!li || !track.contains(li) || e.target === li) return
      const i = Array.from(track.children).indexOf(li)
      if (i >= 0) settle(Math.min(i, snaps.length - 1))
      viewport.scrollLeft = 0
    }

    const ro = new ResizeObserver(measure)
    ro.observe(viewport)
    ro.observe(track)
    measure()

    viewport.addEventListener('pointerdown', onDown)
    viewport.addEventListener('pointermove', onMove)
    viewport.addEventListener('pointerup', onUp)
    viewport.addEventListener('pointercancel', onUp)
    viewport.addEventListener('click', onClickCapture, true)
    viewport.addEventListener('wheel', onWheel, { passive: false })
    viewport.addEventListener('focusin', onFocusIn)

    return () => {
      ro.disconnect()
      spring.stop()
      window.clearTimeout(wheelTimer)
      viewport.removeEventListener('pointerdown', onDown)
      viewport.removeEventListener('pointermove', onMove)
      viewport.removeEventListener('pointerup', onUp)
      viewport.removeEventListener('pointercancel', onUp)
      viewport.removeEventListener('click', onClickCapture, true)
      viewport.removeEventListener('wheel', onWheel)
      viewport.removeEventListener('focusin', onFocusIn)
      api.current = null
    }
  }, [items.length])

  const go = (i: number) => api.current?.go(i)
  const scrollable = stops > 1

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="carousel-viewport" ref={viewportRef}>
        <ul className="carousel-track" ref={trackRef}>
          {items.map((item, i) => (
            <li
              key={item.key}
              className="carousel-slide"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}: ${item.title}`}
            >
              {item.node}
            </li>
          ))}
        </ul>
      </div>

      {scrollable && (
        <div className="carousel-controls">
          <div className="carousel-dots" aria-hidden="true">
            {Array.from({ length: stops }).map((_, i) => (
              <span key={i} className="carousel-dot" data-active={i === index || undefined} />
            ))}
          </div>
          <div className="carousel-buttons">
            <button
              type="button"
              className="round-btn"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous project"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              className="round-btn"
              onClick={() => go(index + 1)}
              disabled={index === stops - 1}
              aria-label="Next project"
            >
              <Chevron dir="right" />
            </button>
          </div>
          <p className="visually-hidden" aria-live="polite">
            {items[index] ? `Showing ${items[index].title}` : ''}
          </p>
        </div>
      )}
    </div>
  )
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d={dir === 'left' ? 'M14.5 5.5 8 12l6.5 6.5' : 'M9.5 5.5 16 12l-6.5 6.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
