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
          <h2 className="section-title">Engineer & <em>builder</em></h2>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm a <strong>fullstack engineer based in Berlin</strong> with 8+ years of experience in web
            development, primarily with JavaScript/TypeScript and React. Web development is both my
            profession and hobby — I'm genuinely passionate about building functional, good-looking
            applications with solid UX.
          </p>
          <p>
            I keep up with the latest tools and have been actively using{' '}
            <strong>AI-assisted development</strong> to work more productively, while maintaining good
            software fundamentals. Always learning, always experimenting.
          </p>
          <p>
            Originally from Mexico, I hold <strong>full EU citizenship</strong> and have been living in
            Berlin since 2016. Bachelor of IT Engineering from Tecnológico de Monterrey.
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
