"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

type Certificate = {
  title: string
  organization: string
  date: string
  description: string
  type: string
  image?: string
}

const certificates: Certificate[] = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    organization: "Oracle",
    date: "September 2025",
    description:
      "Introduces core concepts of artificial intelligence (AI), machine learning (ML), deep learning, and generative AI. Focuses on practical applications using Oracle Cloud Infrastructure, validating your understanding of key AI and ML terminology.",
    type: "Cloud & AI",
    image: "/certificates/oci_ai.jpg",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    organization: "Oracle",
    date: "September 2025",
    description:
      "Validates advanced expertise in architecting, developing, and deploying generative AI solutions on Oracle Cloud. Demonstrates proficiency in cutting-edge generative AI technologies for real-world implementations.",
    type: "Cloud & AI",
    image: "/certificates/oci_genai.jpg",
  },
  {
    title: "Generative AI Mastery Workshop",
    organization: "OpenAI Academy & NxtWave",
    date: "September 2025",
    description:
      "Successfully completed the Generative AI Mastery Workshop as part of India's Biggest GenAI Buildathon. Gained comprehensive knowledge in generative AI technologies, prompt engineering, and practical AI application development through hands-on learning and real-world project implementation.",
    type: "AI & ML",
    image: "/certificates/openai_nxtwave.jpg",
  },
  {
    title: "Certificate of Attendance (AWS Summit India Online)",
    organization: "Amazon Web Services (AWS)",
    date: "June 2025",
    description:
      "Participated in the AWS Summit India Online, expanding expertise in cloud infrastructure, artificial intelligence, and scalable enterprise solutions. Gained exposure to industry best practices and AWS tools.",
    type: "Cloud & AI",
    image: "/certificates/aws.jpg",
  },
  {
    title: "Completed 5-Day Gen AI Intensive",
    organization: "Kaggle",
    date: "April 2025",
    description:
      "Intensive hands-on training in generative AI and machine learning techniques. Mastered state-of-the-art AI frameworks and tools for end-to-end project development and impactful generative models.",
    type: "AI & ML",
    image: "/certificates/kaggle_genai.jpg",
  },
  {
    title: "Data Analytics Job Simulation (Deloitte)",
    organization: "Forage",
    date: "April 2025",
    description:
      "Completed a forensic technology simulation through Forage, developing advanced skills in data analytics and real-world investigative techniques. Applied data-driven decision-making for business intelligence.",
    type: "Data Analytics",
    image: "/certificates/deloitte_job_simulation.jpg",
  },
  {
    title: "Data Visualization: Empowering Business with Effective Insights (Tata/Forage)",
    organization: "Forage",
    date: "April 2025",
    description:
      "Project-based learning in business scenario framing, effective visual design, and insight communication. Developed practical skills for driving business decisions through advanced data visualization.",
    type: "Data Analytics",
    image: "/certificates/tata.jpg",
  },
  {
    title: "Software Engineering Job Simulation (J.P. Morgan)",
    organization: "Forage",
    date: "April 2025",
    description:
      "Gained hands-on experience executing software engineering projects, including REST API integration and robust data workflows using Kafka and H2. Demonstrated teamwork and technical leadership.",
    type: "Software Engineering",
    image: "/certificates/jp_morgan.jpg",
  },
  {
    title: "PBL Pioneer Contest 2025 – Project Competition Participation",
    organization: "Nutan Maharashtra Institute of Engineering and Technology (NMIET), Pune",
    date: "March 2025",
    description:
      "Participated in NMIET's competitive project contest. Demonstrated innovation, collaboration, and technical expertise by developing and presenting impactful projects.",
    type: "Achievement",
    image: "/certificates/pbl_pioneer.jpg",
  },
  {
    title: "Python Coder",
    organization: "Kaggle",
    date: "March 2025",
    description:
      "Demonstrated strong Python programming skills via hands-on AI and data analytics projects on Kaggle. Proven ability in problem-solving and scalable automation for real-world challenges.",
    type: "Programming",
    image: "/certificates/kaggle_python_coder.jpg",
  },
  {
    title: "AI Internship (Acmegrade)",
    organization: "Acmegrade",
    date: "December 2024",
    description:
      "Completed an applied internship focused on AI and machine learning. Built predictive models and deployed solutions to address contemporary business needs.",
    type: "AI & ML",
    image: "/certificates/acmegrade_internship.jpg",
  },
  {
    title: "Traffic Light System – Experiment5",
    organization: "Infosys Springboard",
    date: "August 2024",
    description:
      "Mastered embedded systems, automation, and hardware interfacing by successfully completing the Traffic Light System Centrado Kit course. Demonstrated problem-solving and technical integration skills.",
    type: "IoT & Embedded",
    image: "/certificates/infosys_traffic_light.jpg",
  },
]

export default function Certifications() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>("All")
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const filters = ["All", ...Array.from(new Set(certificates.map((cert) => cert.type)))]

  const filteredCertificates =
    selectedFilter === "All" ? certificates : certificates.filter((cert) => cert.type === selectedFilter)

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
  }, [filteredCertificates])

  return (
    <section id="certifications" className="relative py-32 px-6 z-10">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-5xl font-bold text-center mb-8 glow-text">Certifications & Achievements</h2>

        {/* Filter Menu */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedFilter === filter
                  ? "bg-accent text-background font-semibold glow"
                  : "glass hover:bg-accent/20 hover:glow"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className={`flip-card h-[400px] transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flip-card-inner">
                {/* Front of Card */}
                <div className="flip-card-front glass rounded-2xl p-6 flex flex-col items-center justify-center">
                  <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden bg-background/50 border border-accent/20">
                    <Image
                      src={
                        cert.image || `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(cert.title)}`
                      }
                      alt={cert.title}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={95}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2 line-clamp-2">{cert.title}</h3>
                  <p className="text-accent text-sm font-semibold">{cert.organization}</p>
                  <p className="text-muted-foreground text-sm mt-2">{cert.date}</p>
                  <div className="mt-4 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                    {cert.type}
                  </div>
                </div>

                {/* Back of Card */}
                <div className="flip-card-back glass rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-3 glow-text">{cert.title}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-accent font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent"></span>
                        {cert.organization}
                      </p>
                      <p className="text-muted-foreground text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                        {cert.date}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed">{cert.description}</p>
                  </div>
                  <div className="mt-4 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium self-start">
                    {cert.type}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
