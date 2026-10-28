import { featuredProject, otherProjects, projects, workIntro } from './content'
import { Arrow, ExternalLink, SectionHead, Shot, TechList } from './ui'

/** Source data uses ASCII "->" in link labels; the redesign draws its own arrow. */
const cleanLabel = (label: string | undefined, fallback: string) =>
  (label ?? fallback).replace(/\s*->\s*$/, '').trim() || fallback

export function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead id="work" line="1" title="Selected work">
          <p>{workIntro}</p>
        </SectionHead>

        <article className="featured" data-reveal-item aria-labelledby="featured-title">
          <Shot
            src={featuredProject.screenshot}
            alt={featuredProject.screenshotAlt}
            className="featured-shot"
          />
          <div className="featured-body">
            <p className="tag">
              <span className="tag-index" aria-hidden="true">01</span>
              Featured product
            </p>
            <h3 id="featured-title" className="featured-title">
              {featuredProject.title}
            </h3>
            <p className="featured-desc">{featuredProject.description}</p>
            <TechList items={featuredProject.tech} label={`${featuredProject.title} stack`} />
            <div className="link-row">
              <ExternalLink href={featuredProject.liveUrl} className="btn btn-primary">
                Live app <Arrow />
              </ExternalLink>
              <ExternalLink href={featuredProject.githubUrl} className="btn btn-outline">
                GitHub
              </ExternalLink>
            </div>
          </div>
        </article>

        <ol className="project-grid" aria-label="More portfolio apps">
          {projects.map((p, i) => (
            <li key={p.id} className="project" data-reveal-item style={{ ['--i' as string]: i }}>
              <article aria-labelledby={`p-${p.id}`}>
                <Shot src={p.screenshot} alt={p.screenshotAlt} className="project-shot" />
                <div className="project-meta">
                  <span className="project-index" aria-hidden="true">
                    {String(i + 2).padStart(2, '0')}
                  </span>
                  <h3 id={`p-${p.id}`} className="project-title">
                    {p.title}
                  </h3>
                </div>
                <p className="project-desc">{p.description}</p>
                <TechList items={p.tech} label={`${p.title} stack`} />
                <div className="link-row link-row--text">
                  {p.liveUrl ? (
                    <ExternalLink href={p.liveUrl}>
                      {cleanLabel(p.liveLabel, 'Live')} <Arrow />
                    </ExternalLink>
                  ) : null}
                  <ExternalLink href={p.githubUrl}>
                    GitHub <Arrow />
                  </ExternalLink>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="timetable" data-reveal-item>
          <h3 className="timetable-title">Other projects</h3>
          <table role="table">
            <thead role="rowgroup">
              <tr role="row">
                <th scope="col" role="columnheader">Project</th>
                <th scope="col" role="columnheader">What it is</th>
                <th scope="col" role="columnheader">Stack</th>
                <th scope="col" role="columnheader">
                  <span className="sr-only">Links</span>
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {otherProjects.map((p) => (
                <tr key={p.id} role="row">
                  <th scope="row" role="rowheader">{p.title}</th>
                  <td className="tt-desc" role="cell">{p.description}</td>
                  <td className="tt-stack" role="cell">{p.tech.join(' / ')}</td>
                  <td className="tt-links" role="cell">
                    {p.liveUrl ? (
                      <ExternalLink href={p.liveUrl}>
                        {cleanLabel(p.liveLabel, 'Live')}
                        <span className="sr-only">: {p.title}</span>
                      </ExternalLink>
                    ) : null}
                    <ExternalLink href={p.githubUrl}>
                      GitHub<span className="sr-only">: {p.title}</span>
                    </ExternalLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
