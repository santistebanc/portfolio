import { useState } from 'react'
import { featuredProject, projects, otherProjects, type GradClass } from '../data/projects'
import { TechIcon } from './TechIcon'

function ProjectImage({
  screenshot,
  alt,
  gradClass,
  eager = false,
}: {
  screenshot?: string
  alt: string
  gradClass: GradClass
  eager?: boolean
}) {
  const [failed, setFailed] = useState(false)

  if (!screenshot || failed) {
    return (
      <div className={`project-image project-image-fallback ${gradClass}`} role="img" aria-label={alt}>
        <span>Preview unavailable</span>
      </div>
    )
  }

  return (
    <div className="project-image">
      <img
        src={screenshot}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="tech-list" aria-label="Technologies used">
      {items.map((item) => (
        <li key={item}><TechIcon name={item} />{item}</li>
      ))}
    </ul>
  )
}

export default function Work() {
  return (
    <section className="page-section work-section" id="work" aria-labelledby="work-title">
      <header className="section-heading" data-reveal>
        <h2 id="work-title">Selected product work</h2>
        <p>Independent products that show how I frame, build, connect, and ship useful interfaces.</p>
      </header>

      <article className="featured-project" data-reveal>
        <a
          className="featured-project-media"
          href={featuredProject.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${featuredProject.title}`}
        >
          <ProjectImage
            screenshot={featuredProject.screenshot}
            alt={featuredProject.screenshotAlt}
            gradClass="grad-1"
          />
        </a>
        <div className="featured-project-copy">
          <h3>{featuredProject.title}</h3>
          <p>{featuredProject.description}</p>
          <TechList items={featuredProject.tech} />
          <div className="text-links">
            <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer">Live app</a>
            <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </article>

      <div className="project-grid" aria-label="More selected projects">
        {projects.map((project, index) => (
          <article className={`project-card project-card-${index + 1}`} key={project.id} data-reveal>
            <a
              className="project-card-media"
              href={project.liveUrl || project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
            >
              <ProjectImage
                screenshot={project.screenshot}
                alt={project.screenshotAlt}
                gradClass={project.gradClass}
              />
            </a>
            <div className="project-card-copy">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <TechList items={project.tech} />
              <div className="text-links">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {project.liveLabel ?? 'Live'}
                  </a>
                )}
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="project-archive" data-reveal>
        <header>
          <h3>Project archive</h3>
          <p>Libraries, realtime systems, and small games built across different eras of my work.</p>
        </header>
        <div className="archive-grid">
          {otherProjects.map((project) => (
            <article className="archive-item" key={project.id}>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <TechList items={project.tech} />
              <div className="text-links">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {project.liveLabel}
                  </a>
                )}
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
