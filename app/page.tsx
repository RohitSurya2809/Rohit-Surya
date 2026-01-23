import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Gallery } from "@/components/gallery"
import { Experience } from "@/components/experience"
import { Education } from "@/components/education"
import { Achievements } from "@/components/achievements"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Gallery />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
      <Contact />
    </main>
  )
}
