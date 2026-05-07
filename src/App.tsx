import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Skills from './components/Skills'
import CTA from './components/CTA'
import Footer from './components/Footer'
import DecoPattern from './components/DecoPattern'

export default function App() {
  return (
    <>
      <DecoPattern />
      <main>
        <Hero />
        <Work />
        <About />
      </main>
      <Skills />
      <CTA />
      <Footer />
    </>
  )
}
