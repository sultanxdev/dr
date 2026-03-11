'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Sparkles, Zap, Droplets } from 'lucide-react';
import { clientData } from '@/config/clientData';

// Map icon strings from config to actual Lucide components
const iconMap: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope size={32} />,
  Sparkles: <Sparkles size={32} />,
  Zap: <Zap size={32} />,
  Droplets: <Droplets size={32} />
};

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative" style={{ backgroundColor: '#F4F6F5' }}>
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Heading and Description (approx 40%) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-semibold tracking-wider uppercase mb-3 text-gray-500">
                Our Treatments
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold mb-6 leading-tight" style={{ color: '#5B7E6F' }}>
                Advanced Dermatological Procedures
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We offer leading-edge solutions tailored to your unique skin needs, blending medical expertise with aesthetic precision.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium text-lg transition-transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#5B7E6F' }}
              >
                Book a Consultation
              </a>
            </motion.div>
          </div>

          {/* Right Column: 6-Card Grid (approx 60%) */}
          <motion.div 
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {clientData.services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group rounded-2xl p-8 transition-shadow duration-300 relative overflow-hidden flex flex-col items-start shadow-sm hover:shadow-xl"
                style={{ backgroundColor: '#5B7E6F' }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white bg-white/10 backdrop-blur-sm border border-white/20 transition-transform duration-500 group-hover:scale-110"
                >
                  {iconMap[service.icon] || <Sparkles size={28} />}
                </div>
                
                <h4 className="text-xl font-serif font-bold mb-3 leading-tight text-white">
                  {service.title}
                </h4>
                <p className="text-white/80 text-sm leading-relaxed max-w-sm flex-grow">
                  {service.description}
                </p>
                
                <div className="mt-8 pt-6 w-full flex justify-between items-center border-t border-white/10">
                  <span className="text-white text-sm font-semibold tracking-wide uppercase flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    Know More <span className="text-xl leading-none">→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
