import { useEffect, useRef, useState } from 'react'
import { Spring, SPRING_SMOOTH } from './physics'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'approach', label: 'Approach' },
  { id: 'about', label: 'About' },
] as const

type SectionId = (typeof LINKS)[number]['id']

/**
 * Floating glass navigation. The highlight pill tracks the section you're
 * reading on two independent springs (x and width), so it can be redirected
 * mid-slide without a jump.
 */
export function Nav({ onOpenCv }: { onOpenCv: (trigger: HTMLElement) => void }) {
  const [active, setActive] = useState<SectionId | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const springs = useRef<{ x: Spring; w: Spring } | null>(null)
  const shown = useRef(false)

  // Scroll spy (rAF-throttled sweep; no IntersectionObserver gaps on fast jumps).
  useEffect(() => {
    let frame = 0
    const sweep = () => {
      frame = 0
      setScrolled(window.scrollY > 8)
      const line = window.innerHeight * 0.38
      let current: SectionId | null = null
      for (const { id } of LINKS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      const contact = document.getElementById('contact')
      if (contact && contact.getBoundingClientRect().top <= line) current = null
      setActive(current)
    }
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(sweep)
    }
    sweep()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const pill = pillRef.current
    if (!pill) return
    const apply = () => {
      const s = springs.current
      if (!s) return
      pill.style.transform = `translate3d(${s.x.value}px, 0, 0)`
      pill.style.width = `${s.w.value}px`
    }
    springs.current = {
      x: new Spring(0, apply, { damping: 1, response: 0.35 }),
      w: new Spring(0, apply, { damping: 1, response: 0.35 }),
    }
    return () => {
      springs.current?.x.stop()
      springs.current?.w.stop()
    }
  }, [])

  useEffect(() => {
    const list = listRef.current
    const pill = pillRef.current
    const s = springs.current
    if (!list || !pill || !s) return
    const place = (animate: boolean) => {
      if (!active) {
        pill.dataset.visible = 'false'
        shown.current = false
        return
      }
      const link = list.querySelector<HTMLElement>(`[data-id="${active}"]`)
      if (!link) return
      const x = link.offsetLeft
      const w = link.offsetWidth
      if (!animate || !shown.current) {
        s.x.set(x)
        s.w.set(w)
      } else {
        s.x.to(x, { config: SPRING_SMOOTH })
        s.w.to(w, { config: SPRING_SMOOTH })
      }
      pill.dataset.visible = 'true'
      shown.current = true
    }
    place(true)
    const onResize = () => place(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  return (
    <header className="nav" data-scrolled={scrolled || undefined}>
      <nav className="nav-inner" aria-label="Primary">
        <a href="#top" className="nav-brand">
          <span className="nav-mark" aria-hidden="true">CS</span>
          <span className="nav-name">Carlos Santisteban</span>
        </a>

        <div className="nav-links-wrap">
          <span className="nav-pill" ref={pillRef} aria-hidden="true" data-visible="false" />
          <ul className="nav-links" ref={listRef}>
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  data-id={l.id}
                  aria-current={active === l.id ? 'location' : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-actions">
          <a href="#contact" className="nav-contact">Contact</a>
          <button
            type="button"
            className="pill-btn pill-btn-small"
            onClick={(e) => onOpenCv(e.currentTarget)}
            aria-haspopup="dialog"
          >
            Résumé
          </button>
        </div>
      </nav>
    </header>
  )
}
