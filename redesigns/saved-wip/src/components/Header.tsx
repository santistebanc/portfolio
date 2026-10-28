export default function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#hero" aria-label="Carlos Santisteban, home">
        Carlos Santisteban
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#ai-workflow">Approach</a>
        <a href="#about">About</a>
        <a href="/Carlos_Santisteban_CV.pdf" target="_blank" rel="noopener noreferrer">CV</a>
      </nav>
    </header>
  )
}
