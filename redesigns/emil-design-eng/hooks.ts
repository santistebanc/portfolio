import { useEffect, useLayoutEffect, useState } from 'react'

/** Cap so the last item in a long group never waits on a long delay. */
const MAX_STAGGER_STEPS = 5

/** Reveal a little before the element reaches the bottom edge. */
const ENTER_MARGIN = 64

/**
 * Fades `[data-reveal]` elements in as they scroll into view, staggered per
 * parent. The hidden state only exists once this hook has marked an element
 * `pending`, so without JS nothing is stuck invisible.
 *
 * It sweeps on scroll instead of using IntersectionObserver because a fast
 * jump (End key, scrollbar drag, restored scroll position) can move an element
 * from below the viewport to above it within one frame, and the observer would
 * never fire. Anything at or above the fold is revealed.
 */
export function useScrollReveal() {
  useLayoutEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (els.length === 0) return

    const indexByParent = new Map<Element, number>()
    for (const el of els) {
      const parent = el.parentElement ?? document.body
      const i = indexByParent.get(parent) ?? 0
      indexByParent.set(parent, i + 1)
      el.style.setProperty('--i', String(Math.min(i, MAX_STAGGER_STEPS)))
      el.dataset.reveal = 'pending'
    }

    let pending = els
    let frame = 0

    const sweep = () => {
      frame = 0
      const limit = window.innerHeight - ENTER_MARGIN
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top > limit) return true
        el.dataset.reveal = 'in'
        return false
      })
      if (pending.length === 0) stop()
    }

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(sweep)
    }

    function stop() {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== 0) cancelAnimationFrame(frame)
      frame = 0
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    // Wait one frame so the pending state paints before the first reveal,
    // otherwise above-the-fold items would skip their transition.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(sweep)
    })

    return stop
  }, [])
}

/**
 * Returns the id of the section currently under the reading line (40% down
 * the viewport), or null while still above the first section. While a nav
 * click is scrolling the page, `lock(id)` pins the result so the indicator
 * travels once to the target instead of stepping through every section.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      if (performance.now() < lockUntil) return
      const line = window.innerHeight * 0.4
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      if (atBottom && ids.length > 0) current = ids[ids.length - 1]
      setActive(current)
    }

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(measure)
    }

    const release = () => {
      lockUntil = 0
      schedule()
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('scrollend', release)
    measure()

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scrollend', release)
      if (frame !== 0) cancelAnimationFrame(frame)
    }
  }, [ids])

  const lock = (id: string) => {
    // Fallback for browsers without `scrollend`: release after a generous beat.
    lockUntil = performance.now() + 1200
    setActive(id)
  }

  return [active, lock] as const
}

let lockUntil = 0

/** Current time in Berlin, refreshed on the minute boundary. */
export function useBerlinTime() {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Berlin',
    }).format(new Date())

  const [time, setTime] = useState(format)

  useEffect(() => {
    let interval = 0
    const timeout = window.setTimeout(() => {
      setTime(format())
      interval = window.setInterval(() => setTime(format()), 60_000)
    }, 60_000 - (Date.now() % 60_000))
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  return time
}
