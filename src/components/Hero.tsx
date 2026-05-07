export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-text">
        <h1 className="hero-name">
          Carlos<br />
          <span className="line2">Santisteban</span>
        </h1>
        <p className="hero-tagline">
          Fullstack engineer with a frontend focus. 8+ years building user-friendly,
          functional, good-looking web applications with React and TypeScript —
          and a genuine passion for the craft.
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">See my work →</a>
          <a href="/Carlos_Santisteban_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download CV ↓</a>
          <a href="mailto:carlos.santisteban@outlook.com" className="btn btn-ghost">Get in touch</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">8 <span className="stat-unit">Years</span></div>
            <div className="stat-label">professional work</div>
          </div>
          <div className="stat">
            <div className="stat-num">15 <span className="stat-unit">Years</span></div>
            <div className="stat-label">hobby development</div>
          </div>
          <div className="stat">
            <div className="stat-num">2 <span className="stat-unit">Years</span></div>
            <div className="stat-label">AI engineering</div>
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
            <span className="cmt">// my stack</span><br />
            <span className="kw">const</span> <span className="fn">carlos</span> = {'{'}<br />
            &nbsp;&nbsp;frontend: [<span className="str">"React"</span>, <span className="str">"TypeScript"</span>],<br />
            &nbsp;&nbsp;backend: [<span className="str">"Node.js"</span>, <span className="str">"Redis"</span>],<br />
            &nbsp;&nbsp;tools: [<span className="str">"Vite"</span>, <span className="str">"Claude Code"</span>],<br />
            &nbsp;&nbsp;realtime: [<span className="str">"PartyKit"</span>, <span className="str">"WS"</span>],<br />
            &nbsp;&nbsp;passion: <span className="str">"∞"</span><br />
            {'}'}
          </div>
        </div>
        <div className="visual-badge">Open to work ✦</div>
      </div>
    </section>
  )
}
