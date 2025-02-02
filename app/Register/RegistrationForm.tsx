import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  phone: string;
  email: string;
  confirmEmail: string;
  college: string; // Changed from university to college
  branch: string;
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
    college: '', // Changed from university to college
    branch: '',
    yearOfGraduation: '',
  });
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const messages = [
    "👋 Hi there! Ready to join the mission?",
    "🌟 Let's make a difference together!",
    "🚀 Welcome aboard, future ambassador!",
    "🌍 Your journey to sustainability starts now!",
    "💚 Thanks for joining us!",
    "🌱 Every step counts towards a greener future!",
    "🌞 Shine bright and make an impact!",
    "🌿 Together, we can change the world!",
    "🌈 Your efforts make a colorful difference!",
    "🌻 Let's grow a sustainable tomorrow!",
    "✨ Your passion is the spark for a brighter future!",

"🌿 Small actions today, big impact tomorrow!",

"🌊 Dive into change and ride the wave of sustainability!",

"🌳 Plant the seeds of hope for generations to come!",

"💡 Innovation + passion = a sustainable revolution!",

"🌏 Be the change you wish to see in the world!",

"🌟 Your commitment lights the way for others!",

"🌻 Bloom where you’re planted and inspire growth!",

"🌞 Harness the power of the sun and your potential!",

"🌱 Sustainability starts with you—let’s grow together!",

"🌍 Every choice matters. Choose wisely, choose green!",

"🌈 Dream big, act boldly, and paint the world green!",

"🌿 Nature thanks you for being its champion!",

"🚀 Blast off into a future full of hope and change!",

"🌎 Protect today, preserve tomorrow!",

"🌻 Your efforts are the roots of a thriving planet!",

"🌞 Brighten the world with your sustainable actions!",

"🌍 Let’s create a legacy of love for the Earth!",

"🌿 Green is not just a color—it’s a way of life!",
    
  ];
  const [messageIndex, setMessageIndex] = useState<number>(0);

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

    if (formData.email !== formData.confirmEmail) {
      setError('Emails do not match. Please re-enter your email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://igbc-work.onrender.com/api/ambassadors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, score: 0 }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('Email is already taken. Please use a different email.');
        }
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      onRegister(data);
      setIsRegistered(true);
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowLeaderboard = () => {
    router.push('/#leaderboard');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen p-8 bg-gradient-to-br from-green-900 to-gray-900">
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
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onHoverStart={() => {
              setIsHovered(true);
              setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
            }}
            onHoverEnd={() => setIsHovered(false)}
          >
            <img
              src="/hai.png"
              alt="WALL-E"
              className="w-64 h-64 mx-auto md:mx-0 object-contain cursor-pointer"
            />
          </motion.div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 text-green-400"
              >
                <p>{messages[messageIndex]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="bg-green-900/20 backdrop-blur-sm rounded-lg shadow-lg p-6">
        {isRegistered ? (
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                Thank you for registering!
              </h3>
              <p className="text-gray-300">You will receive an email from us shortly.</p>
              <br />
              <div className="bg-green-800 p-4 rounded-lg shadow-lg">
                <p className="text-gray-300 font-bold">Don't forget to peek into your promotions tab for our welcome email!</p>
                <br />
                <Button
                  onClick={() => setShowButtons(true)}
                  className="bg-green-700/50 backdrop-blur-lg hover:bg-green-600 text-white text-lg px-8 py-4 md:px-10 md:py-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  OK
                </Button>
              </div>
            </motion.div>
            <br />
            {showButtons && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col space-y-4"
              >
                <Button
                  onClick={handleShowLeaderboard}
                  className="bg-green-700/50 backdrop-blur-lg hover:bg-green-600 text-white text-lg px-8 py-4 md:px-10 md:py-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  Show Leaderboard
                </Button>
                <Button
                  onClick={handleBackToHome}
                  className="bg-gray-700/50 backdrop-blur-lg hover:bg-gray-600 text-white text-lg px-8 py-4 md:px-10 md:py-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  Back to Home
                </Button>
              </motion.div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-red-50 border-l-4 border-red-400 p-4 mb-6"
              >
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
              </motion.div>
            )}

            {['name', 'phone', 'email', 'confirmEmail', 'college', 'branch', 'yearOfGraduation'].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <input
                  type={field === 'email' || field === 'confirmEmail' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder={`Enter your ${field === 'college' ? 'college' : field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  value={formData[field as keyof FormData]}
                  onChange={handleChange}
                />
              </motion.div>
            ))}

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