import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Updated import for App Router



interface FormData {
  name: string;
  phone: string;
  email: string;
  university: string;
}

interface RegistrationFormProps {
  onRegister: (newAmbassador: any) => void; // Define the type for `onRegister` prop
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    university: '',
  });
  const router = useRouter(); 
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
  
    console.log('Form Data:', formData); // Debugging
  
    try {
      const response = await fetch('https://igbc-work.onrender.com/api/ambassadors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, score: 0 }),
      });
  
      const data = await response.json();
      console.log('Response Status:', response.status);
      console.log('Response Data:', data);
  
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
  
      onRegister(data);
      setIsRegistered(true);
    } catch (error: any) {
      console.error('Error:', error.message);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Left Side: Welcome Message and WALL-E Image */}
      <div className="text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
            Welcome, {formData.name || 'Future Ambassador'}!
          </h2>
          <p className="text-gray-300 mb-6">
            Join us in making a difference. Register now to become a part of the SustainX community.
          </p>
          <motion.img
            src="/hai.png" // Replace with your WALL-E image path
            alt="WALL-E"
            className="w-64 h-64 mx-auto md:mx-0 object-contain"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="bg-green-900/20 backdrop-blur-sm rounded-lg shadow-lg p-6">
        {isRegistered ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-400 mb-4">
              Thank you for registering!
            </h3>
            <p className="text-gray-300">
              You will receive an email from us shortly.
            </p>
            <br></br>
        
            <Button
                    onClick={() => router.push("/sections/leaderboard")} // Redirect to Register.tsx
                    className="bg-green-700/50 backdrop-blur-lg hover:bg-green-600 text-white text-lg px-8 py-4 md:px-10 md:py-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    Show Leaderboard
                  </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-transparent focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 peer"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
              <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600">
                Full Name
              </label>
            </div>

            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-transparent focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 peer"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600">
                Phone Number
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-transparent focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 peer"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
              <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600">
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                name="university"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-transparent focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 peer"
                placeholder="Enter your Collage name"
                value={formData.university}
                onChange={handleChange}
              />
              <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600">
               Collage
              </label>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                         bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                         ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'transform transition hover:scale-105'}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  'Register as Ambassador'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;