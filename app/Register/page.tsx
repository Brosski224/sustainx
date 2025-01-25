"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import ParticleBackground from "../components/particle-background";
import RegistrationForm from "./RegistrationForm";

interface RegisterProps {
  onRegister?: (newAmbassador: any) => void; // Make `onRegister` optional
}

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

const Register: React.FC<RegisterProps> = ({ onRegister = () => {} }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  console.log("onRegister in Register:", onRegister); // Debugging

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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-green-900/30 backdrop-blur-sm rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-green-400 mb-6">
              Register as Campus Ambassador
            </h1>
            <p className="text-gray-300 text-center mb-8">
              Fill out the form below to join our network of campus ambassadors.
            </p>
            <RegistrationForm onRegister={onRegister} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;