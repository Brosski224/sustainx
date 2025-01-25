"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Text on the Left */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          {/* "CAMPUS AMBASSADOR" Text (Visible Initially) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-2xl md:text-4xl font-bold text-white">Be the</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-green-400"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            CAMPUS AMBASSADOR
          </motion.h1>

          {/* "Be the" and "of SUSTAINX" Text (Fade In Later) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-2xl md:text-4xl font-bold text-white">of SUSTAINX</span>
          </motion.div>

          {/* "Apply Now" Button (Fade In Later) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <Button
              onClick={() => router.push("./Register")} // Redirect to Register.tsx
              className="bg-green-700/50 backdrop-blur-lg hover:bg-green-600 text-white text-lg px-8 py-4 md:px-10 md:py-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Apply Now
            </Button>
          </motion.div>
        </div>

        {/* Walle Image on the Right with Animation */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.img
            src="/walle.png" // Replace with the correct path to your image
            alt="Walle"
            className="w-64 h-64 md:w-96 md:h-96 object-contain"
            animate={{ y: [0, -10, 0] }} // Floating animation
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}