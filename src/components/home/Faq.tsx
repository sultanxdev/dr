'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { clientData } from '@/config/clientData';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="faq" className="w-full py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute top-0 right-[-10%] w-[40%] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: 'var(--primary)' }}
      />
      <div 
        className="absolute bottom-0 left-[-10%] w-[30%] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--accent)' }}>
            Got Questions?
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6" style={{ color: 'var(--textMain)' }}>
            Frequently Asked Questions
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Everything you need to know about our clinic, treatments, and what to expect.
          </p>
        </div>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {clientData.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl premium-shadow subtle-border overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 md:px-8 md:py-6 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="text-lg md:text-xl font-bold" style={{ color: isOpen ? 'var(--primary)' : 'var(--textMain)' }}>
                    {faq.question}
                  </span>
                  <div 
                    className={`ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-gray-50' : ''}`}
                    style={{ 
                      color: isOpen ? 'var(--primary)' : 'var(--textMain)',
                      border: isOpen ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent'
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Still have questions? <a href="#contact" className="font-semibold underline underline-offset-4" style={{ color: 'var(--primary)' }}>Contact us</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
