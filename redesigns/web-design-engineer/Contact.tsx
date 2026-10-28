import { TechIcon } from '../../src/components/TechIcon'
import { cta, cvMain, cvVariants, person, skills } from './content'
import { Arrow, ExternalLink, SectionHead } from './ui'

export function Skills() {
  return (
    <section className="section section--tint" id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead id="skills" line="4" title="What I work with" />
        <div className="skills-grid">
          {skills.map((group, i) => (
            <div key={group.title} className="skill-group" data-reveal-item style={{ ['--i' as string]: i }}>
              <h3 className="skill-group-title">{group.title}</h3>
              <ul className="skill-list">
                {group.tags.map((tag) => (
                  <li key={tag}>
                    <span className="skill-icon" aria-hidden="true">
                      <TechIcon name={tag} size={14} />
                    </span>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div className="contact-main" data-reveal-item>
          <p className="contact-line">
            <span className="line-badge line-badge--ink" aria-hidden="true">5</span>
            Contact
          </p>
          <h2 id="contact-title" className="contact-title">
            {cta.heading}
          </h2>
          <p className="contact-body">{cta.body}</p>
          <div className="link-row">
            <a href={`mailto:${person.email}`} className="btn btn-ink">
              Get in touch <Arrow />
            </a>
            <ExternalLink href={person.github} className="btn btn-outline-ink">
              GitHub
            </ExternalLink>
          </div>
          <p className="contact-email">
            <a href={`mailto:${person.email}`}>{person.email}</a>
          </p>
        </div>

        <div className="cv-panel" data-reveal-item>
          <h3 className="cv-title">CV</h3>
          <ExternalLink href={cvMain.href} className="cv-main">
            <span>{cvMain.label}</span>
            <span className="cv-format">PDF</span>
          </ExternalLink>
          <p className="cv-sub" id="cv-variants-label">Role-focused versions</p>
          <ul className="cv-list" aria-labelledby="cv-variants-label">
            {cvVariants.map((v) => (
              <li key={v.href}>
                <ExternalLink href={v.href}>
                  <span>{v.label}</span>
                  <span className="cv-format">PDF</span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>© 2026 {person.name} · {person.location}</p>
        <ul className="footer-links">
          <li>
            <ExternalLink href={person.github}>GitHub</ExternalLink>
          </li>
          <li>
            <a href={`mailto:${person.email}`}>Email</a>
          </li>
          <li>
            <a href="#hero">Back to top</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
