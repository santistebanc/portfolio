import { education, experience, highlights } from './content'
import { SectionHead } from './ui'

/** "Apr 2025 - Present - Berlin" -> { period: "Apr 2025 – Present", place: "Berlin" } */
function splitPeriod(raw: string) {
  const parts = raw.split(' - ')
  const place = parts.length > 2 ? parts.pop() : undefined
  return { period: parts.join(' – '), place }
}

/** "Software Engineer - student learning..." -> title + focus */
function splitRole(raw: string) {
  const i = raw.indexOf(' - ')
  return i === -1 ? { title: raw, focus: '' } : { title: raw.slice(0, i), focus: raw.slice(i + 3) }
}

export function Route() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead id="about" line="3" title="Hands-on software engineer" />

        <div className="route-grid">
          <div className="about" data-reveal-item>
            <p className="about-lead">
              I'm a software engineer based in Berlin with 8+ years of professional experience
              building user-facing web applications, especially React/TypeScript product UI, forms,
              search and booking flows, interactive components, and polished product UX.
            </p>
            <p>
              My strongest work sits where <strong>frontend craft, product thinking, and practical
              full-stack ownership</strong> meet: shaping a feature with product/design, building the
              interface, integrating APIs and state, testing, releasing, and iterating until it feels
              useful.
            </p>
            <p>
              My production background includes student learning flows at Lingoda and consumer
              booking, SEO, performance, and migration work at Quandoo. My independent apps are
              portfolio examples of modern JavaScript/TypeScript product development, practical
              full-stack delivery, and AI-assisted development workflows.
            </p>

            <dl className="facts">
              <div>
                <dt>Based in</dt>
                <dd>Berlin, Germany</dd>
              </div>
              <div>
                <dt>Origin</dt>
                <dd>Mexico, with full EU citizenship</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>
                  {education.title}, {education.school}
                </dd>
              </div>
            </dl>
          </div>

          <div className="career" data-reveal-item>
            <h3 className="career-title">Career line</h3>
            <ol className="career-line">
              {experience.map((e, i) => {
                const { period, place } = splitPeriod(e.period)
                const { title, focus } = splitRole(e.role)
                const current = i === 0
                return (
                  <li key={e.company} className={`station${current ? ' station--current' : ''}`}>
                    <span className="station-dot" aria-hidden="true" />
                    <p className="station-when">
                      <span>{period}</span>
                      {place ? <span className="station-place">{place}</span> : null}
                    </p>
                    <h4 className="station-name">
                      {e.company}
                      {current ? <span className="station-now">Current</span> : null}
                    </h4>
                    <p className="station-role">
                      {title}
                      {focus ? <span> · {focus}</span> : null}
                    </p>
                    {highlights[e.company] ? (
                      <p className="station-note">{highlights[e.company]}</p>
                    ) : null}
                  </li>
                )
              })}
              <li className="station station--origin">
                <span className="station-dot" aria-hidden="true" />
                <p className="station-when">
                  <span>Education</span>
                </p>
                <h4 className="station-name">{education.school}</h4>
                <p className="station-role">{education.title}</p>
                <p className="station-note">{education.note}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
