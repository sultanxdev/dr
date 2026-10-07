'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { clientData } from '@/config/clientData';

const SAGE = '#5B7F6D';
const SAGE_DEEP = '#3F5C4D';
const MIST = '#E8F1EC';
const GOLD = '#E0A82E';
const GAP = 24;

/**
 * Optional fields on each testimonial (shown only when present):
 *  date       -> '2 months ago' or 'March 2026'
 *  source     -> 'Google'
 *  treatment  -> 'Acne scar treatment'
 */
type Extra = { date?: string; source?: string; treatment?: string };

export default function Testimonials() {
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const items = clientData.testimonials;
  const average = items.length
    ? items.reduce((sum, t) => sum + t.rating, 0) / items.length
    : 0;

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('article');
    const step = (card?.clientWidth ?? el.clientWidth) + GAP;
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      style={{ backgroundColor: SAGE_DEEP }}
    >
      {/* Soft glow */}
      <div
        aria-hidden
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: SAGE }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              What our patients say
            </h2>
            {items.length > 0 && (
              <div className="mt-5 flex items-center gap-3 text-white/80">
                <span className="flex" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={18} fill={GOLD} stroke={GOLD} />
                  ))}
                </span>
                <p className="text-base">
                  <span className="font-semibold text-white">{average.toFixed(1)}</span> out of 5
                  across {items.length} patient stories
                </p>
              </div>
            )}
          </motion.div>

          <div className="flex gap-3">
            {(['left', 'right'] as const).map((dir) => {
              const disabled = dir === 'left' ? !canPrev : !canNext;
              const Icon = dir === 'left' ? ChevronLeft : ChevronRight;
              return (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  disabled={disabled}
                  aria-label={dir === 'left' ? 'Previous testimonials' : 'Next testimonials'}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition duration-200 hover:bg-white hover:text-[#3F5C4D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
                >
                  <Icon size={22} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={update}
            tabIndex={0}
            role="region"
            aria-label="Patient testimonials"
            className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((testimonial, index) => {
              const extra = testimonial as typeof testimonial & Extra;
              return (
                <motion.article
                  key={testimonial.id}
                  initial={{ opacity: 0, x: reduce ? 0 : 48 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.7, delay: reduce ? 0 : Math.min(index, 3) * 0.1, ease: 'easeOut' }}
                  className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-3xl bg-white p-8 shadow-xl shadow-black/10 sm:w-[400px]"
                >
                  {/* Quote mark */}
                  <Quote aria-hidden size={36} className="mb-4" fill={SAGE} stroke="none" opacity={0.25} />

                  {/* Stars fill in one by one as the card appears */}
                  <div className="mb-4 flex gap-0.5" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: reduce ? 1 : 0.3, rotate: reduce ? 0 : -30 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: reduce ? 0 : 0.35 + i * 0.08, type: 'spring', stiffness: 400, damping: 14 }}
                        className="flex"
                      >
                        <Star size={18} fill={GOLD} stroke={GOLD} />
                      </motion.span>
                    ))}
                  </div>

                  <p className="flex-grow text-lg leading-relaxed text-gray-800">
                    {testimonial.text}
                  </p>

                  {extra.treatment && (
                    <p
                      className="mt-5 w-fit rounded-full px-3 py-1 text-sm font-medium"
                      style={{ backgroundColor: MIST, color: SAGE_DEEP }}
                    >
                      {extra.treatment}
                    </p>
                  )}

                  <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-5">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                      style={{ backgroundColor: SAGE }}
                      aria-hidden
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="leading-tight">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      {(extra.date || extra.source) && (
                        <p className="mt-0.5 text-sm text-gray-500">
                          {[extra.date, extra.source && `on ${extra.source}`].filter(Boolean).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Fade hints that there is more to the right */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 sm:block"
            style={{ background: `linear-gradient(to left, ${SAGE_DEEP}, transparent)` }}
          />
        </div>

        {/* Scroll progress */}
        <div className="mt-4 h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/20" aria-hidden>
          <div
            className="h-full rounded-full bg-white transition-[width] duration-200"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `#testimonials [role="region"]::-webkit-scrollbar{display:none}`,
        }}
      />
    </section>
  );
}