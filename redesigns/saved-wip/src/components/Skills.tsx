import { skills } from '../data/projects'
import { TechIcon } from './TechIcon'

function SkillTag({ tag }: { tag: string }) {
  return (
    <span className="skill-tag">
      <TechIcon name={tag} />
      {tag}
    </span>
  )
}

export default function Skills() {
  return (
    <section className="page-section skills-section" id="skills" aria-labelledby="skills-title">
      <header className="section-heading" data-reveal>
        <h2 id="skills-title">What I work with</h2>
      </header>

      <div className="skills-grid" data-reveal>
        {skills.map((group) => (
          <section key={group.title} className="skill-group">
            <h3>{group.title}</h3>
            <div className="skill-tags">
              {group.tags.map((tag) => (
                <SkillTag key={tag} tag={tag} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
