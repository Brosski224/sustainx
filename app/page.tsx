"use client"; // Ensure this is a client component

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Updated import for App Router
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleBackground from "./components/particle-background";
import Navigation from "./components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AboutSection } from "./sections/about";
import { CampusAmbassadorsSection } from "./sections/campus-ambassadors";
import LeaderboardSection from "./sections/leaderboard";
import Footer from "./components/footer";
import { Trophy, Medal, Award } from "lucide-react";

export default function Home() {
  const router = useRouter(); // Initialize the router from next/navigation
  const containerRef = useRef<HTMLDivElement>(null);
  const [ambassadors, setAmbassadors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ambassadors data from the backend
  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        const response = await fetch("https://igbc-work.onrender.com/api/ambassadors");
        if (!response.ok) {
          throw new Error("Failed to fetch ambassadors");
        }
        const data = await response.json();
        setAmbassadors(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchAmbassadors();
  }, []);

  // Handle mouse position for gradient effect
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Scroll animation for the logo
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]); // Zoom out effect
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]); // Fade out effect

  // Animated Circles Background Component
  const AnimatedCircles = () => {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full bg-green-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-950 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <ParticleBackground />
      <AnimatedCircles />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(34, 197, 94, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(34, 197, 94, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, rgba(6, 95, 70, 0.3) 50%, rgba(5, 46, 22, 0.8) 100%)",
        }}
      ></div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/path/to/noise-texture.png')",
          opacity: 0.1,
        }}
      ></div>

      {/* Navigation (hidden initially) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }} // Fade in after logo animation
        className="relative z-20"
      >
        <Navigation />
      </motion.div>

      <div className="relative z-10">
        <main>
          {/* Walle Section */}
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

          {/* Other Sections */}
          <AboutSection />
          <CampusAmbassadorsSection />

          {/* Prizes & Benefits Section */}
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

          {/* Leaderboard Section */}
          <LeaderboardSection ambassadors={ambassadors} isLoading={isLoading} />
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
  );
}