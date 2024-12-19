"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar bg-primary text-base-content p-5">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Yash Bhalchandra
        </Link>
      </div>

      {/* Mobile menu button */}
      <div className="flex md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="btn btn-ghost"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal gap-2">
          <li>
            <Link href="/About" className="text-xl">
              About
            </Link>
          </li>
          <li>
            <Link href="/Work" className="text-xl">
              Work
            </Link>
          </li>
          <li>
            <Link href="/Blog" className="text-xl">
              Blog
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-full bg-primary md:hidden">
          <ul className="menu menu-vertical p-2">
            <li>
              <Link href="/About" className="text-xl">
                About
              </Link>
            </li>
            <li>
              <Link href="/Work" className="text-xl">
                Work
              </Link>
            </li>
            <li>
              <Link href="/Blog" className="text-xl">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
