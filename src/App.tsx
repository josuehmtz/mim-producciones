import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Clients } from './components/sections/Clients'
import { Contact } from './components/sections/Contact/Contact'
import { CtaBanner } from './components/sections/CtaBanner'
import { Hero } from './components/sections/Hero'
import { Process } from './components/sections/Process'
import { Projects } from './components/sections/Projects/Projects'
import { Services } from './components/sections/Services'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { WhatsAppFab } from './components/ui/WhatsAppFab'

export default function App() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <ScrollProgress />
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Clients />
        <Services />
        <Projects />
        <About />
        <Process />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
