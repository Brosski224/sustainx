"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("up")
  const controls = useAnimation()

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (scrollDirection === "down") {
      controls.start({ opacity: 0, transition: { duration: 0.3 } })
    } else {
      controls.start({ opacity: 1, transition: { duration: 0.3 } })
    }
  }, [scrollDirection, controls])

  return (
    <nav className="fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo on the left corner */}
          <motion.a
            href="https://www.igbccusat.com/"
            className="text-green-400 text-xl font-bold"
          >
            <div className="flex items-center">
              <img
                src="/igbc.png"
                alt="igbc Logo"
                className="w-24 h-24 object-contain transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  console.error("Image failed to load", e)
                }}
              />
            </div>
          </motion.a>

          {/* Desktop Navigation - Centered with Transparent Box */}
          <motion.div
            className="hidden md:flex flex-grow justify-center space-x-8 bg-green-900/50 backdrop-blur-lg rounded-lg px-6 py-2 w-auto"
            animate={controls}
          >
            {["About", "Events", "Speakers", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-green-300 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>

          {/* SustainX Logo on the right corner */}
          <motion.a
            href="#" // Add the desired link here
            className="text-green-400 text-xl font-bold"
          >
            <div className="flex items-center">
              <img
                src="/sustainxlogo.png"
                alt="SustainX Logo"
                className="w-24 h-24 object-contain transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  console.error("Image failed to load", e)
                }}
              />
            </div>
          </motion.a>

          {/* Mobile Menu Button */}
          <Button className="md:hidden text-green-300" variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className="md:hidden"
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-green-900/90 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {["About", "Events", "Speakers", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-green-300 hover:text-white transition-colors px-4 py-2"
                  whileHover={{ x: 4 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}