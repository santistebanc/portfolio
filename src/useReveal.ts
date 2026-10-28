import { useLayoutEffect } from 'react'

const SELECTOR = '[data-reveal-item]'
const ENTER_MARGIN = 72

/**
 * Marks `[data-reveal-item]` elements as pending and flips them to "in" once
 * their top edge crosses the lower part of the viewport.
 *
 * Hidden styles key off `data-reveal`, which only this hook sets, so content is
 * never stuck invisible without JS. A rAF-throttled scroll sweep is used instead
 * of IntersectionObserver so fast jumps (End key, anchor links) that skip an
 * element past the viewport in one frame still reveal it.
 */
export function useReveal() {
  useLayoutEffect(() => {
    let pending = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
    if (pending.length === 0) return
    for (const el of pending) el.dataset.reveal = ''

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
    return stop
  }, [])
}
