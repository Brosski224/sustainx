"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import ParticleBackground from "./components/particle-background"
import Navigation from "./components/navigation"
import { Button } from "@/components/ui/button"
import { AboutSection } from "./sections/about"
import { SpeakersSection } from "./sections/speakers"
import { CampusAmbassadorsSection } from "./sections/campus-ambassadors"
import Footer from "./components/footer"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      containerRef.current.style.setProperty("--mouse-x", `${x}px`)
      containerRef.current.style.setProperty("--mouse-y", `${y}px`)
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-950 overflow-hidden"
    >
      <ParticleBackground />

      <div className="relative z-10">
        <Navigation />

        <main>
          {/* Enhanced Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-6xl mx-auto"
            >
              {/* Enhanced Logo Container */}
              <motion.div
                className="relative w-96 h-96 md:w-[32rem] md:h-[32rem] mx-auto mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Enhanced Gradient Blur */}
                
                {/* Centered and Enlarged Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/sustainxlogo.png"
                    alt="SustainX Logo"
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error("Image failed to load", e)
                    }}
                  />
                </div>
              </motion.div>

              {/* Enhanced Heading */}
              <motion.h2
                className="text-3xl md:text-4xl font-semibold text-green-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Building Tomorrow
              </motion.h2>

              {/* Enhanced Subheading and Button */}
              <div className="space-y-6">
                <motion.p
                  className="text-green-300 text-2xl md:text-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Transforming Tomorrow Through Sustainable Innovation
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Button
                    size="lg"
                    className="bg-green-500/20 backdrop-blur-sm border border-green-500/50 hover:bg-green-500/30 text-green-300 hover:text-white transition-all duration-300 text-lg py-6 px-8"
                  >
                    Explore Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </section>

          <AboutSection />
          <SpeakersSection />
          <CampusAmbassadorsSection />
        </main>

        <Footer />
      </div>

      {/* Mouse Gradient Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(74, 222, 128, 0.1) 0%, transparent 50%)",
          }}
        ></div>
      </div>
    </div>
  )
}