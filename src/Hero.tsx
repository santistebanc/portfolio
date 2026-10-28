import { boardRows, cvMain, person, sections } from './content'
import { Arrow, ExternalLink, LineBadge } from './ui'

export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="wordmark" href="#hero" aria-label={`${person.name}, back to top`}>
          <span className="wordmark-mark" aria-hidden="true">CS</span>
          <span className="wordmark-name">{person.name}</span>
        </a>
        <nav className="topnav" aria-label="Sections">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <LineBadge line={s.line} size="sm" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ExternalLink href={cvMain.href} className="topbar-cv">
          CV <span aria-hidden="true">PDF</span>
        </ExternalLink>
      </div>
    </header>
  )
}

export function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <p className="hero-sign">
          <span className="hero-sign-role">{person.role}</span>
          <span className="hero-sign-place">{person.location}</span>
        </p>

        <h1 id="hero-title" className="hero-name">
          <span>Carlos</span>
          <span>Santisteban</span>
        </h1>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-tagline">{person.tagline}</p>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">
                See selected work <Arrow />
              </a>
              <ExternalLink href={cvMain.href} className="btn btn-outline">
                {cvMain.label}
              </ExternalLink>
              <a href={`mailto:${person.email}`} className="btn btn-outline">
                Get in touch
              </a>
            </div>
          </div>

          <div className="board" role="group" aria-label="At a glance">
            <div className="board-head" aria-hidden="true">
              <span>At a glance</span>
            </div>
            <dl className="board-rows">
              {boardRows.map((row, i) => (
                <div className="board-row" key={row.detail} style={{ ['--i' as string]: i }}>
                  <dt>
                    <span className="board-value">{row.value}</span>{' '}
                    <span className="board-unit">{row.unit}</span>
                  </dt>
                  <dd>{row.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="board-status" style={{ ['--i' as string]: boardRows.length }}>
              <span className="board-status-tag">Open to work</span>
              <span>Full-time roles and freelance work, based in Berlin</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
