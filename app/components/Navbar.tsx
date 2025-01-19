"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: "Work & Projects", path: "/Work" },
    { name: "Blog", path: "/Blog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Main Navbar */}
      <nav
        className={`
          relative w-full h-16 md:h-20
          transition-all duration-300 
          ${
            isScrolled
              ? "bg-base-100/90 backdrop-blur-md shadow-lg"
              : "bg-base-100/80 backdrop-blur-sm"
          }
        `}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Logo/Brand */}
            <Link
              href="/"
              className="font-heading text-lg sm:text-xl md:text-2xl 
                       hover:opacity-80 transition-all duration-300"
            >
              Yash Bhalchandra
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="px-3 py-2 text-base lg:text-lg font-medium
                           hover:text-base-content/70 transition-colors duration-300
                           rounded-lg hover:bg-base-200/50"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2
                         rounded-lg hover:bg-base-200/50 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`
          absolute top-16 left-0 right-0 w-full
          bg-base-100 md:hidden
          transition-all duration-300 ease-in-out
          shadow-lg
          ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-base font-medium rounded-lg
                         hover:bg-base-200/50 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
