import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const letters = [
    { char: "F", tooltip: "Funding dreams that inspire change" },
    { char: "U", tooltip: "Unleashing innovation worldwide" },
    { char: "N", tooltip: "Nurturing creators and ideas" },
    { char: "D", tooltip: "Driving decentralized impact" },
    { char: "O", tooltip: "Opportunities without limits" },
    { char: "R", tooltip: "Revolutionizing crowdfunding" },
    { char: "A", tooltip: "Achieving goals together" },
  ];

  // Scroll progress
  const { scrollY } = useScroll();

  // Different parallax layers
  const yBg = useTransform(scrollY, [0, 1000], ["0%", "30%"]);   // Background moves slower
  const yMid = useTransform(scrollY, [0, 1000], ["0%", "60%"]);  // Mid-layer
  const yFg = useTransform(scrollY, [0, 1000], ["0%", "100%"]);  // Foreground (floating elements)

  // Animation variants for staggered letters
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const letterAnim = {
    hidden: { y: 80, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 12 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            // "url('https://img.freepik.com/free-vector/modern-city-night-skyline-neon-cartoon_1441-3160.jpg')",
            "url('https://img.freepik.com/free-vector/abstract-pink-neon-light-wave-with-glow-effect_107791-29964.jpg')",
          y: yBg,
        }}
      />

      {/* Mid-layer glowing gradient (adds depth) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-black/70 to-black"
        style={{ y: yMid }}
      />

      {/* Floating Foreground Elements */}
      <motion.div
        className="absolute -top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-orange-500/30 to-pink-500/30 blur-3xl"
        style={{ y: yFg }}
      />
      <motion.div
        className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/30 blur-3xl"
        style={{ y: yFg }}
      />

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center h-[80vh] px-6">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-300 text-lg md:text-xl mb-6"
        >
          Where Innovation Meets Funding Globally Without Limits!
        </motion.p>

        {/* FUNDORA with staggered animation + tooltip */}
        <motion.h1
          className="text-6xl md:text-9xl font-extrabold flex space-x-2 mb-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {letters.map((item, index) => (
            <motion.span
              key={index}
              variants={letterAnim}
              className="relative group cursor-pointer text-white transition-all duration-300"
            >
              <span
                className="transition-all duration-500
                           group-hover:bg-gradient-to-r group-hover:from-orange-400 
                           group-hover:via-pink-500 group-hover:to-purple-600 
                           group-hover:bg-clip-text group-hover:text-transparent"
              >
                {item.char}
              </span>

              {/* Tooltip */}
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
                               px-3 py-1 rounded-md bg-black text-white text-sm 
                               opacity-0 group-hover:opacity-100 
                               transition-opacity duration-300 whitespace-nowrap">
                {item.tooltip}
              </span>
            </motion.span>
          ))}
        </motion.h1>

        {/* Buttons */}
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <Link href="/createcampaign">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
              Start Your Campaign
            </button>
          </Link>

          <Link href="/">
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
              Explore Projects
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
