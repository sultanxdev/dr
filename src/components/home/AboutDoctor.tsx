'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clientData } from '@/config/clientData';

export default function AboutDoctor() {
  const { heading, credentials, bioParagraphs, ctaText, imageUrl } = clientData.aboutDoctor;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 relative w-full flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[500px] aspect-[3/4] rounded-3xl overflow-hidden premium-shadow my-auto">
              <img 
                src={imageUrl} 
                alt="Dr. Disha Baxi Portrait"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none" />
            </div>
            {/* Decorative background shape */}
            <div 
              className="absolute -bottom-6 -left-6 w-3/4 h-3/4 rounded-3xl -z-10 opacity-10"
              style={{ backgroundColor: '#5B7E6F' }}
            />
          </motion.div>

          {/* Right Column: Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-2 leading-tight" style={{ color: '#5B7E6F' }}>
              {heading}
            </h2>
            <p className="text-xl font-medium tracking-wide mb-8" style={{ color: 'var(--textMuted)' }}>
              {credentials}
            </p>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-10">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex w-fit items-center justify-center px-10 py-4 rounded-full text-white font-medium text-lg transition-transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              style={{ backgroundColor: '#5B7E6F' }}
            >
              {ctaText}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
