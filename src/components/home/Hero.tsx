'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clientData } from '@/config/clientData';

const SAGE = '#5B7F6D';
const SAGE_DEEP = '#3F5C4D';
const MIST = '#E8F1EC';
const LEAF = '#D3E4DA';

/**
 * Optional fields (all safe to leave out of clientData):
 *  hero.badge            -> "Now welcoming new patients"
 *  hero.secondaryImageUrl-> small round photo overlapping the main one
 *  hero.rating           -> 4.9
 *  hero.patientCount     -> "2,000+ happy patients"
 *  hero.avatars          -> ['/a.jpg', '/b.jpg', '/c.jpg']
 *  hero.note             -> { title: 'Your first visit', text: 'We start by listening.' }
 *  contact.phone         -> '+91 98765 43210'
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const { brand, hero } = clientData;
  const phone = clientData.contact?.phone;

  // One orchestrated entrance for the whole section.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24"
      style={{ backgroundColor: MIST }}
    >
      {/* Soft background shapes */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-70 blur-3xl"
        style={{ backgroundColor: LEAF }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full opacity-60 blur-3xl"
        style={{ backgroundColor: LEAF }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left: words */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col lg:col-span-6"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full bg-white/80 py-2 pl-3 pr-4 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-black/5">
              <span className="relative flex h-2.5 w-2.5">
                {!reduce && (
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ backgroundColor: SAGE }}
                  />
                )}
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: SAGE }}
                />
              </span>
              {hero.badge || `${brand.name} is welcoming new patients`}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]"
            style={{ color: 'var(--textMain)' }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl"
            style={{ color: 'var(--textMuted)' }}
          >
            {hero.subheadline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="rounded-full px-8 py-4 text-center text-lg font-semibold text-white shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ backgroundColor: SAGE, outlineColor: SAGE_DEEP }}
            >
              {hero.ctaText}
            </a>

            {phone ? (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="group flex items-center justify-center gap-3 rounded-full px-4 py-3 text-lg font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ color: 'var(--textMain)', outlineColor: SAGE_DEEP }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition group-hover:scale-105">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={SAGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                  </svg>
                </span>
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-sm" style={{ color: 'var(--textMuted)' }}>Prefer to talk?</span>
                  <span className="font-semibold">{phone}</span>
                </span>
              </a>
            ) : (
              <a
                href="#services"
                className="rounded-full bg-white px-8 py-4 text-center text-lg font-medium shadow-sm ring-1 ring-black/10 transition duration-200 hover:-translate-y-0.5 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ color: 'var(--textMain)', outlineColor: SAGE_DEEP }}
              >
                Explore treatments
              </a>
            )}
          </motion.div>

          {/* Social proof, only shown when real data exists */}
          {(hero.rating || hero.patientCount) && (
            <motion.div variants={item} className="mt-10 flex items-center gap-4">
              {hero.avatars?.length > 0 && (
                <div className="flex -space-x-3">
                  {hero.avatars.slice(0, 4).map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="h-11 w-11 rounded-full border-2 object-cover"
                      style={{ borderColor: MIST }}
                    />
                  ))}
                </div>
              )}
              <div className="leading-tight">
                {hero.rating && (
                  <div className="flex items-center gap-1.5">
                    <span className="flex" aria-hidden>
                      {[0, 1, 2, 3, 4].map((s) => (
                        <svg key={s} viewBox="0 0 20 20" className="h-4 w-4" fill="#E0A82E">
                          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9 4.8 17.7l1-5.9L1.5 7.7l5.9-.8L10 1.5z" />
                        </svg>
                      ))}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--textMain)' }}>
                      {hero.rating}
                    </span>
                  </div>
                )}
                {hero.patientCount && (
                  <p className="text-sm" style={{ color: 'var(--textMuted)' }}>{hero.patientCount}</p>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right: people */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none"
        >
          <div className="relative mx-auto w-[82%] max-w-[460px] lg:ml-auto lg:mr-6">
            {/* Offset outline gives the arch some depth */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[2.5rem] border-2"
              style={{ borderColor: SAGE }}
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-white shadow-2xl shadow-emerald-900/15">
              <img
                src={hero.imageUrl}
                alt={brand.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Small round photo */}
            {hero.secondaryImageUrl && (
              <div className="absolute -left-10 bottom-24 hidden h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl sm:block lg:-left-16 lg:h-40 lg:w-40">
                <img src={hero.secondaryImageUrl} alt="" className="h-full w-full object-cover" />
              </div>
            )}

            {/* Handwritten-style note card */}
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 16, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
              className="absolute -bottom-6 -left-2 max-w-[15rem] rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:-left-6 lg:-left-10"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: SAGE }}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{hero.note?.title || 'You will be heard'}</p>
                  <p className="mt-0.5 text-sm leading-snug text-gray-600">
                    {hero.note?.text || 'Every visit starts with a real conversation.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}