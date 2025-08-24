"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Wallet from "./components/Wallet";

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/createcampaign", label: "Create Campaign" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
            Fundora
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`uppercase text-sm font-semibold px-3 py-2 rounded-md transition ${pathname === href
                    ? "text-blue-600 dark:text-yellow-400 border-b-2 border-blue-600 dark:border-yellow-400"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-300"
                  }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Wallet Connect */}
            <Wallet />

            {/* Theme Toggle
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
            >
              {theme === "light" ? (
                <MoonIcon className="w-5 h-5 text-gray-800" />
              ) : (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              )}
            </button> */}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t dark:border-gray-700 px-4 pb-4">
          <nav className="flex flex-col gap-2 mt-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`uppercase text-sm font-semibold px-3 py-2 rounded-md transition ${pathname === href
                    ? "text-blue-600 dark:text-yellow-400 border-b-2 border-blue-600 dark:border-yellow-400"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-300"
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
