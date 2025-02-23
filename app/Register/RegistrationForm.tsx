import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  phone: string;
  email: string;
  confirmEmail: string;
  institutionType: 'college' | 'school';
  institutionName: string;
  streamOrClass: string;
  yearOfGraduation: string;
}

interface RegistrationFormProps {
  onRegister: (newAmbassador: any) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    confirmEmail: '',
    institutionType: 'college',
    institutionName: '',
    streamOrClass: '',
    yearOfGraduation: '',
  });

  // Rest of the imports and states remain the same...

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Rest of the handlers remain the same...

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen p-8 bg-gradient-to-br from-green-900 to-gray-900">
      <div className="text-center md:text-left">
        {/* Left side content remains the same */}
      </div>

      <div className="bg-green-900/20 backdrop-blur-sm rounded-lg shadow-lg p-6">
        {isRegistered ? (
          // Registration success content remains the same
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              // Error display remains the same
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <input
                type="email"
                name="confirmEmail"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Confirm your email"
                value={formData.confirmEmail}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <select
                name="institutionType"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                value={formData.institutionType}
                onChange={handleChange}
              >
                <option value="college">College</option>
                <option value="school">School</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <input
                type="text"
                name="institutionName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder={`Enter your ${formData.institutionType === 'college' ? 'college' : 'school'} name`}
                value={formData.institutionName}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <input
                type="text"
                name="streamOrClass"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder={`Enter your ${formData.institutionType === 'college' ? 'branch/stream' : 'class'}`}
                value={formData.streamOrClass}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <input
                type="text"
                name="yearOfGraduation"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Enter your year of graduation"
                value={formData.yearOfGraduation}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
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
            </motion.div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;