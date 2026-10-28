import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import AIWorkflow from './components/AIWorkflow'
import Skills from './components/Skills'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main>
        <div id="main-content" />
        <Hero />
        <Work />
        <AIWorkflow />
        <About />
        <Skills />
      </main>
      <Footer />
    </>
  )
}
