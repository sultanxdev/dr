'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clientData } from '@/config/clientData';

const SAGE = '#5B7E6F';
const SAGE_DEEP = '#3F5C4D';
const MIST = '#E8F1EC';

/**
 * Optional fields in clientData.aboutDoctor (safe to omit):
 *  name        -> 'Dr. Priya Sharma'  (used for alt text and sign-off)
 *  role        -> 'Founder & Lead Dermatologist'  (shown on the photo card)
 *  highlights  -> [{ value: '12+', label: 'years of practice' }, ...]  (max 3 look best)
 *  credentials -> a string OR an array of strings
 */
export default function AboutDoctor() {
  const reduce = useReducedMotion();
  const { heading, credentials, bioParagraphs, ctaText, imageUrl, name, role, highlights } =
    clientData.aboutDoctor;

  const credentialList = Array.isArray(credentials)
    ? credentials
    : credentials
      ? [credentials]
      : [];
  const [lead, ...rest] = bioParagraphs;

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  });

  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      {/* Soft wash behind the portrait */}
      <div
        aria-hidden
        className="absolute left-0 top-1/2 h-[34rem] w-[34rem] -translate-x-1/3 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: MIST }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Portrait: the face comes first on mobile */}
        <motion.div {...reveal()} className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative mx-auto w-[88%] max-w-[440px] lg:ml-0 lg:mr-auto">
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[2.5rem] rounded-tl-[999px] border-2"
              style={{ borderColor: SAGE }}
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] rounded-tl-[999px] shadow-2xl shadow-emerald-900/15">
              <img
                src={imageUrl}
                alt={name ? `Portrait of ${name}` : 'Portrait of the doctor'}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {(name || role) && (
              <div className="absolute -bottom-6 -right-2 max-w-[16rem] rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-black/5 sm:-right-8">
                {name && <p className="font-serif text-lg font-bold text-gray-900">{name}</p>}
                {role && <p className="text-sm text-gray-600">{role}</p>}
              </div>
            )}
          </div>
        </motion.div>

        {/* Story */}
        <div className="flex flex-col lg:col-span-7 lg:pl-8">
          <motion.h2
            {...reveal(0.05)}
            className="font-serif text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl"
            style={{ color: 'var(--textMain)' }}
          >
            {heading}
          </motion.h2>

          {credentialList.length > 0 && (
            <motion.ul {...reveal(0.1)} className="mt-5 flex flex-wrap gap-2.5">
              {credentialList.map((c) => (
                <li
                  key={c}
                  className="rounded-full px-4 py-1.5 text-sm font-medium"
                  style={{ backgroundColor: MIST, color: SAGE_DEEP }}
                >
                  {c}
                </li>
              ))}
            </motion.ul>
          )}

          {/* First paragraph reads like the doctor speaking to you */}
          <motion.p
            {...reveal(0.15)}
            className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-gray-900 md:text-2xl md:leading-relaxed"
          >
            {lead}
          </motion.p>

          <motion.div {...reveal(0.2)} className="mt-6 max-w-xl space-y-5 text-lg leading-relaxed text-gray-700">
            {rest.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          {highlights?.length > 0 && (
            <motion.dl
              {...reveal(0.25)}
              className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-gray-200 border-y border-gray-200 py-5"
            >
              {highlights.slice(0, 3).map((h) => (
                <div key={h.label} className="px-4 first:pl-0">
                  <dd className="font-serif text-3xl font-bold" style={{ color: SAGE_DEEP }}>
                    {h.value}
                  </dd>
                  <dt className="mt-1 text-sm leading-snug text-gray-600">{h.label}</dt>
                </div>
              ))}
            </motion.dl>
          )}

          <motion.div {...reveal(0.3)} className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="#contact"
              className="w-fit rounded-full px-9 py-4 text-lg font-semibold text-white shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ backgroundColor: SAGE, outlineColor: SAGE_DEEP }}
            >
              {ctaText}
            </a>
            {name && (
              <p className="font-serif text-xl italic text-gray-500">{name}</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}