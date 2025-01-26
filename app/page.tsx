"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleBackground from "./components/particle-background";
import Navigation from "./components/navigation";
import Home from "./sections/home";
import Prizes from "./sections/prizes";
import { AboutSection } from "./sections/about";
import { RolesSection } from "./sections/roles";
import LeaderboardSection from "./sections/leaderboard";
import Footer from "./components/footer";

export default function Page() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [ambassadors, setAmbassadors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set page title, description, and favicon
  useEffect(() => {
    // Set the page title
    document.title = "Campus Ambassador";

    // Set the meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Be the campus ambassador of SUSTAINX");
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "description";
      newMetaDescription.content = "Be the campus ambassador of SUSTAINX";
      document.head.appendChild(newMetaDescription);
    }

    // Set the favicon
    const faviconLink = document.querySelector("link[rel='icon']");
    if (!faviconLink) {
      const newFaviconLink = document.createElement("link");
      newFaviconLink.rel = "icon";
      newFaviconLink.href = "/favicon.ico"; // Path to your favicon
      document.head.appendChild(newFaviconLink);
    }
  }, []);

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
        setError(error.message);
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

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-950 overflow-hidden"
    >
      {/* Background Elements */}
      <ParticleBackground />

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-20"
      >
        <Navigation />
      </motion.div>

      <div className="relative z-10">
        <main>
          <section id="home">
            <Home />
          </section>
          <AboutSection />
          <RolesSection />
          <Prizes />
          <section id="leaderboard">
            <LeaderboardSection ambassadors={ambassadors} isLoading={isLoading} />
          </section>
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