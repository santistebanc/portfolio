import { Contact, Footer, Skills } from './Contact'
import { Hero, Topbar } from './Hero'
import { Method } from './Method'
import { Route } from './Route'
import { Tweaks } from './Tweaks'
import { useReveal } from './useReveal'
import { Work } from './Work'

export default function App() {
  useReveal()
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Topbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Work />
        <Method />
        <Route />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Tweaks />
    </>
  )
}
