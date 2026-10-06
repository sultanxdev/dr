"use client";

import React, { useState } from "react";
import { clientData } from "@/config/clientData";
import { trackCallClick, trackWhatsAppClick } from "@/lib/analytics";
import { Phone, MessageCircle, Calendar } from "lucide-react";

export default function StickyCTA() {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleCall = () => {
    trackCallClick();
    window.location.href = `tel:${clientData.contact.phone}`;
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick("Direct WhatsApp");
    const message = `Hi Doctor, I would like to know more about your services.`;
    const encodedMessage = encodeURIComponent(message);
    const phone = clientData.contact.whatsappNumber;
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      {/* STICKY CTA - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40">
        <div className="flex items-center gap-2 p-3">
          {/* CALL BUTTON */}
          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            title="Call clinic"
          >
            <Phone size={18} />
            <span className="hidden sm:inline text-sm">Call</span>
          </button>

          {/* WHATSAPP BUTTON */}
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline text-sm">WhatsApp</span>
          </button>

          {/* BOOKING BUTTON */}
          <button
            onClick={() => setShowBookingModal(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            title="Book appointment"
          >
            <Calendar size={18} />
            <span className="hidden sm:inline text-sm">Book</span>
          </button>
        </div>
      </div>

      {/* DESKTOP SIDE CTA - Desktop Only */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 flex-col gap-3 p-4 z-40">
        {/* CALL BUTTON */}
        <button
          onClick={handleCall}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition transform hover:scale-110"
          title="Call clinic"
        >
          <Phone size={24} />
        </button>

        {/* WHATSAPP BUTTON */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition transform hover:scale-110"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={24} />
        </button>

        {/* BOOKING BUTTON */}
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition transform hover:scale-110"
          title="Book appointment"
        >
          <Calendar size={24} />
        </button>
      </div>
    </>
  );
}
