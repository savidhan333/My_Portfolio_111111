"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const galleryItems = [
  {
    title: "UI Design",
    image: "/modern-ui-design.png",
  },
  {
    title: "3D Animation",
    image: "/3d-animation.png",
  },
  {
    title: "Web Development",
    image: "/web-development-concept.png",
  },
  {
    title: "Brand Identity",
    image: "/brand-identity-concept.png",
  },
]

export default function Gallery() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
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
    <section id="gallery" className="relative py-32 px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16 glow-text">Design Gallery</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className={`relative group cursor-pointer transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedItem(index)}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedItem !== null && (
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedItem(null)}
          >
            <div className="relative max-w-4xl w-full">
              <Image
                src={galleryItems[selectedItem].image || "/placeholder.svg"}
                alt={galleryItems[selectedItem].title}
                width={1200}
                height={800}
                className="w-full rounded-2xl glow"
              />
              <button
                className="absolute top-4 right-4 glass px-4 py-2 rounded-lg hover:glow transition-all"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
