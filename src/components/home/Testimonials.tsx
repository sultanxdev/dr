'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type Easing } from 'framer-motion';
import { clientData } from '@/config/clientData';

/* ─── Brand Palette ───────────────────────────────────────── */
const GREEN  = clientData.colors.primary;
const CREAM  = clientData.colors.background;
const RED    = clientData.colors.accent;

const GAP = 24;
const EASE: Easing = [0.22, 1, 0.36, 1];

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
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
      style={{ backgroundColor: GREEN }}
    >
      {/* Soft glow */}
      <div
        aria-hidden
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: `${GREEN}` }}
      />
      <div
        aria-hidden
        className="absolute -left-48 bottom-0 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: RED }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span
              className="inline-block rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ backgroundColor: 'rgba(245, 246, 240, 0.15)', color: CREAM }}
            >
              Testimonials
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl" style={{ color: CREAM }}>
              What our patients say
            </h2>
            {items.length > 0 && (
              <div className="mt-5 flex items-center gap-3" style={{ color: `${CREAM}CC` }}>
                <span className="flex" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 sm:h-5 sm:w-5" fill={RED}>
                      <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9 4.8 17.7l1-5.9L1.5 7.7l5.9-.8L10 1.5z" />
                    </svg>
                  ))}
                </span>
                <p className="text-sm sm:text-base">
                  <span className="font-semibold" style={{ color: CREAM }}>{average.toFixed(1)}</span> out of 5
                  across {items.length} patient stories
                </p>
              </div>
            )}
          </motion.div>

          <div className="flex gap-3">
            {(['left', 'right'] as const).map((dir) => {
              const disabled = dir === 'left' ? !canPrev : !canNext;
              return (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  disabled={disabled}
                  aria-label={dir === 'left' ? 'Previous testimonials' : 'Next testimonials'}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-30 sm:h-12 sm:w-12"
                  style={{
                    borderColor: `${CREAM}40`,
                    color: CREAM,
                    outlineColor: CREAM,
                  }}
                >
                  {dir === 'left' ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
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
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:mx-0 sm:gap-6 sm:px-0 focus-visible:outline focus-visible:outline-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', outlineColor: CREAM }}
          >
            {items.map((testimonial, index) => {
              const extra = testimonial as typeof testimonial & Extra;
              return (
                <motion.article
                  key={testimonial.id}
                  initial={{ opacity: 0, x: reduce ? 0 : 48 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.7, delay: reduce ? 0 : Math.min(index, 3) * 0.1, ease: EASE }}
                  className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-2xl p-6 shadow-xl sm:w-[400px] sm:rounded-3xl sm:p-8"
                  style={{
                    backgroundColor: CREAM,
                    boxShadow: `0 20px 40px -12px rgba(0, 0, 0, 0.15)`,
                  }}
                >
                  {/* Quote mark */}
                  <svg viewBox="0 0 24 24" className="mb-3 h-8 w-8 sm:mb-4 sm:h-9 sm:w-9" aria-hidden>
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill={GREEN} opacity="0.15" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill={GREEN} opacity="0.15" />
                  </svg>

                  {/* Stars */}
                  <div className="mb-3 flex gap-0.5 sm:mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: reduce ? 1 : 0.3, rotate: reduce ? 0 : -30 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: reduce ? 0 : 0.35 + i * 0.08, type: 'spring', stiffness: 400, damping: 14 }}
                        className="flex"
                      >
                        <svg viewBox="0 0 20 20" className="h-4 w-4 sm:h-5 sm:w-5" fill={RED}>
                          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9 4.8 17.7l1-5.9L1.5 7.7l5.9-.8L10 1.5z" />
                        </svg>
                      </motion.span>
                    ))}
                  </div>

                  <p className="flex-grow text-base leading-relaxed sm:text-lg" style={{ color: GREEN }}>
                    {testimonial.text}
                  </p>

                  {extra.treatment && (
                    <p
                      className="mt-4 w-fit rounded-full px-3 py-1 text-xs font-medium sm:mt-5 sm:text-sm"
                      style={{ backgroundColor: `${GREEN}10`, color: GREEN }}
                    >
                      {extra.treatment}
                    </p>
                  )}

                  <div className="mt-5 flex items-center gap-3 border-t pt-4 sm:mt-6 sm:gap-4 sm:pt-5" style={{ borderColor: `${GREEN}10` }}>
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold sm:h-12 sm:w-12 sm:text-lg"
                      style={{ backgroundColor: GREEN, color: CREAM }}
                      aria-hidden
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="leading-tight">
                      <p className="font-semibold text-sm sm:text-base" style={{ color: GREEN }}>{testimonial.name}</p>
                      {(extra.date || extra.source) && (
                        <p className="mt-0.5 text-xs sm:text-sm" style={{ color: `${GREEN}80` }}>
                          {[extra.date, extra.source && `on ${extra.source}`].filter(Boolean).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Fade hint */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 sm:block"
            style={{ background: `linear-gradient(to left, ${GREEN}, transparent)` }}
          />
        </div>

        {/* Scroll progress */}
        <div className="mt-4 h-1 w-full max-w-xs overflow-hidden rounded-full" aria-hidden style={{ backgroundColor: `${CREAM}30` }}>
          <div
            className="h-full rounded-full transition-[width] duration-200"
            style={{ width: `${Math.max(12, progress * 100)}%`, backgroundColor: CREAM }}
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