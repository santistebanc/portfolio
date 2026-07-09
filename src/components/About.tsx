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
    <section className="section" id="about">
      <div className="section-header">
        <div>
          <p className="section-label">About</p>
          <h2 className="section-title">Hands-on product engineer</h2>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm a <strong>product-minded software engineer based in Berlin</strong> with 8+ years of
            professional experience building user-facing web applications, especially UI systems,
            forms, onboarding flows, interactive components, and polished product UX.
          </p>
          <p>
            My strongest work sits where <strong>frontend craft, product judgment, and practical
            full-stack ownership</strong> meet: shaping a feature, building the interface, connecting
            the data, deploying it, and iterating until it feels useful.
          </p>
          <p>
            After Lingoda, I focused on independent product work: building and shipping web apps
            with modern JavaScript/TypeScript tooling and AI-assisted development workflows. I am
            not an ML researcher; I am a product engineer using modern tools to build better
            product slices faster.
          </p>
          <p>
            Originally from Mexico, I hold <strong>full EU citizenship</strong> and have a Bachelor of
            IT Engineering from Tecnologico de Monterrey.
          </p>
        </div>

        <div className="experience-list">
          {experience.map((e) => (
            <div key={e.company} className="exp-item">
              <CompanyLogo company={e.company} logoUrl={e.logoUrl} />
              <div className="exp-info">
                <div className="exp-company">{e.company}</div>
                <div className="exp-role">{e.role}</div>
                <div className="exp-period">{e.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
