import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import {
  EMAIL,
  GITHUB,
  MAILTO,
  aiPhases,
  benefits,
  cases,
  cvs,
  employers,
  experience,
  faqs,
  featured,
  otherProjects,
  projects,
  skills,
} from './content'
import { useReveal } from './hooks'
import { Nav } from './Nav'
import { Shot } from './Shot'
import { TaglineReveal } from './TaglineReveal'

const stagger = (i: number) => ({ ['--i' as string]: i }) as CSSProperties

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <span className={`ph ${name} ${className}`} aria-hidden="true" />
}

function ExternalLink({
  href,
  children,
  className = 'text-link',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <Icon name="ph-arrow-up-right" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Tech stack">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

function SectionHead({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow: string
  title: string
  intro?: string
  id: string
}) {
  return (
    <div className="section-head" data-reveal="">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-status load-in" style={stagger(0)}>
            <span className="status-dot" aria-hidden="true" />
            Open to work · Berlin · available immediately
          </p>
          <h1 id="hero-title" className="hero-title load-in" style={stagger(1)}>
            <span className="ln">Software engineer </span>
            <span className="ln">for product teams </span>
            <span className="ln">shipping real user flows.</span>
          </h1>
          <p className="hero-sub load-in" style={stagger(2)}>
            I’m Carlos Santisteban, a Berlin based engineer with 8+ years building user facing web apps in product
            teams at Lingoda and Quandoo. I write React and TypeScript product UI: learning and booking flows, search
            and filters, complex UI states, and the full stack pieces that get them released.
          </p>
          <div className="hero-actions load-in" style={stagger(3)}>
            <a href={MAILTO} className="btn btn-primary">
              Email me about a role
              <Icon name="ph-arrow-up-right" />
            </a>
            <p className="hero-note">Remote or hybrid in Germany and the EU. No visa sponsorship needed.</p>
          </div>
          <div className="proof load-in" style={stagger(4)}>
            <p className="proof-label">In production at</p>
            <ul className="proof-list">
              {employers.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="hero-visual load-in" style={stagger(2)}>
          <div className="frame">
            <div className="frame-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <p>{featured.liveLabel}</p>
            </div>
            <Shot src={featured.screenshot} alt={featured.alt} title={featured.title} className="frame-shot" eager />
          </div>
          <figcaption className="hero-chips">
            <span className="chip">
              <Icon name="ph-arrows-clockwise" />
              Data refreshed every 6 hours by GitHub Actions
            </span>
            <span className="chip">
              <Icon name="ph-wifi-slash" />
              Works offline as a PWA
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ───────────────────────── Benefits ───────────────────────── */

function Benefits() {
  return (
    <section className="section" aria-labelledby="benefits-title">
      <div className="container">
        <SectionHead
          id="benefits-title"
          eyebrow="Why teams hire me"
          title="What I bring to a product team"
          intro="Five things you can expect from day to day work with me, each tied to real work you can ask me about."
        />
        <div className="bento">
          {benefits.map((b, i) => (
            <article key={b.title} className={`card benefit benefit-${i + 1}`} data-reveal="" style={stagger(i)}>
              <span className="icon-tile">
                <Icon name={b.icon} />
              </span>
              <h3 className="card-title">{b.title}</h3>
              <p className="card-body">{b.body}</p>
              {b.proofHref ? (
                <a className="proof-tag proof-link" href={b.proofHref}>
                  {b.proof}
                  <Icon name="ph-arrow-down" />
                </a>
              ) : (
                <p className="proof-tag">
                  <span className="sr-only">Proof: </span>
                  {b.proof}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Production case studies ───────────────────────── */

function Production() {
  return (
    <section className="section" id="production" aria-labelledby="production-title">
      <div className="container">
        <SectionHead
          id="production-title"
          eyebrow="Production work"
          title="Two stories from product teams"
          intro="Team work at Lingoda and Quandoo, where most of my eight years went. I didn’t own either product alone, so here is exactly what my part was."
        />
        <div className="cases">
          {cases.map((c) => (
            <article key={c.id} className="card case" data-reveal="" aria-labelledby={`${c.id}-title`}>
              <header className="case-head">
                <p className="case-meta">
                  <span className="case-company">{c.company}</span>
                  <span>{c.period}</span>
                </p>
                <h3 id={`${c.id}-title`} className="case-title">
                  {c.title}
                </h3>
                <p className="case-context">{c.context}</p>
              </header>
              <dl className="case-grid">
                <div className="case-cell">
                  <dt>
                    <Icon name="ph-warning-circle" />
                    Problem
                  </dt>
                  <dd>{c.problem}</dd>
                </div>
                <div className="case-cell">
                  <dt>
                    <Icon name="ph-user-circle" />
                    My part
                  </dt>
                  <dd>{c.role}</dd>
                </div>
                <div className="case-cell case-outcome">
                  <dt>
                    <Icon name="ph-check-circle" />
                    Outcome
                  </dt>
                  <dd>{c.outcome}</dd>
                </div>
              </dl>
              <Tags items={c.stack} />
              {c.extra && (
                <div className="case-extra">
                  <h4>{c.extra.title}</h4>
                  <ul>
                    {c.extra.items.map((item) => (
                      <li key={item}>
                        <Icon name="ph-check" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Independent work ───────────────────────── */

function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          id="work-title"
          eyebrow="Independent work"
          title="Apps I designed, built and deployed myself"
          intro="Built since April 2025 to explore product ideas and modern tooling. They are not commercial products. The ideas, architecture and final calls are mine, AI helped me move faster, and all the code is public."
        />

        <article className="card featured" data-reveal="" aria-labelledby="featured-title">
          <Shot src={featured.screenshot} alt={featured.alt} title={featured.title} className="featured-shot" />
          <div className="featured-copy">
            <p className="badge">
              <Icon name="ph-star" />
              Featured project
            </p>
            <h3 id="featured-title" className="featured-title">
              {featured.title}
            </h3>
            <p className="featured-tagline">{featured.tagline}</p>
            <p className="card-body">{featured.body}</p>
            <ul className="fact-list">
              {featured.facts.map((f) => (
                <li key={f}>
                  <Icon name="ph-check" />
                  {f}
                </li>
              ))}
            </ul>
            <Tags items={featured.tech} />
            <div className="link-row">
              <ExternalLink href={featured.liveUrl} className="btn btn-primary">
                Open the live app
              </ExternalLink>
              <ExternalLink href={featured.githubUrl} className="btn btn-ghost">
                Read the source
              </ExternalLink>
            </div>
          </div>
        </article>

        <div className="project-grid">
          {projects.map((p, i) => (
            <article key={p.id} className="card project" data-reveal="" style={stagger(i)} aria-labelledby={`${p.id}-title`}>
              <Shot src={p.screenshot} alt={p.alt} title={p.title} className="project-shot" />
              <div className="project-copy">
                <h3 id={`${p.id}-title`} className="card-title">
                  {p.title}
                </h3>
                <p className="card-body">{p.body}</p>
                <Tags items={p.tech} />
                <div className="link-row link-row-sm">
                  <ExternalLink href={p.liveUrl}>Live app</ExternalLink>
                  <ExternalLink href={p.githubUrl}>GitHub</ExternalLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="other" data-reveal="">
          <h3 className="other-title">More experiments, libraries and games</h3>
          <ul className="other-grid">
            {otherProjects.map((p) => (
              <li key={p.title} className="card other-item">
                <div className="other-head">
                  <h4>{p.title}</h4>
                  <p className="other-tech">{p.tech.join(' · ')}</p>
                </div>
                <p className="card-body">{p.body}</p>
                <div className="link-row link-row-sm">
                  {p.liveUrl && <ExternalLink href={p.liveUrl}>{p.liveLabel ?? 'Live'}</ExternalLink>}
                  <ExternalLink href={p.githubUrl}>GitHub</ExternalLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── AI workflow ───────────────────────── */

function AIWorkflow() {
  return (
    <section className="section section-raised" id="ai" aria-labelledby="ai-title">
      <div className="container ai-layout">
        <div className="ai-aside">
          <SectionHead
            id="ai-title"
            eyebrow="How I build with AI"
            title="Practical assistance, deliberate review"
            intro="I use coding agents, reusable skills and AI SDKs to speed up planning, implementation, debugging and iteration, while I stay responsible for architecture, UX and code quality."
          />
          <blockquote className="ai-quote" data-reveal="">
            <p>
              AI helps me move faster, but it doesn’t replace my engineering judgment. I still need to understand the
              code, review it, and make the product actually work.
            </p>
          </blockquote>
        </div>
        <ol className="phases">
          {aiPhases.map((phase, pi) => (
            <li key={phase.phase} className="phase" data-reveal="" style={stagger(pi)}>
              <p className="phase-label">
                <span className="phase-num">{String(pi + 1).padStart(2, '0')}</span>
                {phase.phase}
              </p>
              <div className="phase-steps">
                {phase.steps.map((s) => (
                  <div key={s.title} className="card step">
                    <h3 className="step-title">
                      <Icon name={s.icon} className="step-icon" />
                      {s.title}
                    </h3>
                    <p className="card-body">{s.body}</p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────────────────── About and experience ───────────────────────── */

function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about-layout">
        <div className="about-copy" data-reveal="">
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="section-title">
            <span className="ln">A hands on engineer </span>
            <span className="ln">who likes the whole path</span>
          </h2>
          <p>
            I’m a <strong>software engineer based in Berlin</strong> with 8+ years of professional experience building
            user facing web applications, especially React and TypeScript product UI, forms, search and booking flows,
            interactive components and polished product UX.
          </p>
          <p>
            My strongest work sits where <strong>frontend craft, product thinking and practical full stack ownership</strong>{' '}
            meet: shaping a feature with product and design, building the interface, integrating APIs and state,
            testing, releasing, and iterating until it feels useful.
          </p>
          <p>
            People I’ve worked with describe me as careful, well planned and reliable under pressure. I like
            investigating bugs, anticipating edge cases before they ship, giving useful feedback early, and helping
            junior engineers along.
          </p>
          <p>
            Originally from Mexico, I hold <strong>full EU citizenship</strong>. I studied a Bachelor of IT Engineering at
            Tecnológico de Monterrey (2012 → 2017), including a DAAD scholarship exchange semester in Informatics at
            Hochschule Furtwangen, Germany.
          </p>
        </div>

        <div className="timeline-wrap" data-reveal="">
          <h3 className="timeline-title">Experience</h3>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.company} className="card timeline-item">
                <p className="timeline-period">
                  {e.period}
                  <span> · {e.place}</span>
                </p>
                <p className="timeline-company">{e.company}</p>
                <p className="timeline-role">{e.role}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="container skills" aria-labelledby="skills-title">
        <h3 id="skills-title" className="skills-title" data-reveal="">
          What I work with
        </h3>
        <div className="skills-grid">
          {skills.map((g, i) => (
            <div key={g.title} className="card skill-group" data-reveal="" style={stagger(i)}>
              <h4>{g.title}</h4>
              <ul className="tags">
                {g.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── FAQ ───────────────────────── */

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <li className="faq-item card" data-open={open}>
      <h3>
        <button
          type="button"
          className="faq-q"
          aria-expanded={open}
          aria-controls={`${id}-a`}
          id={`${id}-q`}
          onClick={() => setOpen((o) => !o)}
        >
          <span>{q}</span>
          <span className="faq-plus" aria-hidden="true" />
        </button>
      </h3>
      <div className="faq-a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} inert={!open}>
        <div className="faq-a-inner">
          <p>{a}</p>
        </div>
      </div>
    </li>
  )
}

function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <SectionHead
          id="faq-title"
          eyebrow="FAQ"
          title="Questions recruiters usually ask"
          intro="Short answers to the practical stuff, so the first call can be about the role."
        />
        <ul className="faq-list" data-reveal="">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────── CV and final CTA ───────────────────────── */

function CopyEmail() {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    window.clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(EMAIL)
      setState('copied')
    } catch {
      setState('error')
    }
    timer.current = window.setTimeout(() => setState('idle'), 4000)
  }

  return (
    <div className="copy">
      <button type="button" className="btn btn-ghost" onClick={copy} data-state={state}>
        <Icon name={state === 'copied' ? 'ph-check' : 'ph-copy'} />
        {state === 'copied' ? 'Copied' : 'Copy email address'}
      </button>
      <p className="copy-status" role="status" aria-live="polite">
        {state === 'copied' && `${EMAIL} is on your clipboard.`}
        {state === 'error' && `Copy failed. The address is ${EMAIL}.`}
      </p>
    </div>
  )
}

function Closing() {
  return (
    <section className="section" id="cv" aria-labelledby="cv-title">
      <div className="container">
        <SectionHead
          id="cv-title"
          eyebrow="CV"
          title="Pick the CV that matches your role"
          intro="Same history, different emphasis. Each one opens as a PDF in a new tab."
        />
        <ul className="cv-grid">
          {cvs.map((cv, i) => (
            <li key={cv.href} data-reveal="" style={stagger(i)}>
              <a className="card cv-card" href={cv.href} target="_blank" rel="noopener noreferrer" hrefLang={cv.lang}>
                <span className="icon-tile">
                  <Icon name="ph-file-pdf" />
                </span>
                <span className="cv-text">
                  <span className="cv-label" lang={cv.lang}>
                    {cv.label}
                  </span>
                  <span className="cv-note" lang={cv.lang}>
                    {cv.note}
                  </span>
                </span>
                <Icon name="ph-arrow-up-right" className="cv-arrow" />
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="cta card" data-reveal="" aria-labelledby="cta-title">
          <div className="cta-copy">
            <h2 id="cta-title" className="cta-title">
              <span className="ln">Hiring for a React </span>
              <span className="ln">or TypeScript role?</span>
            </h2>
            <p className="cta-sub">
              Tell me about the team and the product. I’m in Berlin, open to remote or hybrid work across the EU, and
              available immediately.
            </p>
            <ul className="reassure">
              <li>
                <Icon name="ph-calendar-check" />
                Available immediately
              </li>
              <li>
                <Icon name="ph-identification-card" />
                EU citizen, no sponsorship
              </li>
              <li>
                <Icon name="ph-code" />
                All independent code is public
              </li>
            </ul>
          </div>
          <div className="cta-actions">
            <a href={MAILTO} className="btn btn-primary">
              Email me about a role
              <Icon name="ph-arrow-up-right" />
            </a>
            <CopyEmail />
            <ExternalLink href={GITHUB}>github.com/santistebanc</ExternalLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© 2026 Carlos Santisteban · Berlin, Germany</p>
        <ul className="footer-links">
          <li>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </li>
          <li>
            <a href="#top">
              Back to top
              <Icon name="ph-arrow-up" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Benefits />
        <TaglineReveal />
        <Production />
        <Work />
        <AIWorkflow />
        <About />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
