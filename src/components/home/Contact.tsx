'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { clientData } from '@/config/clientData';

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export default function Contact() {
  const { appointment, contact } = clientData;
  const fields = appointment.fields;

  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `📋 *New Appointment Request*`,
      `─────────────────────────`,
      fields.name.enabled    ? `👤 Name: ${formData.name}`         : '',
      fields.phone.enabled   ? `📱 Phone: ${formData.phone}`        : '',
      fields.email.enabled   ? `✉️ Email: ${formData.email}`        : '',
      fields.service.enabled ? `💉 Concern: ${formData.service}`    : '',
      fields.message.enabled ? `📝 Notes: ${formData.message}`      : '',
    ].filter(Boolean).join('\n');
    return encodeURIComponent(lines);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (appointment.submitVia === 'whatsapp' || appointment.submitVia === 'both') {
        const waUrl = `https://wa.me/${contact.whatsappNumber}?text=${buildWhatsAppMessage()}`;
        window.open(waUrl, '_blank');
      }

      if (appointment.submitVia === 'email' || appointment.submitVia === 'both') {
        const subject = encodeURIComponent(`Appointment Request – ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nConcern: ${formData.service}\nNotes: ${formData.message}`
        );
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      }
    } finally {
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    }
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
            className="bg-white p-10 md:p-14 rounded-[2rem] premium-shadow subtle-border relative overflow-hidden"
          >
            {/* Soft background glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none translate-x-1/3 -translate-y-1/3"
              style={{ backgroundColor: 'var(--primary)' }}
            />

            <h4 className="text-3xl font-serif font-bold mb-2 relative z-10" style={{ color: 'var(--textMain)' }}>
              {appointment.formTitle}
            </h4>
            {appointment.formSubTitle && (
              <p className="text-sm text-gray-500 mb-8 relative z-10">{appointment.formSubTitle}</p>
            )}

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 text-center py-12"
              >
                <div className="text-5xl mb-4">✅</div>
                <h5 className="text-xl font-bold mb-2" style={{ color: 'var(--textMain)' }}>Request Sent!</h5>
                <p className="text-gray-500 text-sm leading-relaxed">{appointment.successMessage}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm underline text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

                {/* Name */}
                {fields.name.enabled && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider uppercase text-gray-500" htmlFor="name">
                      {fields.name.label} {fields.name.required && '*'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required={fields.name.required}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-300 placeholder-gray-400"
                      placeholder={fields.name.placeholder}
                    />
                  </div>
                )}

                {/* Phone + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {fields.phone.enabled && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-wider uppercase text-gray-500" htmlFor="phone">
                        {fields.phone.label} {fields.phone.required && '*'}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required={fields.phone.required}
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-300 placeholder-gray-400"
                        placeholder={fields.phone.placeholder}
                      />
                    </div>
                  )}
                  {fields.email.enabled && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-wider uppercase text-gray-500" htmlFor="email">
                        {fields.email.label} {fields.email.required && '*'}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required={fields.email.required}
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-300 placeholder-gray-400"
                        placeholder={fields.email.placeholder}
                      />
                    </div>
                  )}
                </div>

                {/* Service / Concern */}
                {fields.service.enabled && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider uppercase text-gray-500" htmlFor="service">
                      {fields.service.label} {fields.service.required && '*'}
                    </label>
                    <input
                      type="text"
                      id="service"
                      name="service"
                      required={fields.service.required}
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-300 placeholder-gray-400"
                      placeholder={fields.service.placeholder}
                    />
                  </div>
                )}

                {/* Message */}
                {fields.message.enabled && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider uppercase text-gray-500" htmlFor="message">
                      {fields.message.label}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-300 placeholder-gray-400 resize-none"
                      placeholder={fields.message.placeholder}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 px-6 mt-2 rounded-xl text-white font-bold tracking-wide uppercase text-sm transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[0_15px_30px_-10px_rgba(74,93,78,0.4)] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  {isSubmitting ? 'Opening WhatsApp…' : 'Book Appointment via WhatsApp'}
                </button>

                <p className="text-xs tracking-wide text-gray-400 text-center mt-4">
                  By submitting, you agree to our privacy policy and consent to being contacted.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
