"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, BookOpen, Network, Users2 } from "lucide-react"

const benefits = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Leadership Experience",
    description: "Develop valuable leadership skills while promoting sustainability",
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Networking Opportunities",
    description: "Connect with industry experts and like-minded individuals",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Knowledge Enhancement",
    description: "Access exclusive workshops and learning resources",
  },
  {
    icon: <Users2 className="w-6 h-6" />,
    title: "Community Impact",
    description: "Make a real difference in your campus community",
  },
]

export function CampusAmbassadorsSection() {
  return (
    <section id="campus-ambassadors" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Campus Ambassadors</h2>
          <p className="text-green-300 text-lg md:text-xl max-w-2xl mx-auto">
            Join our network of campus ambassadors and lead the sustainability movement at your institution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-green-900/30 backdrop-blur-sm p-8 rounded-lg border border-green-500/20"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Become an Ambassador</h3>
            <p className="text-green-300 mb-6">
              As a Campus Ambassador, you'll be at the forefront of promoting sustainable practices and green
              initiatives within your educational institution. This is your chance to make a real impact while
              developing valuable skills.
            </p>
            <Button className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white">Apply Now</Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-green-900/30 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-green-400 mb-4">{benefit.icon}</div>
                    <h4 className="text-white text-lg font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-green-300/80">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

