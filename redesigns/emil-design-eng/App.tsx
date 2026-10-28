import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { experience, featuredProject, otherProjects, projects, skills } from '../../src/data/projects'
import { TechIcon } from '../../src/components/TechIcon'
import { companyLogos } from '../../src/components/companyLogos'
import { about, contact, EMAIL, experienceDetails, GITHUB_URL, hero, process, sections, work } from './content'
import { useBerlinTime, useScrollReveal, useScrollSpy } from './hooks'
import {
  ArrowDown,
  ArrowUpRight,
  CopyEmailButton,
  CvMenu,
  Disclosure,
  GitHubIcon,
  MailIcon,
  Tooltip,
} from './ui'

const sectionIds = sections.map((s) => s.id)

/** "Live ->" in the shared data becomes "Live"; the arrow is drawn as an icon here. */
const cleanLabel = (label: string | undefined, fallback: string) => (label ?? fallback).replace(/\s*->\s*$/, '')

/* -------------------------------------------------------------------- nav */

function Nav() {
  const [active, lock] = useScrollSpy(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [clip, setClip] = useState<string>('inset(0 100% 0 0 round 999px)')
  const [ready, setReady] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The highlighted copy of the list is clipped down to the active link. Moving
  // the clip (instead of a separate pill behind the text) keeps the dark
  // background and light text perfectly in sync mid-transition.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      const link = linkRefs.current[active ?? sectionIds[0]]
      if (!link) return
      const left = link.offsetLeft
      const right = list.clientWidth - (link.offsetLeft + link.offsetWidth)
      setClip(`inset(0 ${right}px 0 ${left}px round 999px)`)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [active])

  // Don't animate the indicator into its first position on load.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <header className="nav" data-scrolled={scrolled}>
      <div className="nav-inner">
        <a href="#top" className="nav-name">
          Carlos Santisteban
        </a>

        <nav className="nav-tabs" aria-label="Sections">
          <ul ref={listRef} className="nav-list">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  ref={(el) => {
                    linkRefs.current[s.id] = el
                  }}
                  href={`#${s.id}`}
                  className="nav-link"
                  aria-current={active === s.id ? 'true' : undefined}
                  onClick={() => lock(s.id)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ul
            className="nav-list nav-list-active"
            aria-hidden="true"
            data-visible={active !== null}
            data-ready={ready}
            style={{ clipPath: clip }}
          >
            {sections.map((s) => (
              <li key={s.id}>
                <span className="nav-link">{s.label}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-icons">
          <Tooltip label="GitHub">
            <a href={GITHUB_URL} target="_blank" rel="noopener" className="icon-btn" aria-label="GitHub profile">
              <GitHubIcon />
            </a>
          </Tooltip>
          <Tooltip label="Email">
            <a href={`mailto:${EMAIL}`} className="icon-btn" aria-label={`Email ${EMAIL}`}>
              <MailIcon />
            </a>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------- hero */

function Hero() {
  const time = useBerlinTime()

  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-meta enter" style={{ '--i': 0 } as CSSProperties}>
        <span className="status">
          <span className="status-dot" aria-hidden="true" />
          {hero.status}
        </span>
        <span className="hero-clock">
          Berlin <time className="tabular">{time}</time>
        </span>
      </div>

      <p className="hero-kicker enter" style={{ '--i': 1 } as CSSProperties}>
        {hero.name} <span aria-hidden="true">·</span> {hero.role}
      </p>
      <h1 id="hero-title" className="hero-title enter" style={{ '--i': 2 } as CSSProperties}>
        {hero.headline}
      </h1>
      <p className="hero-tagline enter" style={{ '--i': 3 } as CSSProperties}>
        {hero.tagline}
      </p>

      <div className="hero-actions enter" style={{ '--i': 4 } as CSSProperties}>
        <a href="#work" className="btn btn-primary">
          See selected work
          <ArrowDown className="btn-arrow" />
        </a>
        <CvMenu />
        <CopyEmailButton />
      </div>

      <p className="hero-availability enter" style={{ '--i': 5 } as CSSProperties}>
        {hero.statusDetail}.
      </p>

      <dl className="stats enter" style={{ '--i': 6 } as CSSProperties}>
        {hero.stats.map((s) => (
          <div key={s.value} className="stat">
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ------------------------------------------------------------------- work */

function Screenshot({ src, alt, eager = false }: { src?: string; alt: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="shot" data-loaded={loaded || failed}>
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="shot-fallback">{alt}</span>
      )}
    </div>
  )
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="tech" aria-label="Built with">
      {items.map((t) => (
        <li key={t}>
          <TechIcon name={t} size={12} />
          {t}
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ liveUrl, liveLabel, githubUrl }: { liveUrl?: string; liveLabel?: string; githubUrl: string }) {
  return (
    <div className="links">
      {liveUrl && (
        <a href={liveUrl} target="_blank" rel="noopener" className="link">
          {liveLabel}
          <ArrowUpRight className="link-arrow" />
        </a>
      )}
      <a href={githubUrl} target="_blank" rel="noopener" className="link link-muted">
        Source
        <ArrowUpRight className="link-arrow" />
      </a>
    </div>
  )
}

function SectionHead({ id, label, title, intro }: { id: string; label: string; title: string; intro?: string }) {
  return (
    <div className="section-head" data-reveal>
      <p className="eyebrow">{label}</p>
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  )
}

function Work() {
  return (
    <section id="work" className="section shell" aria-labelledby="work-title">
      <SectionHead id="work" label={work.label} title={work.title} intro={work.intro} />

      <article className="featured" data-reveal>
        <a
          className="featured-media"
          href={featuredProject.liveUrl}
          target="_blank"
          rel="noopener"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Screenshot src={featuredProject.screenshot} alt={featuredProject.screenshotAlt} eager />
        </a>
        <div className="featured-body">
          <p className="eyebrow">Featured product</p>
          <h3 className="featured-title">{featuredProject.title}</h3>
          <p className="body-text">{featuredProject.description}</p>
          <TechList items={featuredProject.tech} />
          <ProjectLinks liveUrl={featuredProject.liveUrl} liveLabel="Live app" githubUrl={featuredProject.githubUrl} />
        </div>
      </article>

      <div className="projects">
        {projects.map((p) => (
          <article key={p.id} className="project" data-reveal>
            <Screenshot src={p.screenshot} alt={p.screenshotAlt} />
            <div className="project-body">
              <h3 className="project-title">{p.title}</h3>
              <p className="body-text">{p.description}</p>
              <TechList items={p.tech} />
              <ProjectLinks liveUrl={p.liveUrl} liveLabel={cleanLabel(p.liveLabel, 'Live')} githubUrl={p.githubUrl} />
            </div>
          </article>
        ))}
      </div>

      <div className="others" data-reveal>
        <h3 className="others-title">Other projects</h3>
        <ul className="others-list">
          {otherProjects.map((p) => (
            <li key={p.id} className="other">
              <div className="other-head">
                <span className="other-name">{p.title}</span>
                <span className="other-tech">{p.tech.join(' · ')}</span>
              </div>
              <p className="other-desc">{p.description}</p>
              <ProjectLinks liveUrl={p.liveUrl} liveLabel={cleanLabel(p.liveLabel, 'Live')} githubUrl={p.githubUrl} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- process */

function Process() {
  return (
    <section id="process" className="section shell" aria-labelledby="process-title">
      <SectionHead id="process" label={process.label} title={process.title} intro={process.intro} />
      <ol className="steps">
        {process.steps.map((step, i) => (
          <li key={step.title} className="step" data-reveal>
            <span className="step-num tabular" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-body">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ------------------------------------------------------------------ about */

function CompanyMark({ company, logoUrl }: { company: string; logoUrl?: string }) {
  const [failed, setFailed] = useState(false)
  const svg = companyLogos[company]
  if (svg) return <span className="mark">{svg}</span>
  if (logoUrl && !failed) {
    return (
      <span className="mark">
        <img src={logoUrl} alt="" onError={() => setFailed(true)} />
      </span>
    )
  }
  return (
    <span className="mark mark-fallback" aria-hidden="true">
      {company[0]}
    </span>
  )
}

function splitOnce(value: string, sep: string) {
  const i = value.indexOf(sep)
  return i === -1 ? [value, ''] : [value.slice(0, i), value.slice(i + sep.length)]
}

function About() {
  const [openCompany, setOpenCompany] = useState<string | null>('Lingoda')

  return (
    <section id="about" className="section shell" aria-labelledby="about-title">
      <SectionHead id="about" label={about.label} title={about.title} />

      <div className="about-grid">
        <div className="about-copy" data-reveal>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="body-text">
              {p}
            </p>
          ))}
          <dl className="facts">
            {about.facts.map((f) => (
              <div key={f.label} className="fact">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="experience" data-reveal>
          <h3 className="others-title">Experience</h3>
          {experience.map((e, i) => {
            const [title, focus] = splitOnce(e.role, ' - ')
            const [start = '', end = '', place = ''] = e.period.split(' - ')
            const open = openCompany === e.company
            return (
              <Disclosure
                key={e.company}
                id={`exp-${i}`}
                open={open}
                onToggle={() => setOpenCompany(open ? null : e.company)}
                summary={
                  <span className="exp-summary">
                    <CompanyMark company={e.company} logoUrl={'logoUrl' in e ? e.logoUrl : undefined} />
                    <span className="exp-main">
                      <span className="exp-company">{e.company}</span>
                      <span className="exp-role">
                        {title}
                        {focus && <span className="exp-focus"> · {focus}</span>}
                      </span>
                    </span>
                    <span className="exp-when tabular">
                      {start} – {end}
                      <span className="exp-place">{place}</span>
                    </span>
                  </span>
                }
              >
                <p className="exp-detail">{experienceDetails[e.company]}</p>
              </Disclosure>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- skills */

function Skills() {
  return (
    <section id="skills" className="section shell" aria-labelledby="skills-title">
      <SectionHead id="skills" label="Skills" title="What I work with" />
      <div className="skills">
        {skills.map((group) => (
          <div key={group.title} className="skill-group" data-reveal>
            <h3 className="skill-title">{group.title}</h3>
            <ul className="chips">
              {group.tags.map((tag) => (
                <li key={tag} className="chip">
                  <TechIcon name={tag} size={12} />
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- contact */

function Contact() {
  return (
    <section id="contact" className="section shell" aria-labelledby="contact-title">
      <div className="contact" data-reveal>
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title" className="contact-title">
          {contact.title}
        </h2>
        <p className="contact-body">{contact.body}</p>
        <div className="contact-actions">
          <a href={`mailto:${EMAIL}`} className="btn btn-primary">
            <MailIcon />
            Get in touch
          </a>
          <CopyEmailButton />
          <CvMenu placement="top" />
          <a href={GITHUB_URL} target="_blank" rel="noopener" className="btn btn-ghost">
            <GitHubIcon />
            GitHub
          </a>
        </div>
        <p className="contact-email">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- app */

export default function App() {
  useScrollReveal()

  return (
    <>
      <a href="#work" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="top">
        <Hero />
        <Work />
        <Process />
        <About />
        <Skills />
        <Contact />
      </main>
      <footer className="footer shell">
        <p>© 2026 Carlos Santisteban · Berlin, Germany</p>
        <nav aria-label="Elsewhere" className="footer-links">
          <a href={GITHUB_URL} target="_blank" rel="noopener">
            GitHub
          </a>
          <a href={`mailto:${EMAIL}`}>Email</a>
        </nav>
      </footer>
    </>
  )
}
