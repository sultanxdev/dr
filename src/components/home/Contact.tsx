'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { clientData } from '@/config/clientData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call for now (Since backend WhatsApp logic was removed)
    setTimeout(() => {
      alert("Thank you! Your booking request has been received.");
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-sm font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--accent)' }}>
              Get In Touch
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8" style={{ color: 'var(--textMain)' }}>
              Begin Your Skin Journey Today.
            </h3>
            
            <p className="text-gray-600 text-lg mb-12 max-w-md leading-relaxed">
              Schedule a consultation with our experts to discuss your medical or cosmetic skincare goals.
            </p>

            <ul className="space-y-8">
              <li className="flex items-start">
                <div className="mt-1 mr-4 bg-gray-50 p-3 rounded-full text-[var(--primary)] border border-gray-100">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--textMain)' }}>Our Clinic</h4>
                  <p className="text-gray-600">{clientData.contact.address}</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mt-1 mr-4 bg-gray-50 p-3 rounded-full text-[var(--primary)] border border-gray-100">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--textMain)' }}>Hours</h4>
                  <p className="text-gray-600">{clientData.contact.workingHours}</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 mr-4 bg-gray-50 p-3 rounded-full text-[var(--primary)] border border-gray-100">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--textMain)' }}>Call Us</h4>
                  <p className="text-gray-600">{clientData.contact.phone}</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mt-1 mr-4 bg-gray-50 p-3 rounded-full text-[var(--primary)] border border-gray-100">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--textMain)' }}>Email</h4>
                  <p className="text-gray-600">{clientData.contact.email}</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Booking Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white p-10 md:p-14 rounded-[2rem] premium-shadow subtle-border relative overflow-hidden"
          >
            {/* Soft background glow */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none translate-x-1/3 -translate-y-1/3"
              style={{ backgroundColor: 'var(--primary)' }}
            />

            <h4 className="text-3xl font-serif font-bold mb-8 relative z-10" style={{ color: 'var(--textMain)' }}>
              Request an Appointment
            </h4>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider uppercase text-gray-500" htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-300 placeholder-gray-400"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider uppercase text-gray-500" htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-300 placeholder-gray-400"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider uppercase text-gray-500" htmlFor="phone">Phone *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-300 placeholder-gray-400"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider uppercase text-gray-500" htmlFor="message">Reason for Visit</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-300 placeholder-gray-400 resize-none"
                  placeholder="I'm interested in..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-5 px-6 mt-4 rounded-xl text-white font-bold tracking-wide uppercase text-sm transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[0_15px_30px_-10px_rgba(74,93,78,0.4)] ${isSubmitting ? 'opacity-75 cursor-not-allowed transform-none hover:shadow-none hover:translate-y-0' : ''}`}
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </button>
              
              <p className="text-xs tracking-wide text-gray-400 text-center mt-6">
                By submitting, you agree to our privacy policy and consent to being contacted.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
