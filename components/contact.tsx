"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EnvelopeSimple, GithubLogo, LinkedinLogo, MapPin } from "@phosphor-icons/react"

const socialLinks = [
  { name: "GitHub", icon: GithubLogo, url: "https://github.com/SavidhaK23" },
  { name: "LinkedIn", icon: LinkedinLogo, url: "https://www.linkedin.com/in/savidhan-khartade-ab01b6349" },
  { name: "Gmail", icon: EnvelopeSimple, url: "mailto:SavidhanKhartade15@gmail.com" },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const form = e.target as HTMLFormElement
      const iframe = iframeRef.current

      if (iframe) {
        // Submit form to hidden iframe
        form.target = "hidden_iframe"
        form.submit()

        // Show success message after a short delay
        setTimeout(() => {
          setSubmitStatus("success")
          setFormData({ name: "", email: "", message: "" })
          setIsSubmitting(false)

          // Reset status after 5 seconds
          setTimeout(() => setSubmitStatus("idle"), 5000)
        }, 1000)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16 glow-text">Get In Touch</h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing
                together.
              </p>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin size={24} weight="duotone" className="text-primary" />
              <span className="text-lg">Pune, Maharashtra</span>
            </div>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-6 py-4 rounded-lg hover:glow hover:scale-105 transition-all duration-300 flex items-center gap-3"
                  >
                    <Icon size={24} weight="duotone" className="text-primary" />
                    <span className="font-medium">{social.name}</span>
                  </a>
                )
              })}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            action="https://script.google.com/macros/s/AKfycbyrYK-3Mirl-q-CMspjysUtdA5mIYgmynatldXiFnhD1NRdnr08mrsL8kpB_DYlwnSk/exec"
            method="POST"
            className="glass p-8 rounded-2xl space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50 border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background/50 border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-3 py-2 bg-background/50 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            {submitStatus === "success" && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                Failed to send message. Please try again or contact me directly via email.
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full glow hover:scale-105 transition-all duration-300"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          <iframe
            ref={iframeRef}
            name="hidden_iframe"
            style={{ display: "none" }}
            title="Hidden iframe for form submission"
          />
        </div>
      </div>
    </section>
  )
}
