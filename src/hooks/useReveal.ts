import { useLayoutEffect } from 'react'

/** Groups that cascade on entry. Each group staggers independently. */
const SELECTOR = '.project-card, .other-item, .exp-item'

/** Cap so a long list never leaves the last item waiting on a long delay. */
const MAX_STAGGER_STEPS = 6

/** Reveal slightly before the element reaches the bottom edge. */
const ENTER_MARGIN = 80

/**
 * Reveals groups of cards as they scroll into view, staggered.
 *
 * The hiding styles are keyed off `data-reveal`, which only this hook sets, so
 * with JS disabled nothing is ever stuck invisible. Marking happens in a layout
 * effect to land before paint, otherwise the elements flash visible first.
 *
 * This sweeps on scroll rather than using IntersectionObserver: when a fast
 * jump (End key, scrollbar drag, restored scroll) takes an element from below
 * the viewport to above it within one frame, its intersection ratio never
 * changes, so no observer callback fires and the element stays invisible.
 */
export function useReveal() {
  useLayoutEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
    if (els.length === 0) return

    const countByParent = new Map<Element, number>()
    for (const el of els) {
      const parent = el.parentElement
      if (!parent) continue
      const index = countByParent.get(parent) ?? 0
      countByParent.set(parent, index + 1)
      el.style.setProperty('--reveal-i', String(Math.min(index, MAX_STAGGER_STEPS)))
      el.dataset.reveal = ''
    }

    let pending = els
    let frame = 0

    const sweep = () => {
      frame = 0
      const limit = window.innerHeight - ENTER_MARGIN
      pending = pending.filter((el) => {
        // Anything at or above the fold, including elements already scrolled
        // past, is revealed; the rest stay pending.
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
