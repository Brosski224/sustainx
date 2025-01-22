"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Leaf, Users, Building2, Globe2 } from "lucide-react"

const features = [
  {
    title: "Who Can Apply?",
    description: "Any student currently pursuing education in a recognized institute who is passionate about sustainability and wishes to contribute to the success of SustainX: Building Tomorrow.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About SustainX</h2>
          <p className="text-green-300 text-lg md:text-xl max-w-2xl mx-auto">
            SustainX: Building Tomorrow is the flagship annual conference organized by the IGBC Student Chapter of CUSAT,
            a vibrant part of the Confederation of Indian Industry (CII). The event serves as a platform to champion
            the importance of sustainability and green practices. Through interactive sessions, workshops, and engaging activities, 
            SustainX aims to empower participants to integrate eco-friendly practices into their personal and professional lives, 
            contributing to a sustainable future for all.
          </p>
        </motion.div>

        <div className="flex justify-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-green-900/30 backdrop-blur-sm p-6 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors max-w-2xl w-full"
            >
              <h3 className="text-white text-lg font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-green-300/80 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}