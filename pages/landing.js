import React from "react";
import Link from "next/link";

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

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/your-background.jpg')" }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Navbar */}
      {/* <header className="relative z-10 flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold text-orange-500">Fundora</h1>
        <nav className="space-x-8 text-white font-semibold">
          <Link href="/" className="hover:text-orange-400">
            HOME
          </Link>
          <Link href="/about" className="hover:text-orange-400">
            ABOUT US
          </Link>
          <Link href="/createcampaign" className="hover:text-orange-400">
            CREATE CAMPAIGN
          </Link>
          <Link href="/dashboard" className="hover:text-orange-400">
            DASHBOARD
          </Link>
        </nav>
      </header> */}

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center h-[80vh] px-6">
        {/* Subtitle */}
        <p className="text-gray-300 text-lg md:text-xl mb-6">
          Where Innovation Meets Funding Globally Without Limits!
        </p>

        {/* FUNDORA with tooltip on each letter */}
        <h1 className="text-6xl md:text-8xl font-extrabold flex space-x-2 mb-6">
  {letters.map((item, index) => (
    <span
      key={index}
      className="relative group cursor-pointer 
                 text-white transition-all duration-300"
    >
      <span
        className="transition-all duration-500
                   group-hover:bg-gradient-to-r group-hover:from-orange-400 
                   group-hover:via-pink-500 group-hover:to-purple-600 
                   group-hover:bg-clip-text group-hover:text-transparent"
      >
        {item.char}
      </span>

      {/* Tooltip BELOW the letter */}
      <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
                       px-3 py-1 rounded-md bg-black text-white text-sm 
                       opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300 whitespace-nowrap">
        {item.tooltip}
      </span>
    </span>
  ))}
</h1>

<br></br>
        {/* Buttons */}
        <div className="flex space-x-4">
          <Link href="/createcampaign">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium">
              Start Your Campaign
            </button>
          </Link>

          <Link href="/campaigns">
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium">
              Explore Projects
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
