'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clientData } from '@/config/clientData';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 lg:pt-32" style={{ backgroundColor: '#E8F1EC' }}>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-6 inline-flex items-center space-x-3">
                <span className="w-10 h-[2px]" style={{ backgroundColor: '#5B7F6D' }}></span>
                <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#5B7F6D' }}>
                  {clientData.brand.name}
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6 leading-tight"
                style={{ color: 'var(--textMain)' }}
              >
                {clientData.hero.headline}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl md:leading-relaxed mb-10 max-w-xl font-medium"
              style={{ color: 'var(--textMuted)' }}
            >
              {clientData.hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <a
                href="#contact"
                className="group relative px-8 py-4 rounded-full text-white font-medium text-lg text-center overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#5B7F6D' }}
              >
                <div className="absolute inset-0 w-full h-full bg-black/10 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0" />
                <span className="relative">{clientData.hero.ctaText}</span>
              </a>
              
              <a
                href="#services"
                className="px-8 py-4 rounded-full font-medium text-lg text-center transition-all duration-300 transform hover:-translate-y-1 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow"
                style={{ color: 'var(--textMain)' }}
              >
                Explore Treatments
              </a>
            </motion.div>
          </div>

          {/* Right Image Graphic */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 relative w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] lg:w-[500px] lg:h-[650px] image-mask premium-shadow overflow-hidden rounded-[2rem] md:rounded-[4rem] border-4 border-white/50">
               <img 
                  src={clientData.hero.imageUrl} 
                  alt={clientData.brand.name}
                  className="w-full h-full object-cover object-center"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative Floating Element */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 lg:bottom-12 lg:-left-12 bg-white p-5 rounded-2xl premium-shadow border border-gray-100 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Expert Care</p>
                  <p className="text-xs text-gray-500">Trusted Specialists</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
