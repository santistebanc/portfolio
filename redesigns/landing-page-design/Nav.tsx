import { useEffect, useRef, useState } from 'react'
import { MAILTO, nav } from './content'
import { useScrollSpy } from './hooks'

const ids = nav.map((n) => n.id)

export function Nav() {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(ids)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close the overlay if the viewport grows into the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header className="nav-wrap">
      <nav className="nav-pill" aria-label="Main">
        <a href="#top" className="nav-brand" aria-label="Carlos Santisteban, back to top">
          <span className="nav-mark" aria-hidden="true">CS</span>
          <span className="nav-name">Carlos Santisteban</span>
        </a>
        <ul className="nav-links">
          {nav.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-current={active === item.id ? 'true' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={MAILTO} className="btn btn-primary btn-sm nav-cta">
          Email me
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-overlay"
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-open={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="bar bar-top" aria-hidden="true" />
          <span className="bar bar-bottom" aria-hidden="true" />
        </button>
      </nav>

      <div id="nav-overlay" className="nav-overlay" data-open={open} inert={!open} aria-hidden={!open}>
        <ul className="overlay-links">
          {nav.map((item, i) => (
            <li key={item.id} style={{ ['--i' as string]: i }}>
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li style={{ ['--i' as string]: nav.length }}>
            <a href={MAILTO} className="btn btn-primary overlay-cta" onClick={() => setOpen(false)}>
              Email me about a role
              <span className="ph ph-arrow-up-right" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
