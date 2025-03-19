'use client'
import React, { useState } from "react";
import Image from "next/image";
import cart from "../public/cart.jpg";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-20">
      <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 shadow-md flex justify-between items-center h-[10vh] px-4 md:px-12 border-b border-gray-200 dark:border-gray-700">
        {/* Logo and Title */}
        <div className="flex items-center">
          <Image
            src={cart}
            width={60}
            height={60}
            alt="logo"
            className="m-2 rounded-full shadow-xl"
          />
          <h2 className="text-4xl font-extrabold ml-3 text-white dark:text-blue-400 tracking-wide">TradeVault</h2>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-lg font-bold text-white dark:text-gray-200">
          <Link href="/" className="hover:text-yellow-400 transition-colors duration-300 text-2xl">Home</Link>
          <Link href="/about" className="hover:text-yellow-400 transition-colors duration-300 text-2xl">About Us</Link>
          <Link href="/contact" className="hover:text-yellow-400 transition-colors duration-300 text-2xl">Contact</Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden z-10">
          {isOpen ? (
            <X className="w-8 h-8 text-white dark:text-gray-200 animate-pulse" onClick={toggleMenu} />
          ) : (
            <Menu className="w-8 h-8 text-white dark:text-gray-200 animate-pulse" onClick={toggleMenu} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-8 py-8 text-lg font-bold text-white dark:text-gray-200 bg-gradient-to-b from-blue-600 to-indigo-800 dark:from-gray-900 dark:to-gray-700 shadow-2xl rounded-b-2xl animate-slide-down">
          <Link href="/" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors duration-300">Home</Link>
          <Link href="/about" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors duration-300">About Us</Link>
          <Link href="/contact" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors duration-300">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
