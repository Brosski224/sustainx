"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, Twitter } from "lucide-react"

const speakers = [
  {
    name: "Dr. Arun Kumar",
    role: "Sustainable Architecture Expert",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Leading expert in sustainable architecture with 15+ years of experience",
    email: "arun@example.com",
    phone: "+91 98765 43210",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Priya Sharma",
    role: "Green Energy Innovator",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Pioneer in renewable energy solutions and sustainable technology",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Rajesh Menon",
    role: "Urban Planning Specialist",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Expert in sustainable urban development and smart city planning",
    email: "rajesh@example.com",
    phone: "+91 76543 21098",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
]

export function SpeakersSection() {
  return (
    <section id="speakers" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Speakers</h2>
          <p className="text-green-300 text-lg md:text-xl max-w-2xl mx-auto">
            Meet our distinguished speakers who are leading the way in sustainable development and green building
            practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-green-900/30 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      fill
                      className="rounded-full object-cover border-2 border-green-500/50"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white text-center mb-2">{speaker.name}</h3>
                  <p className="text-green-400 text-center mb-4">{speaker.role}</p>
                  <p className="text-green-300/80 text-center mb-6">{speaker.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-400 hover:text-white hover:bg-green-800/50"
                    >
                      <Mail className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-400 hover:text-white hover:bg-green-800/50"
                    >
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-400 hover:text-white hover:bg-green-800/50"
                    >
                      <Linkedin className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-400 hover:text-white hover:bg-green-800/50"
                    >
                      <Twitter className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

