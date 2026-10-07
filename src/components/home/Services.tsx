'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Stethoscope, Sparkles, Zap, Droplets, type LucideIcon } from 'lucide-react';
import { clientData } from '@/config/clientData';
import WhatsAppCTA from '@/components/whatsapp/WhatsAppCTA';
import { getTreatmentMessage } from '@/lib/whatsapp';

const SAGE = '#5B7E6F';
const SAGE_DEEP = '#3F5C4D';
const MIST = '#E8F1EC';

// Map icon strings from config to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Sparkles,
  Zap,
  Droplets,
};

export default function Services() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="services"
      className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      style={{ backgroundColor: '#F4F6F5' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left: a friendly introduction */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:sticky lg:top-32 lg:col-span-4"
          >
            <h2
              className="font-serif text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl"
              style={{ color: 'var(--textMain)' }}
            >
              Skin treatments, explained in plain words
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-600">
              Every skin is different. We look at yours first, then suggest only what it needs,
              with medical expertise behind every step.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href="#contact"
                className="w-fit rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ backgroundColor: SAGE, outlineColor: SAGE_DEEP }}
              >
                Book a consultation
              </a>
              <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                Not sure which treatment fits? Tell us your concern and we will point you in
                the right direction.
              </p>
            </div>
          </motion.div>

          {/* Right: treatments */}
          <motion.div
            className="grid grid-cols-1 gap-6 pb-12 sm:grid-cols-2 lg:col-span-8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {clientData.services.map((service) => {
              const Icon = iconMap[service.icon] ?? Sparkles;
              return (
                // Plain wrapper holds the offset so it never fights framer-motion's transform
                <div key={service.id} className="sm:even:translate-y-10">
                  <motion.article
                    variants={item}
                    className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl"
                  >
                    <span
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 group-hover:bg-[#5B7E6F] group-hover:text-white"
                      style={{ backgroundColor: MIST, color: SAGE }}
                      aria-hidden
                    >
                      <Icon size={28} strokeWidth={1.75} />
                    </span>

                    <h3
                      className="font-serif text-2xl font-bold leading-tight"
                      style={{ color: 'var(--textMain)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-grow text-base leading-relaxed text-gray-600">
                      {service.description}
                    </p>

                    <div className="mt-7 flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
                      <WhatsAppCTA
                        message={getTreatmentMessage(service.id)}
                        label="Ask about this"
                        variant="outline"
                        size="sm"
                        showIcon={true}
                        location={`service_card_${service.id}`}
                        className="flex-1 border-[#5B7E6F]/40 text-[#3F5C4D] hover:bg-[#E8F1EC]"
                      />
                      <a
                        href="#contact"
                        className="whitespace-nowrap text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                        style={{ color: SAGE_DEEP, outlineColor: SAGE_DEEP }}
                      >
                        Know more
                      </a>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}