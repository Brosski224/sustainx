"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import ParticleBackground from "./components/particle-background"
import Navigation from "./components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AboutSection } from "./sections/about"
import { CampusAmbassadorsSection } from "./sections/campus-ambassadors"
import LeaderboardSection from "./sections/leaderboard"
import Footer from "./components/footer"
import { Trophy, Medal, Award } from "lucide-react"
import { Leaf, Users, Building2, Globe2 } from "lucide-react"

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
                   Join the flagship annual conference by IGBC Student Chapter of CUSAT, where sustainability meets innovation.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-100 transition-colors inline-flex items-center space-x-2 hover:shadow-lg hover:scale-105 transform transition duration-300"
                  >
                    < Users className="w-6 h-6" />, 
                    Become an Ambassador
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </section>

          <AboutSection />
          <CampusAmbassadorsSection />
           {/* New Prizes & Benefits Section */}
           <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="py-20 relative"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Prizes & Benefits</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-green-900/30 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-2">Top 3 Performers</h3>
                    <p className="text-green-300">
                      Cash prizes worth ₹20,000 as a token of recognition for outstanding efforts.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-green-900/30 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Medal className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-2">Top 10 Performers</h3>
                    <p className="text-green-300">Exclusive goodies and premium SustainX merchandise.</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-900/30 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Award className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-2">Top 50 Performers</h3>
                    <p className="text-green-300">
                      Special Certificates of Excellence celebrating exceptional contributions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          
          </motion.section>
          <LeaderboardSection ambassadors={[]} isLoading={false}/>
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