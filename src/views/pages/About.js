import React from "react";
import Navbar from "../Navbar";
import { FaDumbbell, FaAppleAlt, FaChartLine, FaRobot, FaUsers } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const About = () => {
  return (
    <div className="fit-maker-website-container min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
      {/* Navbar */}
      <div className="fit-maker-login-page-navbar">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="min-w-full relative flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-orange-600/80 to-red-600/80 shadow-lg border-b border-gray-800 rounded-xl mt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
          About <span className="text-white">Make<span style={{color:"red"}}>Fit</span></span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-200">
          Your all-in-one fitness companion.  
          We combine technology, nutrition, and workouts to make your fitness journey seamless.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="bg-gray-900/80 border border-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center">
          <FaDumbbell className="text-5xl text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Workout Tracking</h3>
          <p className="text-gray-300">
            Log workouts, monitor progress, and stay on top of your goals with smart tracking.
          </p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center">
          <FaAppleAlt className="text-5xl text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Meal Planner</h3>
          <p className="text-gray-300">
            Personalized meal plans tailored to your calories, diet type, and health goals.
          </p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center">
          <FaChartLine className="text-5xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
          <p className="text-gray-300">
            Visualize your fitness journey with insights, charts, and performance metrics.
          </p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center">
          <FaRobot className="text-5xl text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI Assistance</h3>
          <p className="text-gray-300">
            Get AI-powered workout suggestions, posture correction, and fitness tips.
          </p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center">
          <FaUsers className="text-5xl text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Community</h3>
          <p className="text-gray-300">
            Connect with other fitness enthusiasts, share progress, and stay motivated.
          </p>
        </div>
      </section>

      {/* Mission + Vision Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-orange-600/30 to-red-600/30 border border-gray-700 p-8 rounded-2xl shadow-xl backdrop-blur-lg">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">Our Mission</h2>
          <p className="text-gray-200">
            To make **fitness accessible, personalized, and engaging** through innovative tools that
            simplify nutrition and workouts.
          </p>
        </div>
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700 p-8 rounded-2xl shadow-xl backdrop-blur-lg">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">Our Vision</h2>
          <p className="text-gray-200">
            A world where **healthy living is a lifestyle, not a challenge**. FitMaker envisions a
            global fitness community driven by knowledge, motivation, and technology.
          </p>
        </div>
      </section>
      <footer className="bg-[#0e0e0e] text-gray-300 pt-16 pb-10 px-4 w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
              <div className="md:col-span-2 space-y-4">
                <h1 className="text-2xl font-bold text-white">
                  Make<span className="text-red-600">Fit</span>
                </h1>
                <p className="text-sm leading-relaxed">
                  Transform Your Body with MakeFit, Your Trusted Partner in Fitness.
                  With Over <span className="text-red-500 font-semibold">5 Years</span> of Experience, We Offer Expert Coaching,
                  Tailored Workout Plans, and Comprehensive Nutritional Guidance.{' '}
                  <span className="text-blue-400 underline">Join Our Community</span> and Start Your Journey Towards a Healthier, Stronger You.
                </p>
                <div className="flex gap-4 text-white text-xl">
                  <FaFacebook />
                  <FaInstagram />
                  <FaXTwitter />
                  <FaYoutube />
                </div>
              </div>
      
              <div>
                <h3 className="text-red-500 font-semibold mb-3">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>About Us</li>
                  <li>Our Services</li>
                  <li>Careers</li>
                  <li>Blog</li>
                  <li>Testimonial</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div>
                <h3 className="text-red-500 font-semibold mb-3">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>Fitness Tools</li>
                  <li>Workout Videos</li>
                  <li>Nutrition Guides</li>
                  <li>FAQ</li>
                  <li>Success Stories</li>
                  <li>Membership</li>
                </ul>
              </div>
              <div>
                <h3 className="text-red-500 font-semibold mb-3">Programs</h3>
                <ul className="space-y-2 text-sm">
                  <li>Weight Loss</li>
                  <li>Building Muscles</li>
                  <li>Home Workout</li>
                  <li>Gym Plan</li>
                  <li>Our Plans</li>
                  <li>Fitness Group</li>
                </ul>
              </div>
      
              {/* Contact */}
              <div>
                <h3 className="text-red-500 font-semibold mb-3">Contact Us</h3>
                <ul className="space-y-2 text-sm">
                  <li>📍 Gurugram, India</li>
                  <li>📞 1234-56789</li>
                  <li>📧 MakeFitAll@Gmail.Com</li>
                </ul>
              </div>
            </div>
          </footer>
    </div>
  );
};

export default About;
