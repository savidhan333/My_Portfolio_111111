import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import WorkPhilosophy from "@/components/work-philosophy"
import Projects from "@/components/projects"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import LightSpots from "@/components/light-spots"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <LightSpots />
      <Header />
      <Hero />
      <About />
      <WorkPhilosophy />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
