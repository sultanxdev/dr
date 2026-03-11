'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clientData } from '@/config/clientData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Treatment', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Expert Tips', href: '#blog' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-[95%] max-w-7xl z-50 bg-white rounded-full premium-shadow border border-gray-100 transition-all duration-300 ${
        isScrolled ? 'py-2 sm:py-3 shadow-lg' : 'py-3 sm:py-4 shadow-md'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl sm:text-2xl font-serif font-bold tracking-tighter" style={{ color: 'var(--primary)' }}>
              {clientData.brand.logoText}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--textMain)' }}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full text-white font-medium transition-transform transform hover:scale-105"
              style={{ backgroundColor: 'var(--primaryHover)' }}
            >
              {clientData.hero.ctaText}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
              style={{ color: 'var(--primary)' }}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-[calc(100%+10px)] left-0 w-full bg-white rounded-3xl premium-shadow border border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--textMain)' }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-2">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-4 rounded-full text-white font-medium shadow-md transition-transform active:scale-95"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  {clientData.hero.ctaText}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
