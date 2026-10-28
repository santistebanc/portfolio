import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/**
 * Scroll reveal for every `[data-reveal]` element.
 *
 * The observer's top margin is extended far above the viewport, so anything
 * that is already above the fold counts as intersecting. That way a fast jump
 * (End key, scrollbar drag, restored scroll) that carries an element from
 * below the viewport to above it in one frame still reveals it.
 *
 * Elements carry `data-reveal=""` in markup. The CSS only hides them while
 * `html.js-reveal` is set, which an inline script in index.html adds before
 * first paint (and skips under reduced motion), so there is no flash.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!document.documentElement.classList.contains('js-reveal')) {
      els.forEach((el) => (el.dataset.reveal = 'in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.reveal = 'in'
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '100000px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** Tracks which nav section sits in the middle band of the viewport. */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = ids.find((id) => visible.has(id)) ?? null
        setActive(current)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [ids])
  return active
}
