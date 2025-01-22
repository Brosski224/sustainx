"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Leaf, Users, Building2, Globe2 } from "lucide-react"

const features = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Sustainable Innovation",
    description: "Pioneering green solutions for a better tomorrow through innovative building practices.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Engagement",
    description: "Building a network of sustainability enthusiasts and industry experts.",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Green Infrastructure",
    description: "Promoting eco-friendly architecture and sustainable urban development.",
  },
  {
    icon: <Globe2 className="w-6 h-6" />,
    title: "Global Impact",
    description: "Making a worldwide difference through local sustainable initiatives.",
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
            The flagship event of Indian Green Building Council (IGBC) CUSAT, bringing together innovators, experts, and
            enthusiasts in sustainable development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="SustainX Event"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-green-900/30 backdrop-blur-sm p-6 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors"
              >
                <div className="text-green-400 mb-4">{feature.icon}</div>
                <h3 className="text-white text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-green-300/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

