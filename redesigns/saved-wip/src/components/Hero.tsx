export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker">Carlos Santisteban</p>
        <h1 className="hero-title" id="hero-title">
          Software engineer,<br />
          <span>frontend first.</span>
        </h1>
        <p className="hero-intro">
          I build user-facing products with React, TypeScript, practical full-stack ownership, and a sharp eye for interaction.
        </p>
        <div className="hero-actions">
          <a href="#work" className="button button-primary">Selected work</a>
          <a href="/Carlos_Santisteban_CV.pdf" target="_blank" rel="noopener noreferrer" className="button button-secondary">CV</a>
        </div>
      </div>

      <figure className="hero-media">
        <img
          src="/portfolio-still-life-1024.webp"
          alt="A cobalt acrylic plane, frosted prism, and metal hand plane arranged in a precise studio still life"
          fetchPriority="high"
        />
      </figure>
    </section>
  )
}
