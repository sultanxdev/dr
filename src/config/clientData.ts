// ============================================================
//  CENTRALIZED CLIENT CONFIGURATION
//  ─────────────────────────────────────────────────────────
//  This is THE single source of truth for every piece of
//  text, color, contact detail, and feature flag shown on
//  the website.
//
//  To customise for a new client, ONLY edit this file.
//  Every section is clearly labeled.
// ============================================================

export const clientData = {

  // ── 0. SEO & GOOGLE INTEGRATION ───────────────────────────
  //  ⭐ MOST IMPORTANT for Google ranking.
  //  Fill these in as soon as the client has a live domain.
  seo: {
    // The live website URL — NO trailing slash.
    // Change this when deploying to production.
    siteUrl: "https://yourclinic.com",

    // Shown in browser tab & Google results (max ~60 chars)
    titleTemplate: "%s | Dermatologist & Skin Specialist",

    // Shown under the title in Google results (max ~160 chars)
    metaDescription:
      "Expert dermatology clinic offering acne treatment, anti-aging, laser hair reduction, pigmentation treatment & more. Book an appointment today.",

    // Keywords for Google — include city name when live
    // Example: "dermatologist in Mumbai, skin clinic near me, acne treatment Mumbai"
    keywords:
      "dermatologist, skin specialist, acne treatment, pigmentation treatment, laser hair removal, anti-aging, hair fall treatment, skin clinic, dermatology clinic India",

    // Open Graph share image (shown when link is shared on WhatsApp/Facebook)
    // Create a 1200x630px image and place it in /public
    ogImage: "/og-image.png",

    // ── Google Search Console ──────────────────────────────
    // Step 1: Go to https://search.google.com/search-console
    // Step 2: Add property → enter your domain
    // Step 3: Choose "HTML tag" verification
    // Step 4: Copy ONLY the content value (the part after content=") and paste below
    googleSiteVerification: "", // e.g. "abc123XYZ_your_token_here"

    // ── Google Analytics 4 ────────────────────────────────
    // Go to https://analytics.google.com → Admin → Create property
    // Get the Measurement ID (starts with G-)
    googleAnalyticsId: "", // e.g. "G-XXXXXXXXXX"

    // ── Locale & Region ───────────────────────────────────
    locale: "en_IN",  // Language_Country for Open Graph
    region: "IN",

    // Twitter/X handle (optional) — with @ sign
    twitterHandle: "",
  },

  // ── 1. DEMO / RESELLER FLAGS ──────────────────────────────
  //  Set `isDemo` to true while presenting to a prospect.
  //  A banner will appear at the top of the site.
  //  Set to false when a real client goes live.
  demo: {
    isDemo: true,
    bannerText: "🚀 Demo Preview — This website is fully customisable for your clinic.",
    bannerSubText: "Contact us to get your own branded version.",
  },

  // ── 2. BRAND ──────────────────────────────────────────────
  brand: {
    name: "Your Clinic Name",            // e.g.  "Skintimacy Clinic"
    tagline: "Reveal Your Best Skin",
    logoText: "DERM",                    // Short text used in navbar/footer logo
    builtBy: "Sultandev",               // Credit shown in footer (optional)
  },

  // ── 3. DOCTOR PROFILE ─────────────────────────────────────
  aboutDoctor: {
    heading: "Meet Your Dermatologist",
    name: "Dr. [Name]",
    credentials: "(MBBS, MD, Dermatology)",
    bioParagraphs: [
      "An MCI-recognised dermatologist with advanced training from a leading medical institution. Specialising in evidence-based skincare, hair care, and aesthetic medicine.",
      "With years of clinical experience, our doctor brings expertise across general dermatology, cosmetic procedures, anti-aging treatments, and non-surgical facial rejuvenation.",
      "Every treatment plan is tailored to the individual — because your skin is unique."
    ],
    ctaText: "Book a Consultation",
    imageUrl: "/doctor-portrait.png",
  },

  // ── 4. CONTACT & LOCATION ─────────────────────────────────
  contact: {
    phone: "+91 98765 00000",
    email: "appointments@yourclinic.com",
    address: "Your Clinic Address, City, State – 000000",
    workingHours: "Mon – Sat: 10:00 AM – 7:00 PM",
    // WhatsApp number (digits only, with country code, no + sign, no spaces)
    // Used for form submission →  data is sent as a pre-filled WhatsApp message
    whatsappNumber: "919876500000",
  },

  // ── 5. SOCIAL LINKS ───────────────────────────────────────
  //  Set to empty string "" to hide an icon.
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "",
    whatsapp: "https://wa.me/919876500000",
  },

  // ── 6. APPOINTMENT FORM ───────────────────────────────────
  //  Controls what the booking form collects and how it submits.
  appointment: {
    formTitle: "Request an Appointment",
    formSubTitle: "We'll confirm your slot within 1 hour during working hours.",
    submitVia: "whatsapp" as "whatsapp" | "email" | "both",
    // Fields that appear in the form — set `enabled: false` to hide a field
    fields: {
      name:    { label: "Full Name",       placeholder: "Rahul Sharma",         required: true,  enabled: true },
      phone:   { label: "Phone Number",    placeholder: "+91 98765 00000",      required: true,  enabled: true },
      email:   { label: "Email Address",   placeholder: "rahul@example.com",    required: false, enabled: true },
      service: { label: "Concern / Service",  placeholder: "e.g. Acne, Hair Fall, Pigmentation", required: false, enabled: true },
      message: { label: "Additional Notes",   placeholder: "Any other details you'd like to share…", required: false, enabled: true },
    },
    successMessage: "Thank you! We'll confirm your appointment via WhatsApp shortly.",
  },

  // ── 7. HERO SECTION ───────────────────────────────────────
  hero: {
    headline: "Expert Skin Care for a Radiant You",
    subheadline: "Board-certified dermatologists dedicated to medical and cosmetic excellence. Experience personalised treatments in a luxurious setting.",
    ctaText: "Book Appointment",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop",
  },

  // ── 8. SERVICES ───────────────────────────────────────────
  services: [
    { id: "acne",          title: "Acne Treatment",          description: "Advanced solutions for clear, blemish-free skin.",        icon: "Sparkles"   },
    { id: "pigmentation",  title: "Pigmentation Treatment",  description: "Even out your skin tone with targeted therapies.",        icon: "Droplets"   },
    { id: "anti-age",      title: "Anti-Ageing Services",    description: "Restore youthful radiance with modern techniques.",       icon: "Stethoscope"},
    { id: "skin-booster",  title: "Skin Boosters",           description: "Deep hydration treatments for a luminous glow.",          icon: "Zap"        },
    { id: "chemical-peels",title: "Chemical Peels",          description: "Rejuvenate and refresh your complexion effectively.",     icon: "Droplets"   },
    { id: "laser-hair",    title: "Laser Hair Reduction",    description: "Safe, long-lasting smooth skin solution.",                icon: "Zap"        },
  ],

  // ── 9. TESTIMONIALS ───────────────────────────────────────
  testimonials: [
    {
      id: 1,
      name: "Diksha W.",
      text: "The best ever doctor for skin and hair issues! Explains everything brilliantly. Highly recommended!",
      rating: 5,
      source: "Google"
    },
    {
      id: 2,
      name: "Abhinav Y.",
      text: "Doctor addresses skin issues very accurately and gives enough time to understand the causes. One of the best!",
      rating: 5,
      source: "Google"
    },
    {
      id: 3,
      name: "Muskan S.",
      text: "Excellent experience. Calm, knowledgeable, and explains everything clearly. Treatment was effective and well-planned.",
      rating: 5,
      source: "Google"
    }
  ],

  // ── 10. FAQs ──────────────────────────────────────────────
  faqs: [
    {
      question: "Do I need to book an appointment in advance?",
      answer: "Walk-ins are welcome, but we recommend booking in advance for a personalised experience with minimal wait time."
    },
    {
      question: "What are the consultation charges?",
      answer: "Initial consultation is ₹500, valid for 7 days. Follow-up after 7 days is ₹350."
    },
    {
      question: "What treatments do you offer?",
      answer: "Acne, pigmentation, tanning, vitiligo, psoriasis, hair fall, and advanced anti-aging cosmetic treatments."
    },
    {
      question: "Is the clinic unisex?",
      answer: "Yes, our clinic warmly welcomes clients of all genders."
    },
    {
      question: "Do you offer pre-wedding skin treatments?",
      answer: "Yes! Customised bridal and pre-wedding skin packages are available. Contact us for details."
    }
  ],

  // ── 11. THEME / COLORS ────────────────────────────────────
  //  Changing these re-colors the entire website instantly.
  colors: {
    primary:      "#4A5D4E",   // Sage green (main brand color)
    primaryHover: "#3C4B3F",
    accent:       "#D4AF37",   // Gold (luxury highlights)
    background:   "#FAFAFA",
    textMain:     "#1F2937",
    textMuted:    "#6B7280",
  },
};
