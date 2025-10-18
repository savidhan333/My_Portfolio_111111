"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "ChatHands (Voice-to-Sign Language Translator)",
    dates: "June 2024 – Present",
    description:
      "Built an AI-powered application using Java and Three.js to teach sign language through animated characters (e.g., Spiderman). Enhanced accessibility for deaf children, making learning engaging and interactive. Planned integration of a voice-to-sign language translator feature in the last year. Automated UI testing with AI tools, reducing development time by 20%.",
    tech: ["Java", "Three.js", "AI Tools", "Animation"],
    image: "/ai-sign-language-translator-with-animated-characte.jpg",
    link: "https://project-chathands.vercel.app/",
  },
  {
    title: "ChatGPT Clone",
    dates: "Jan 2024 – Jan 2025",
    description:
      "Developed a Python-based chatbot using Google Gemini API with natural language processing capabilities. Automated training data preprocessing, boosting model accuracy and response speed. Received positive feedback in peer testing for smooth conversational flow.",
    tech: ["Python", "Google Gemini API", "NLP", "AI Workflow Automation"],
    image: "/modern-chatbot-interface-with-ai-conversation.jpg",
    link: "https://chatgpt-clone-2-0.vercel.app/",
  },
  {
    title: "Fitness Diet Planner",
    dates: "Apr 2024 – May 2024",
    description:
      "Designed and developed a mobile application using Java and Google Gemini API to generate personalized diet plans. Focused on user experience (UX) with an intuitive interface and AI-based meal recommendations tailored to regional preferences and fitness goals. Earned excellent peer reviews for functionality and design.",
    tech: ["Java", "Google Gemini API", "UI/UX Design", "AI Recommendations"],
    image: "/fitness-diet-planner-mobile-app-interface.jpg",
    link: null,
  },
  {
    title: "Analytics Dashboard",
    dates: "Oct 2025 – Present",
    description:
      "Built a modern, responsive analytics dashboard featuring real-time data visualization, interactive charts, and an intuitive UI. Implemented advanced filtering and live updates to provide actionable insights for data-driven decisions. Optimized UI/UX with dark/light theme support and responsive design for desktop, tablet, and mobile devices.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Radix UI", "shadcn/ui", "Recharts"],
    image: "/modern-analytics-dashboard.png",
    link: "https://analytics-dashboard-three-pi.vercel.app/",
  },
]

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleProjects((prev) => [...new Set([...prev, index])])
          }
        },
        { threshold: 0.2 },
      )

      if (ref) observer.observe(ref)
      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <section id="projects" className="relative py-32 px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16 glow-text">Featured Projects</h2>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                projectRefs.current[index] = el
              }}
              className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div
                className={`transition-all duration-1000 ${
                  visibleProjects.includes(index)
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${index % 2 === 0 ? "-translate-x-10" : "translate-x-10"}`
                } ${index % 2 === 1 ? "md:order-2" : ""}`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 glow rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="relative rounded-2xl border border-primary/20"
                  />
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-300 ${
                  visibleProjects.includes(index)
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${index % 2 === 0 ? "translate-x-10" : "-translate-x-10"}`
                } ${index % 2 === 1 ? "md:order-1" : ""}`}
              >
                <p className="text-sm text-primary/80 mb-2">{project.dates}</p>
                <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="glass px-4 py-2 rounded-lg text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link ? (
                  <Button asChild className="glow hover:scale-105 transition-transform duration-300">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project →
                    </a>
                  </Button>
                ) : (
                  <Button disabled className="opacity-50 cursor-not-allowed">
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
