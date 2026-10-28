import { useState } from 'react'
import { experience } from '../data/projects'
import { companyLogos } from './companyLogos'

function CompanyLogo({ company, logoUrl }: { company: string; logoUrl?: string }) {
  const [failed, setFailed] = useState(false)

  if (companyLogos[company]) return companyLogos[company]

  if (logoUrl && !failed) {
    return (
      <img className="exp-logo" src={logoUrl} alt={company} onError={() => setFailed(true)} />
    )
  }

  return <div className="exp-logo exp-logo-fallback">{company[0]}</div>
}

export default function About() {
  return (
    <section className="page-section about-section" id="about" aria-labelledby="about-title">
      <header className="section-heading" data-reveal>
        <h2 id="about-title">Hands-on, product-facing engineering</h2>
      </header>

      <div className="about-layout">
        <div className="about-copy" data-reveal>
          <p>
            I'm a <strong>software engineer based in Berlin</strong> with 8+ years of
            professional experience building user-facing web applications, especially
            React/TypeScript product UI, forms, search and booking flows, interactive components,
            and polished product UX.
          </p>
          <p>
            My strongest work sits where <strong>frontend craft, product thinking, and practical
            full-stack ownership</strong> meet: shaping a feature with product and design, building
            the interface, integrating APIs and state, testing, releasing, and iterating until it
            feels useful.
          </p>
          <p>
            My production background includes student learning flows at Lingoda and consumer
            booking, SEO, performance, and migration work at Quandoo. My independent apps are
            examples of modern JavaScript/TypeScript product development, practical full-stack
            delivery, and AI-assisted development workflows.
          </p>
          <p>
            Originally from Mexico, I hold <strong>full EU citizenship</strong> and have a Bachelor of
            IT Engineering from Tecnologico de Monterrey.
          </p>
        </div>

        <div className="experience-list" data-reveal aria-label="Professional experience">
          {experience.map((e) => (
            <article key={e.company} className="experience-item">
              <CompanyLogo company={e.company} />
              <div>
                <h3>{e.company}</h3>
                <p>{e.role}</p>
                <time>{e.period}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
