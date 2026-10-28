import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  experience,
  featuredProject,
  otherProjects,
  projects,
  skills,
  type Project,
} from '../../src/data/projects'
import { TechIcon } from '../../src/components/TechIcon'
import { companyLogos } from '../../src/components/companyLogos'
import { Nav } from './Nav'
import { Carousel } from './Carousel'
import { CvSheet, type SheetHandle } from './CvSheet'
import { useReveal, useScrollScale } from './motion'
import {
  EMAIL,
  GITHUB,
  aiIconPaths,
  aiSteps,
  heroFacts,
  productionStories,
  quandooProof,
} from './content'

const PAGE_ID = 'page'
const delay = (n: number) => ({ '--d': n }) as CSSProperties

export default function App() {
  const sheet = useRef<SheetHandle | null>(null)
  const openCv = (trigger: HTMLElement | null) => sheet.current?.open(trigger)

  useReveal()

  return (
    <>
      <a className="skip-link" href="#work">Skip to work</a>
      <div id={PAGE_ID} className="page">
        <Nav onOpenCv={openCv} />
        <main>
          <Hero onOpenCv={openCv} />
          <Work />
          <Experience />
          <Approach />
          <About />
        </main>
        <Contact onOpenCv={openCv} />
        <Footer />
      </div>
      <CvSheet handle={sheet} pageId={PAGE_ID} />
    </>
  )
}

/* ------------------------------------------------------------------ */

function Hero({ onOpenCv }: { onOpenCv: (t: HTMLElement) => void }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <p className="hero-status hero-in" style={delay(0)}>
        <span className="status-dot" aria-hidden="true" />
        Open to work · Berlin
      </p>
      <h1 className="hero-title" id="hero-title">
        <span className="hero-in" style={delay(1)}>Carlos Santisteban.</span>
        <span className="hero-title-accent hero-in" style={delay(2)}>
          Software engineer.
        </span>
      </h1>
      <p className="hero-lede hero-in" style={delay(3)}>
        I build polished user-facing web apps, React and TypeScript interfaces, practical
        full-stack features, and AI-assisted development workflows.
      </p>
      <div className="hero-actions hero-in" style={delay(4)}>
        <a href="#work" className="pill-btn">See selected work</a>
        <button
          type="button"
          className="pill-btn pill-btn-secondary"
          onClick={(e) => onOpenCv(e.currentTarget)}
          aria-haspopup="dialog"
        >
          Download CV
        </button>
        <a href={`mailto:${EMAIL}`} className="text-link">
          Get in touch <span aria-hidden="true">›</span>
        </a>
      </div>

      <dl className="hero-facts">
        {heroFacts.map((f) => (
          <div key={f.label} className="hero-fact" data-reveal>
            <dt>
              <span className="hero-fact-value">{f.value}</span>{' '}
              <span className="hero-fact-unit">{f.unit}</span>
            </dt>
            <dd>{f.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function SectionHead({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string
  title: ReactNode
  id: string
  children?: ReactNode
}) {
  return (
    <header className="section-head" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title" id={id}>{title}</h2>
      {children && <p className="section-lede">{children}</p>}
    </header>
  )
}

function TechList({ tech, label }: { tech: readonly string[]; label: string }) {
  return (
    <ul className="chips" aria-label={label}>
      {tech.map((t) => (
        <li key={t} className="chip">
          <TechIcon name={t} size={13} />
          {t}
        </li>
      ))}
    </ul>
  )
}

function cleanLabel(label: string | undefined, fallback: string) {
  return (label ?? fallback).replace(/\s*->\s*$/, '')
}

function Shot({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className={`shot shot-fallback ${className ?? ''}`} role="img" aria-label={alt}>
        <span>{alt}</span>
      </div>
    )
  }
  return (
    <img
      className={`shot ${className ?? ''}`}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  )
}

function Work() {
  const frameRef = useRef<HTMLDivElement>(null)
  useScrollScale(frameRef, 0.9)
  const [featuredName, featuredSub] = featuredProject.title.split(' - ')

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <SectionHead eyebrow="Portfolio examples" title="Polished apps, product flows, and useful systems." id="work-title">
        Independent web applications that show how I approach product UI, data flows, deployment,
        realtime interactions, and AI-assisted development. My production experience comes from team
        work at Lingoda, Quandoo, Market Logic, and AISA.
      </SectionHead>

      <article className="featured" aria-labelledby="featured-title">
        <div className="featured-copy" data-reveal>
          <p className="eyebrow eyebrow-accent">Featured product</p>
          <h3 className="featured-title" id="featured-title">
            {featuredName}
            {featuredSub && <span className="featured-sub">{featuredSub}</span>}
          </h3>
          <p className="featured-desc">{featuredProject.description}</p>
          <TechList tech={featuredProject.tech} label={`${featuredName} tech stack`} />
          <div className="link-row">
            <a href={featuredProject.liveUrl} target="_blank" rel="noopener" className="pill-btn">
              Open live app
            </a>
            <a href={featuredProject.githubUrl} target="_blank" rel="noopener" className="text-link">
              View on GitHub <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
        <div className="featured-stage">
          <div className="window" ref={frameRef}>
            <div className="window-bar" aria-hidden="true">
              <span /><span /><span />
              <span className="window-url">ovberlin.online</span>
            </div>
            <Shot src={featuredProject.screenshot} alt={featuredProject.screenshotAlt} />
          </div>
        </div>
      </article>

      <div className="subsection" data-reveal>
        <h3 className="subsection-title">More apps</h3>
        <p className="subsection-hint" aria-hidden="true">Drag, swipe or use the arrows</p>
      </div>
      <Carousel
        label="More apps"
        items={projects.map((p) => ({ key: p.id, title: p.title, node: <ProjectCard project={p} /> }))}
      />

      <div className="subsection" data-reveal>
        <h3 className="subsection-title">Other projects</h3>
      </div>
      <ul className="inset-list inset-list-large" data-reveal>
        {otherProjects.map((p) => (
          <li key={p.id} className="other-row">
            <div className="other-main">
              <h4 className="other-title">{p.title}</h4>
              <p className="other-desc">{p.description}</p>
              <TechList tech={p.tech} label={`${p.title} tech`} />
            </div>
            <div className="other-links">
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener" className="text-link">
                  {cleanLabel(p.liveLabel, 'Live')} <span aria-hidden="true">›</span>
                  <span className="visually-hidden"> {p.title}</span>
                </a>
              )}
              <a href={p.githubUrl} target="_blank" rel="noopener" className="text-link text-link-quiet">
                GitHub <span aria-hidden="true">›</span>
                <span className="visually-hidden"> {p.title}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="card" aria-labelledby={`card-${p.id}`}>
      <div className={`card-media ${p.gradClass}`}>
        <Shot src={p.screenshot} alt={p.screenshotAlt} />
      </div>
      <div className="card-body">
        <h4 className="card-title" id={`card-${p.id}`}>{p.title}</h4>
        <p className="card-desc">{p.description}</p>
        <TechList tech={p.tech} label={`${p.title} tech stack`} />
        <div className="link-row link-row-tight">
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener" className="pill-btn pill-btn-small" draggable={false}>
              {cleanLabel(p.liveLabel, 'Live')}
              <span className="visually-hidden"> {p.title}</span>
            </a>
          )}
          <a href={p.githubUrl} target="_blank" rel="noopener" className="text-link" draggable={false}>
            GitHub <span aria-hidden="true">›</span>
            <span className="visually-hidden"> {p.title}</span>
          </a>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */

function CompanyLogo({ company, logoUrl }: { company: string; logoUrl?: string }) {
  const [failed, setFailed] = useState(false)
  if (companyLogos[company]) return <span className="logo">{companyLogos[company]}</span>
  if (logoUrl && !failed) {
    return (
      <span className="logo">
        <img className="exp-logo" src={logoUrl} alt="" onError={() => setFailed(true)} />
      </span>
    )
  }
  return <span className="logo logo-fallback" aria-hidden="true">{company[0]}</span>
}

function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <SectionHead eyebrow="In production" title="Real product teams. Large codebases." id="experience-title">
        Feature delivery from planning through development, testing and release, working closely with
        product managers, designers and backend engineers.
      </SectionHead>

      <div className="stories">
        {productionStories.map((s) => (
          <article key={s.title} className="story" data-reveal aria-labelledby={`story-${s.company}`}>
            <p className="eyebrow">{s.company} · {s.kicker}</p>
            <h3 className="story-title" id={`story-${s.company}`}>{s.title}</h3>
            <p className="story-body">{s.body}</p>
            <div className="story-part">
              <p className="story-label">My part</p>
              <p>{s.role}</p>
            </div>
            <p className="story-outcome">
              <CheckIcon />
              <span>{s.outcome}</span>
            </p>
            <TechList tech={s.stack} label={`${s.title} stack`} />
            {s.company === 'Quandoo' && (
              <div className="story-more">
                <p className="story-label">Also at Quandoo</p>
                <ul>
                  {quandooProof.map((q) => <li key={q}>{q}</li>)}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="subsection" data-reveal>
        <h3 className="subsection-title">Experience</h3>
      </div>
      <ol className="inset-list timeline" data-reveal>
        {experience.map((e) => {
          const [period, place] = e.period.split(' - ').length > 2
            ? [e.period.split(' - ').slice(0, 2).join(' – '), e.period.split(' - ')[2]]
            : [e.period, '']
          return (
            <li key={e.company} className="timeline-row">
              <CompanyLogo company={e.company} logoUrl={e.logoUrl} />
              <div className="timeline-main">
                <p className="timeline-company">{e.company}</p>
                <p className="timeline-role">{e.role}</p>
              </div>
              <p className="timeline-period">
                <span>{period}</span>
                {place && <span className="timeline-place">{place}</span>}
              </p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity=".16" />
      <path d="m6 10.2 2.6 2.6L14 7.4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */

function Approach() {
  return (
    <section className="section section-tinted" id="approach" aria-labelledby="approach-title">
      <div className="section-tinted-inner">
        <SectionHead eyebrow="How I build with AI" title="Practical assistance, deliberate review." id="approach-title">
          I use coding agents, reusable skills, and AI SDKs to accelerate planning, implementation,
          debugging, and iteration while staying responsible for architecture, UX, and code quality.
        </SectionHead>

        <ol className="steps">
          {aiSteps.map((s, i) => (
            <li key={s.title} className="step" data-reveal>
              <div className="step-top">
                <svg className="step-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d={aiIconPaths[s.icon]} />
                </svg>
                <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-body">{s.body}</p>
            </li>
          ))}
        </ol>

        <blockquote className="quote" data-reveal>
          <p>
            AI helps me move faster, but it does not replace my engineering judgment. The product
            ideas, UX expectations, architecture decisions, debugging, integration and final
            responsibility are still mine.
          </p>
        </blockquote>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="about">
        <div className="about-copy" data-reveal>
          <p className="eyebrow">About</p>
          <h2 className="section-title" id="about-title">Hands-on software engineer.</h2>
          <p>
            I'm a <strong>software engineer based in Berlin</strong> with 8+ years of professional
            experience building user-facing web applications, especially React/TypeScript product UI,
            forms, search and booking flows, interactive components, and polished product UX.
          </p>
          <p>
            My strongest work sits where <strong>frontend craft, product thinking, and practical
            full-stack ownership</strong> meet: shaping a feature with product/design, building the
            interface, integrating APIs and state, testing, releasing, and iterating until it feels useful.
          </p>
          <p>
            My production background includes student learning flows at Lingoda and consumer booking,
            SEO, performance, and migration work at Quandoo. My independent apps are portfolio examples
            of modern JavaScript/TypeScript product development, practical full-stack delivery, and
            AI-assisted development workflows.
          </p>
        </div>

        <dl className="facts" data-reveal>
          <div className="fact">
            <dt>Based in</dt>
            <dd>Berlin, Germany</dd>
          </div>
          <div className="fact">
            <dt>Originally from</dt>
            <dd>Mexico</dd>
          </div>
          <div className="fact">
            <dt>Work authorization</dt>
            <dd>Full EU citizenship</dd>
          </div>
          <div className="fact">
            <dt>Education</dt>
            <dd>Bachelor of IT Engineering, Tecnológico de Monterrey</dd>
          </div>
        </dl>
      </div>

      <div className="subsection" id="skills" data-reveal>
        <h3 className="subsection-title">What I work with</h3>
      </div>
      <div className="skills">
        {skills.map((g) => (
          <div key={g.title} className="skill-group" data-reveal>
            <h4 className="skill-title">{g.title}</h4>
            <TechList tech={g.tags} label={g.title} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Contact({ onOpenCv }: { onOpenCv: (t: HTMLElement) => void }) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner" data-reveal>
        <h2 className="contact-title" id="contact-title">
          Let's build something <span className="hero-title-accent">great</span> together.
        </h2>
        <p className="contact-lede">
          Open to full-time roles and exciting freelance work. Based in Berlin, available immediately.
        </p>
        <div className="link-row link-row-center">
          <a href={`mailto:${EMAIL}`} className="pill-btn pill-btn-large">Get in touch</a>
          <button
            type="button"
            className="pill-btn pill-btn-large pill-btn-secondary"
            onClick={(e) => onOpenCv(e.currentTarget)}
            aria-haspopup="dialog"
          >
            Download CV
          </button>
        </div>
        <p className="contact-meta">
          <a href={`mailto:${EMAIL}`} className="text-link">{EMAIL}</a>
          <span aria-hidden="true">·</span>
          <a href={GITHUB} target="_blank" rel="noopener" className="text-link">github.com/santistebanc</a>
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Carlos Santisteban · Berlin, Germany</p>
      <nav aria-label="Footer" className="footer-nav">
        <a href={GITHUB} target="_blank" rel="noopener">GitHub</a>
        <a href={`mailto:${EMAIL}`}>Email</a>
      </nav>
    </footer>
  )
}
