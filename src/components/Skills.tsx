import { skills } from '../data/projects'

export default function Skills() {
  return (
    <div className="skills-section">
      <div className="skills-inner">
        <p className="section-label">Skills</p>
        <h2 className="section-title">What I work with</h2>

        <div className="skills-grid">
          {skills.map((group) => (
            <div key={group.title} className="skill-group">
              <div className="skill-group-title">{group.title}</div>
              <div className="skill-tags">
                {group.tags.map((tag) => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
