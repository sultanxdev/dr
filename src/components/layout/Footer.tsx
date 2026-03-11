'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { clientData } from '@/config/clientData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-white pt-16 pb-8" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="flex flex-col space-y-4">
            <span className="text-2xl font-serif font-bold tracking-tighter" style={{ color: 'var(--accent)' }}>
              {clientData.brand.logoText}
            </span>
            <p className="text-sm leading-relaxed max-w-xs text-white/80">
              {clientData.brand.tagline}. {clientData.hero.subheadline}
            </p>
            <div className="flex flex-row space-x-4 pt-4">
              {clientData.social.linkedin && (
                <a href={clientData.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all transform hover:scale-110">
                  <Linkedin size={18} />
                </a>
              )}
              {clientData.social.instagram && (
                <a href={clientData.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all transform hover:scale-110">
                  <Instagram size={18} />
                </a>
              )}
              {clientData.social.facebook && (
                <a href={clientData.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all transform hover:scale-110">
                  <Facebook size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link></li>
              <li><Link href="#services" className="hover:text-[var(--accent)] transition-colors">Treatment</Link></li>
              <li><Link href="#about" className="hover:text-[var(--accent)] transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="hover:text-[var(--accent)] transition-colors">Contact</Link></li>
              <li><Link href="#contact" className="hover:text-[var(--accent)] transition-colors">Appointment</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold uppercase tracking-wider text-white">Visit Us</h3>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}/>
                <span>{clientData.contact.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" style={{ color: 'var(--accent)' }}/>
                <span>{clientData.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" style={{ color: 'var(--accent)' }}/>
                <span>{clientData.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
          <p>&copy; {currentYear} {clientData.brand.name}. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
