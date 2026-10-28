import { useEffect, useLayoutEffect, useState } from 'react'

const REDUCED = '(prefers-reduced-motion: reduce)'
const MAX_STAGGER = 5
const ENTER_MARGIN = 64

/**
 * Fades `[data-reveal]` elements up as they enter the viewport, staggered per
 * parent. Hidden styles only apply once this hook marks the root with
 * `data-motion`, so without JS (or with reduced motion) everything is visible.
 *
 * It sweeps on scroll instead of relying on IntersectionObserver alone, so a
 * fast jump (End key, scrollbar drag) never leaves an element stuck hidden.
 */
export function useReveal() {
  useLayoutEffect(() => {
    if (window.matchMedia(REDUCED).matches) return

    const root = document.documentElement
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const indexByParent = new Map<Element, number>()
    for (const el of els) {
      const parent = el.parentElement ?? root
      const i = indexByParent.get(parent) ?? 0
      indexByParent.set(parent, i + 1)
      el.style.setProperty('--i', String(Math.min(i, MAX_STAGGER)))
    }
    root.dataset.motion = 'on'

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
    sweep()

    return () => {
      stop()
      delete root.dataset.motion
      for (const el of els) el.dataset.reveal = ''
    }
  }, [])
}

/** Tracks which section is currently under the reading line, for nav state. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [ids])

  return active
}
