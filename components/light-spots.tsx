"use client"

import { useEffect, useState } from "react"

export default function LightSpots() {
  const [spots, setSpots] = useState<{ x: number; y: number; delay: number }[]>([])

  useEffect(() => {
    const generateSpots = () => {
      const newSpots = Array.from({ length: 50 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
      }))
      setSpots(newSpots)
    }
    generateSpots()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {spots.map((spot, i) => (
        <div
          key={i}
          className="light-spot animate-pulse"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            animationDelay: `${spot.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
