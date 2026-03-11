'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { clientData } from '@/config/clientData';

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--accent)' }}>
              Happy Stories
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold" style={{ color: 'var(--textMain)' }}>
              Real Results & Experiences
            </h3>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors premium-shadow"
              aria-label="Previous Testimonials"
            >
              <ChevronLeft className="text-gray-600" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors premium-shadow"
              aria-label="Next Testimonials"
            >
              <ChevronRight className="text-gray-600" />
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {clientData.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-[320px] md:min-w-[400px] max-w-[450px] flex-shrink-0 snap-start bg-white rounded-[2rem] p-8 premium-shadow border border-gray-100 flex flex-col relative transition-transform duration-300 hover:-translate-y-1"
                style={{
                  backgroundImage: 'radial-gradient(circle, #e5e7eb 2px, transparent 2px)',
                  backgroundSize: '24px 24px',
                  backgroundPosition: 'top right',
                }}
              >
                {/* Header: Avatar, Name, Google Logo */}
                <div className="flex justify-between items-start mb-6 bg-white/80 backdrop-blur-sm rounded-lg relative z-10 w-fit pr-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: '#5B7F6D' }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">2 months ago</p>
                    </div>
                  </div>
                </div>

                {/* Simulated Google 'G' icon placed absolute to bypass backdrop blur */}
                <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center pointer-events-none">
                  <span className="text-blue-600 font-bold" style={{ fontFamily: 'sans-serif' }}>G</span>
                </div>

                <div className="flex items-center mb-4 gap-2 relative z-10">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-200">
                    <BadgeCheck size={14} className="text-blue-500" />
                    Verified
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed flex-grow relative z-10">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
