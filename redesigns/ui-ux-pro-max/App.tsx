import { useState, type ReactNode } from 'react'
import { siGithub } from 'simple-icons'
import {
  experience,
  featuredProject,
  otherProjects,
  projects,
  skills,
} from '../../src/data/projects'
import { TechIcon } from '../../src/components/TechIcon'
import {
  CV_URL,
  EMAIL,
  GITHUB,
  about,
  contact,
  cvVariants,
  facts,
  hero,
  method,
  strengths,
  work,
} from './content'
import { useActiveSection, useReveal } from './hooks'

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'method', label: 'Method' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

const NAV_IDS = NAV.map((n) => n.id)

/* ── Small primitives ─────────────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={siGithub.path} fill="currentColor" />
    </svg>
  )
}

function External({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="tech" aria-label="Technologies">
      {items.map((t) => (
        <li key={t}>
          <TechIcon name={t} size={13} />
          {t}
        </li>
      ))}
    </ul>
  )
}

/** Live-link labels in the shared data carry a text arrow ("Live ->"); strip it, we draw our own. */
function cleanLabel(label: string | undefined, fallback: string) {
  return (label ?? fallback).replace(/\s*->\s*$/, '')
}

function Shot({ src, alt, eager = false }: { src?: string; alt: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="shot">
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="shot-fallback" role="img" aria-label={alt}>
          <span aria-hidden="true">{alt}</span>
        </div>
      )}
    </div>
  )
}

function SectionHead({ num, label, title, id, children }: {
  num: string
  label: string
  title: string
  id: string
  children?: ReactNode
}) {
  return (
    <header className="section-head" data-reveal="">
      <p className="eyebrow">
        <span className="eyebrow-num">{num}</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className="section-title">{title}</h2>
      {children && <div className="section-intro">{children}</div>}
    </header>
  )
}

/* ── Masthead ─────────────────────────────────────────────────────────── */

function Masthead() {
  const active = useActiveSection(NAV_IDS)
  return (
    <header className="masthead">
      <div className="wrap masthead-inner">
        <a href="#top" className="wordmark">
          C<span>.</span> Santisteban
          <span className="sr-only">, back to top</span>
        </a>
        <nav aria-label="Primary" className="primary-nav">
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={active === n.id ? 'is-active' : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <External href={CV_URL} className="btn btn-ink btn-sm masthead-cv">
          <DownloadIcon />
          CV
        </External>
      </div>
    </header>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-dateline">
        <span>{hero.role}</span>
        <span className="dateline-rule" aria-hidden="true" />
        <span>{hero.location}</span>
        <span className="dateline-rule" aria-hidden="true" />
        <span className="status">
          <span className="status-dot" aria-hidden="true" />
          Open to work
        </span>
      </div>

      <h1 id="hero-title" className="hero-title">
        <span className="line"><span>Carlos</span></span>
        <span className="line line-2"><span>Santisteban</span></span>
      </h1>

      <div className="hero-grid">
        <div className="hero-lede">
          <p className="hero-role">
            <em>{hero.role}</em>, React &amp; TypeScript
          </p>
          <p className="lede">{hero.lede}</p>
          <div className="actions">
            <a href="#work" className="btn btn-accent">
              See selected work
              <ArrowIcon />
            </a>
            <External href={CV_URL} className="btn btn-line">
              <DownloadIcon />
              Download CV
            </External>
            <a href={`mailto:${EMAIL}`} className="btn btn-line">
              Get in touch
            </a>
          </div>
        </div>

        <dl className="hero-facts" aria-label="At a glance">
          {facts.map((f) => (
            <div key={f.label} className="fact">
              <dt>{f.label}</dt>
              <dd>
                <span className="fact-value">{f.value}</span> <span className="fact-unit">{f.unit}</span>
              </dd>
            </div>
          ))}
        </dl>

        <aside className="spec" aria-labelledby="spec-title">
          <p id="spec-title" className="spec-title">Strengths</p>
          <dl>
            {strengths.map((s) => (
              <div key={s.key} className="spec-row">
                <dt>{s.key}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}

/* ── Work ─────────────────────────────────────────────────────────────── */

function Work() {
  return (
    <section id="work" className="section wrap" aria-labelledby="work-title">
      <SectionHead num="01" label={work.label} title={work.title} id="work-title">
        <p>{work.intro}</p>
      </SectionHead>

      <article className="cover" data-reveal="" aria-labelledby="cover-title">
        <figure className="cover-figure">
          <Shot src={featuredProject.screenshot} alt={featuredProject.screenshotAlt} />
          <figcaption>Fig. 01: {featuredProject.screenshotAlt}</figcaption>
        </figure>
        <div className="cover-body">
          <p className="kicker">Featured product</p>
          <h3 id="cover-title" className="cover-title">{featuredProject.title}</h3>
          <p className="cover-desc">{featuredProject.description}</p>
          <TechList items={featuredProject.tech} />
          <div className="actions">
            <External href={featuredProject.liveUrl} className="btn btn-accent">
              Live app
              <ArrowIcon />
            </External>
            <External href={featuredProject.githubUrl} className="btn btn-line">
              <GithubIcon />
              GitHub
            </External>
          </div>
        </div>
      </article>

      <ol className="stories" aria-label="More projects">
        {projects.map((p, i) => (
          <li key={p.id} className="story" data-reveal="">
            <article aria-labelledby={`story-${p.id}`}>
              <Shot src={p.screenshot} alt={p.screenshotAlt} />
              <p className="story-num" aria-hidden="true">{String(i + 2).padStart(2, '0')}</p>
              <h3 id={`story-${p.id}`} className="story-title">{p.title}</h3>
              <p className="story-desc">{p.description}</p>
              <TechList items={p.tech} />
              <div className="text-links">
                {p.liveUrl && (
                  <External href={p.liveUrl} className="text-link">
                    {cleanLabel(p.liveLabel, 'Live')}
                    <ArrowIcon />
                  </External>
                )}
                <External href={p.githubUrl} className="text-link">
                  GitHub
                  <ArrowIcon />
                </External>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <div className="archive" data-reveal="">
        <h3 className="archive-title">Other projects</h3>
        <ol className="archive-list">
          {otherProjects.map((p, i) => (
            <li key={p.id} className="archive-row">
              <span className="archive-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="archive-name">{p.title}</h4>
              <p className="archive-desc">{p.description}</p>
              <TechList items={p.tech} />
              <div className="text-links archive-links">
                {p.liveUrl && (
                  <External href={p.liveUrl} className="text-link">
                    {cleanLabel(p.liveLabel, 'Live')}
                    <span className="sr-only">: {p.title}</span>
                    <ArrowIcon />
                  </External>
                )}
                <External href={p.githubUrl} className="text-link">
                  GitHub
                  <span className="sr-only">: {p.title}</span>
                  <ArrowIcon />
                </External>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ── Method (AI workflow) ─────────────────────────────────────────────── */

function Method() {
  return (
    <section id="method" className="method" aria-labelledby="method-title">
      <div className="wrap section">
        <SectionHead num="02" label={method.label} title={method.title} id="method-title">
          <p>{method.intro}</p>
        </SectionHead>
        <ol className="steps">
          {method.steps.map((s, i) => (
            <li key={s.title} className="step" data-reveal="">
              <span className="step-num" aria-hidden="true">{i + 1}</span>
              <h3 className="step-title">{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ── About + experience ───────────────────────────────────────────────── */

function parseExperience(e: (typeof experience)[number]) {
  const [start = '', end = '', place = ''] = e.period.split(' - ')
  const [title, ...focus] = e.role.split(' - ')
  return { start, end, place, title, focus: focus.join(' - ') }
}

function About() {
  return (
    <section id="about" className="section wrap" aria-labelledby="about-title">
      <SectionHead num="03" label={about.label} title={about.title} id="about-title" />
      <div className="about-grid">
        <div className="about-text" data-reveal="">
          <p className="dropcap">
            I'm a <strong>software engineer based in Berlin</strong> with 8+ years of professional
            experience building user-facing web applications, especially React/TypeScript product UI,
            forms, search and booking flows, interactive components, and polished product UX.
          </p>
          <p>
            My strongest work sits where <strong>frontend craft, product thinking, and practical
            full-stack ownership</strong> meet: shaping a feature with product/design, building the
            interface, integrating APIs and state, testing, releasing, and iterating until it feels
            useful.
          </p>
          {/* Decorative pull quote restating the paragraph above; hidden from assistive tech to avoid repetition. */}
          <blockquote className="pull" aria-hidden="true">
            Shaping a feature, building the interface, and iterating until it feels useful.
          </blockquote>
          <p>
            My production background includes student learning flows at Lingoda and consumer booking,
            SEO, performance, and migration work at Quandoo. My independent apps are portfolio examples
            of modern JavaScript/TypeScript product development, practical full-stack delivery, and
            AI-assisted development workflows.
          </p>
          <p>
            Originally from Mexico, I hold <strong>full EU citizenship</strong> and have a Bachelor of IT
            Engineering from Tecnologico de Monterrey.
          </p>
        </div>

        <div className="ledger" data-reveal="">
          <h3 className="ledger-title">Experience</h3>
          <ol>
            {experience.map((e) => {
              const x = parseExperience(e)
              return (
                <li key={e.company} className="ledger-row">
                  <p className="ledger-when">
                    <span>{x.start}</span>
                    <span aria-hidden="true" className="ledger-dash">&mdash;</span>
                    <span className="sr-only"> to </span>
                    <span>{x.end}</span>
                  </p>
                  <div>
                    <h4 className="ledger-company">{e.company}</h4>
                    <p className="ledger-role">
                      {x.title}
                      {x.focus && <span>{x.focus}</span>}
                    </p>
                    <p className="ledger-place">{x.place}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ── Skills ───────────────────────────────────────────────────────────── */

function Skills() {
  return (
    <section id="skills" className="section wrap skills" aria-labelledby="skills-title">
      <SectionHead num="04" label="Skills" title="What I work with" id="skills-title" />
      <div className="skills-grid">
        {skills.map((g) => (
          <div key={g.title} className="skill-group" data-reveal="">
            <h3 className="skill-title">{g.title}</h3>
            <ul>
              {g.tags.map((t) => (
                <li key={t}>
                  <TechIcon name={t} size={14} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Contact ──────────────────────────────────────────────────────────── */

function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap section">
        <p className="eyebrow">
          <span className="eyebrow-num">05</span>
          <span>{contact.label}</span>
        </p>
        <h2 id="contact-title" className="contact-title" data-reveal="">
          Let's build something <em>great</em> together.
        </h2>
        <div className="contact-grid">
          <div data-reveal="">
            <p className="contact-lead">{contact.lead}</p>
            <a href={`mailto:${EMAIL}`} className="contact-email">
              {EMAIL}
              <ArrowIcon />
            </a>
            <div className="actions">
              <a href={`mailto:${EMAIL}`} className="btn btn-accent">
                Get in touch
                <ArrowIcon />
              </a>
              <External href={GITHUB} className="btn btn-line">
                <GithubIcon />
                GitHub
              </External>
              <External href={CV_URL} className="btn btn-line">
                <DownloadIcon />
                Download CV
              </External>
            </div>
          </div>
          <div className="cv-box" data-reveal="">
            <h3 className="cv-title">CV, by focus</h3>
            <ul>
              {cvVariants.map((v) => (
                <li key={v.href}>
                  <External href={v.href} className="cv-link">
                    <span>{v.label}</span>
                    <span className="cv-meta" aria-hidden="true">PDF</span>
                    <DownloadIcon />
                  </External>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>&copy; 2026 Carlos Santisteban &middot; Berlin, Germany</p>
        <nav aria-label="Footer">
          <ul>
            <li><External href={GITHUB}>GitHub</External></li>
            <li><a href={`mailto:${EMAIL}`}>Email</a></li>
            <li><a href="#top">Back to top</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div id="top" />
      <Masthead />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Work />
        <Method />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
