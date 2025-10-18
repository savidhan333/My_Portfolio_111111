"use client"

import { useState } from "react"
import { Lightbulb, Rocket, Handshake, BookOpen } from "lucide-react"

const philosophies = [
  {
    icon: Lightbulb,
    title: "Clean Code",
    description: "I believe in writing clean, maintainable code that solves real-world problems.",
  },
  {
    icon: Rocket,
    title: "Growth Mindset",
    description: "I approach challenges with curiosity and see them as opportunities to grow.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "I value teamwork and collaboration, while taking ownership when required.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "I'm committed to continuous learning and adapting to new technologies quickly.",
  },
]

export default function WorkPhilosophy() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

  return (
    <section className="relative py-32 px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16 glow-text">My Work Philosophy</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophies.map((philosophy, index) => {
            const Icon = philosophy.icon
            const isFlipped = flippedIndex === index

            return (
              <div
                key={index}
                className="philosophy-card-container h-64"
                onMouseEnter={() => setFlippedIndex(index)}
                onMouseLeave={() => setFlippedIndex(null)}
              >
                <div className={`philosophy-card ${isFlipped ? "flipped" : ""}`}>
                  {/* Front of card */}
                  <div className="philosophy-card-front glass rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full">
                    <div className="mb-4 p-4 rounded-full bg-primary/10 glow">
                      <Icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold">{philosophy.title}</h3>
                  </div>

                  {/* Back of card */}
                  <div className="philosophy-card-back glass rounded-2xl p-8 flex items-center justify-center text-center h-full">
                    <p className="text-lg leading-relaxed italic text-muted-foreground">{philosophy.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
