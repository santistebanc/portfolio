export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-text">
        <p className="hero-kicker">Carlos Santisteban</p>
        <h1 className="hero-name">
          Software<br />
          <span className="line2">Engineer</span>
        </h1>
        <p className="hero-tagline">
          Software engineer building polished user-facing web apps, React and TypeScript
          interfaces, practical full-stack features, and AI-assisted development workflows.
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">See selected work &rarr;</a>
          <a href="/Carlos_Santisteban_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download CV</a>
          <a href="mailto:carlos.santisteban@outlook.com" className="btn btn-ghost">Get in touch</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">8+ <span className="stat-unit">Years</span></div>
            <div className="stat-label">professional product work</div>
          </div>
          <div className="stat">
            <div className="stat-num">React <span className="stat-unit">+ TypeScript</span></div>
            <div className="stat-label">frontend product focus</div>
          </div>
          <div className="stat">
            <div className="stat-num">AI <span className="stat-unit">Workflows</span></div>
            <div className="stat-label">practical developer productivity</div>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="visual-card">
          <div className="visual-header">
            <span className="visual-dot" />
            <span className="visual-dot" />
            <span className="visual-dot" />
          </div>
          <div className="visual-code">
            <span className="cmt">// software engineering focus</span><br />
            <span className="kw">const</span> <span className="fn">strengths</span> = {'{'}<br />
            &nbsp;&nbsp;ui: [<span className="str">"forms"</span>, <span className="str">"flows"</span>, <span className="str">"systems"</span>],<br />
            &nbsp;&nbsp;stack: [<span className="str">"React"</span>, <span className="str">"TypeScript"</span>, <span className="str">"Node"</span>],<br />
            &nbsp;&nbsp;delivery: [<span className="str">"plan"</span>, <span className="str">"build"</span>, <span className="str">"release"</span>],<br />
            &nbsp;&nbsp;ai: <span className="str">"practical, reviewed, useful"</span><br />
            {'}'}
          </div>
        </div>
        <div className="visual-badge">Open to work</div>
      </div>
    </section>
  )
}
