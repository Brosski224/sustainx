"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"

export default function Prizes() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          Prizes & Benefits
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-green-900/30 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Trophy className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Top 3 Performers
              </h3>
              <p className="text-green-300">
                Cash prizes worth ₹20,000 as a token of recognition for
                outstanding efforts.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-green-900/30 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Medal className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Top 10 Performers
              </h3>
              <p className="text-green-300">
                Exclusive goodies and premium SustainX merchandise.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-green-900/30 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Award className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Top 50 Performers
              </h3>
              <p className="text-green-300">
                Special Certificates of Excellence celebrating exceptional
                contributions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  )
}