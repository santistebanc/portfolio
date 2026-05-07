import { useState } from 'react'
import { featuredProject, projects, otherProjects, type GradClass } from '../data/projects'
import { TechIcon } from './TechIcon'

function CardImage({
  screenshot,
  alt,
  gradClass,
}: {
  screenshot?: string
  alt: string
  gradClass: GradClass
}) {
  const [failed, setFailed] = useState(false)

  if (!screenshot || failed) {
    return (
      <div className={`card-image ${gradClass}`}>
        <div className="grad-label">{alt}</div>
      </div>
    )
  }

  return (
    <div className="card-image">
      <img src={screenshot} alt={alt} onError={() => setFailed(true)} />
    </div>
  )
}

function FeaturedImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="featured-image">
      {failed ? (
        <div className="featured-image-fallback">{alt}</div>
      ) : (
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      )}
    </div>
  )
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="section-header">
        <div>
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">Projects I'm <em>proud</em> of</h2>
        </div>
      </div>

      {/* Featured */}
      <article className="featured">
        <FeaturedImage src={featuredProject.screenshot} alt={featuredProject.screenshotAlt} />
        <div className="featured-content">
          <span className="featured-badge">★ Featured</span>
          <h3 className="featured-title">{featuredProject.title}</h3>
          <p className="featured-desc">{featuredProject.description}</p>
          <div className="tech-row">
            {featuredProject.tech.map((t) => (
              <span key={t} className="tech-pill"><TechIcon name={t} />{t}</span>
            ))}
          </div>
          <div className="project-links">
            <a href={featuredProject.liveUrl} target="_blank" rel="noopener" className="btn btn-primary">
              Live app →
            </a>
            <a href={featuredProject.githubUrl} target="_blank" rel="noopener" className="btn btn-ghost">
              GitHub
            </a>
          </div>
        </div>
      </article>

      {/* Grid */}
      <div className="projects-grid">
        {projects.map((p) => (
          <article key={p.id} className="project-card">
            <CardImage screenshot={p.screenshot} alt={p.screenshotAlt} gradClass={p.gradClass} />
            <div className="card-body">
              <h3 className="card-title">{p.title}</h3>
              <p className="card-desc">{p.description}</p>
              <div className="card-tech">
                {p.tech.map((t) => <span key={t}><TechIcon name={t} />{t}</span>)}
              </div>
              <div className="card-links">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener" className="card-link">
                    {p.liveLabel ?? 'Live →'}
                  </a>
                )}
                <a href={p.githubUrl} target="_blank" rel="noopener" className="card-link card-link-gh">
                  GitHub →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Other projects */}
      <div className="other-projects">
        <h3 className="other-title">Other projects</h3>
        <div className="other-list">
          {otherProjects.map((p) => (
            <div key={p.id} className="other-item">
              <div className="other-left">
                <span className="other-name">{p.title}</span>
                <div className="other-tech">
                  {p.tech.map((t) => <span key={t}><TechIcon name={t} />{t}</span>)}
                </div>
              </div>
              <p className="other-desc">{p.description}</p>
              <div className="other-links">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener" className="card-link">
                    {p.liveLabel}
                  </a>
                )}
                <a href={p.githubUrl} target="_blank" rel="noopener" className="card-link card-link-gh">
                  GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
