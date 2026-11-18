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
        <SectionHead id="about" line="3" title="About me" />

        <div className="route-grid">
          <div className="about" data-reveal-item>
            <p className="about-lead">
              Most of my professional work has been on the frontend, using React and TypeScript.
              I’ve built forms, search filters, restaurant booking flows, and exercises for language students.
            </p>
            <p>
              I work with product and design to decide how a feature should work. I like to
              <strong> take it through to release</strong>, from building the screens and connecting the API
              to testing how people will use it.
            </p>
            <p>
              For my own apps, I also build the APIs, work on sync, and handle releases.
            </p>

            <dl className="facts">
              <div>
                <dt>Based in</dt>
                <dd>Berlin, Germany</dd>
              </div>
              <div>
                <dt>Nationality</dt>
                <dd>Mexican / Spanish, with full EU citizenship</dd>
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
