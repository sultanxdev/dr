'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { clientData } from '@/config/clientData';
import BookingForm from '@/components/booking/BookingForm';

const SAGE = '#5B7E6F';
const SAGE_DEEP = '#3F5C4D';
const MIST = '#E8F1EC';

type Row = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  action?: string;
  external?: boolean;
};

export default function Contact() {
  const reduce = useReducedMotion();
  // mapUrl is optional in clientData.contact; otherwise we build a search link from the address
  const contact = clientData.contact as typeof clientData.contact & { mapUrl?: string };
  const mapUrl =
    contact.mapUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

  const rows: Row[] = [
    {
      icon: Phone,
      label: 'Call us',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, '')}`,
      action: 'Call now',
    },
    {
      icon: MapPin,
      label: 'Visit the clinic',
      value: contact.address,
      href: mapUrl,
      action: 'Get directions',
      external: true,
    },
    { icon: Clock, label: 'Opening hours', value: contact.workingHours },
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      action: 'Write to us',
    },
  ];

  const list: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.15 } },
  };
  const row: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      style={{ backgroundColor: MIST }}
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: a human invitation plus the details */}
          <motion.div
            variants={list}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-5 lg:pt-6"
          >
            <motion.h2
              variants={row}
              className="font-serif text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl"
              style={{ color: 'var(--textMain)' }}
            >
              Let&rsquo;s talk about your skin
            </motion.h2>
            <motion.p
              variants={row}
              className="mt-6 max-w-md text-lg leading-relaxed text-gray-600"
            >
              Tell us what is bothering you, whether it is medical or cosmetic. We will suggest
              the right next step.
            </motion.p>

            <ul className="mt-10 divide-y divide-[#5B7E6F]/15 border-y border-[#5B7E6F]/15">
              {rows.map(({ icon: Icon, label, value, href, action, external }) => (
                <motion.li key={label} variants={row} className="flex items-start gap-4 py-5">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
                    style={{ color: SAGE }}
                    aria-hidden
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500">{label}</p>
                    <p
                      className="mt-0.5 whitespace-pre-line break-words text-lg font-medium leading-snug"
                      style={{ color: 'var(--textMain)' }}
                    >
                      {value}
                    </p>
                    {href && action && (
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                        style={{ color: SAGE_DEEP, outlineColor: SAGE_DEEP }}
                      >
                        {action}
                        <ArrowUpRight size={15} aria-hidden />
                      </a>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: booking form */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            {/* If BookingForm already has its own card styling, remove this wrapper's bg/shadow */}
            <div className="rounded-3xl bg-white shadow-2xl shadow-emerald-900/10 ring-1 ring-black/5">
              <BookingForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}