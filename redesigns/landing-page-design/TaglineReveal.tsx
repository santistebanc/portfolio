import { useEffect, useRef, useState } from 'react'
import { taglineLines } from './content'
import { usePrefersReducedMotion } from './hooks'

const lines = taglineLines.map((line) => line.split(' '))
const total = lines.reduce((n, words) => n + words.length, 0)

/**
 * Large tagline whose words light up one at a time, in reading order, as the
 * section moves through the viewport. The scroll listener only runs while
 * the section is near the viewport and is throttled through rAF.
 */
export function TaglineReveal() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const [lit, setLit] = useState(0)

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    let frame = 0

    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Starts when the block's top reaches 85% of the viewport and finishes
      // shortly after its bottom passes the 55% line.
      const start = vh * 0.85
      const distance = rect.height + vh * 0.3
      const progress = Math.min(1, Math.max(0, (start - rect.top) / distance))
      setLit(Math.round(progress * total))
    }
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(measure)
    }
    const attach = () => {
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule, { passive: true })
      schedule()
    }
    const detach = () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== 0) cancelAnimationFrame(frame)
      frame = 0
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) attach()
        else {
          detach()
          measure()
        }
      },
      { rootMargin: '25% 0px 25% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      detach()
    }
  }, [reduced])

  let index = 0
  return (
    <section ref={ref} className="tagline" aria-labelledby="tagline-text">
      <div className="container">
        <p className="eyebrow">What I do</p>
        <h2 id="tagline-text" className="tagline-text" aria-label={taglineLines.join(' ')}>
          {lines.map((words, li) => (
            <span key={li} className="tagline-line" aria-hidden="true">
              {words.map((word, wi) => {
                const i = index++
                return (
                  <span key={wi} className="word" data-on={reduced || i < lit}>
                    {word}
                    {wi < words.length - 1 ? ' ' : ''}
                  </span>
                )
              })}{' '}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}
