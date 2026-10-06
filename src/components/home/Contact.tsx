'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { clientData } from '@/config/clientData';
import BookingForm from '@/components/booking/BookingForm';

export default function Contact() {
  const { contact } = clientData;

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
                  <p className="text-gray-600">{contact.address}</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 mr-4 bg-gray-50 p-3 rounded-full text-[var(--primary)] border border-gray-100">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--textMain)' }}>Hours</h4>
                  <p className="text-gray-600">{contact.workingHours}</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 mr-4 bg-gray-50 p-3 rounded-full text-[var(--primary)] border border-gray-100">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--textMain)' }}>Call Us</h4>
                  <a href={`tel:${contact.phone}`} className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                    {contact.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 mr-4 bg-gray-50 p-3 rounded-full text-[var(--primary)] border border-gray-100">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--textMain)' }}>Email</h4>
                  <a href={`mailto:${contact.email}`} className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                    {contact.email}
                  </a>
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
          >
            <BookingForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
