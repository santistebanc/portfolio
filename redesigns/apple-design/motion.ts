import { useLayoutEffect, type RefObject } from 'react'
import { prefersReducedMotion } from './physics'

const ENTER_MARGIN = 64
const MAX_STAGGER = 5

/**
 * Reveals `[data-reveal]` elements as they reach the viewport. Siblings stagger.
 * Hidden styles are keyed off data-reveal="pending", which only this hook sets,
 * so without JS nothing is stuck invisible. Sweeps on scroll (rAF) so a fast
 * jump past an element still reveals it.
 */
export function useReveal() {
  useLayoutEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const counts = new Map<Element, number>()
    for (const el of els) {
      const parent = el.parentElement
      if (!parent) continue
      const i = counts.get(parent) ?? 0
      counts.set(parent, i + 1)
      el.style.setProperty('--i', String(Math.min(i, MAX_STAGGER)))
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
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    sweep()
    return stop
  }, [])
}

/**
 * Scroll-linked settle: the element grows from `from` to 1 as it travels up
 * the viewport. Tied 1:1 to scroll position, so it's never "playing" on its own.
 */
export function useScrollScale(ref: RefObject<HTMLElement | null>, from = 0.9) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      if (prefersReducedMotion()) {
        el.style.transform = ''
        return
      }
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the top edge enters the bottom of the viewport, 1 by 55% up.
      const p = Math.min(Math.max((vh - rect.top) / (vh * 0.55), 0), 1)
      const eased = 1 - (1 - p) * (1 - p)
      el.style.transform = `scale(${from + (1 - from) * eased})`
    }
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    mq.addEventListener('change', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mq.removeEventListener('change', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref, from])
}
