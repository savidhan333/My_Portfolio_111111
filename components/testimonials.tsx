"use client"

import { useState } from "react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "CEO at TechCorp",
    image: "/professional-woman-diverse.png",
    review:
      "Working with Savidhan was an absolute pleasure. The attention to detail and innovative approach exceeded our expectations.",
  },
  {
    name: "Michael Chen",
    title: "Product Manager",
    image: "/professional-man.jpg",
    review:
      "Incredible work! The 3D elements and animations brought our vision to life in ways we never imagined possible.",
  },
  {
    name: "Emily Rodriguez",
    title: "Design Director",
    image: "/professional-woman-designer.png",
    review:
      "A true professional who understands both design and development. The final product was stunning and performant.",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative py-32 px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16 glow-text">What Clients Say</h2>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-full px-4">
                <div className="glass p-8 rounded-2xl max-w-2xl mx-auto hover:glow transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-primary/20"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{testimonial.name}</h3>
                      <p className="text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">"{testimonial.review}"</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary glow w-8" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
