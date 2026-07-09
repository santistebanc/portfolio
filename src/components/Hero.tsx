export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-text">
        <p className="hero-kicker">Carlos Santisteban</p>
        <h1 className="hero-name">
          Product-Minded<br />
          <span className="line2">Software Engineer</span>
        </h1>
        <p className="hero-tagline">
          Product-minded software engineer building polished user-facing apps,
          practical product features, and AI-assisted development workflows.
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
            <div className="stat-num">UI <span className="stat-unit">+ Product</span></div>
            <div className="stat-label">user-facing engineering focus</div>
          </div>
          <div className="stat">
            <div className="stat-num">AI <span className="stat-unit">Workflows</span></div>
            <div className="stat-label">independent full-stack apps</div>
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
            <span className="cmt">// product engineering focus</span><br />
            <span className="kw">const</span> <span className="fn">strengths</span> = {'{'}<br />
            &nbsp;&nbsp;ui: [<span className="str">"systems"</span>, <span className="str">"forms"</span>, <span className="str">"flows"</span>],<br />
            &nbsp;&nbsp;stack: [<span className="str">"React"</span>, <span className="str">"TypeScript"</span>, <span className="str">"Node"</span>],<br />
            &nbsp;&nbsp;delivery: [<span className="str">"prototype"</span>, <span className="str">"slice"</span>, <span className="str">"ship"</span>],<br />
            &nbsp;&nbsp;ai: <span className="str">"practical, reviewed, useful"</span><br />
            {'}'}
          </div>
        </div>
        <div className="visual-badge">Open to work</div>
      </div>
    </section>
  )
}
