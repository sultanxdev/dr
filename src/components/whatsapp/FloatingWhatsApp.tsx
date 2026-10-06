"use client";

import { MessageCircle } from "lucide-react";
import { createWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { clientData } from "@/config/clientData";
import { trackWhatsAppClick } from "@/lib/analytics";

/**
 * Floating WhatsApp Button
 * Always visible in bottom-right corner
 * Mobile: Hidden (shows in sticky CTA instead)
 * Desktop: Visible
 */
export default function FloatingWhatsApp() {
  const handleClick = () => {
    trackWhatsAppClick("Floating Button");
  };

  const link = createWhatsAppLink(
    clientData.contact.whatsappNumber,
    whatsappMessages.general
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="
        hidden md:flex
        fixed bottom-8 right-8 z-40
        items-center justify-center
        w-16 h-16
        rounded-full
        shadow-2xl
        hover:shadow-3xl
        bg-green-500 hover:bg-green-600
        text-white
        transition-all
        duration-300
        transform
        hover:scale-110
      "
      title="Chat with us on WhatsApp"
      aria-label="WhatsApp chat button"
    >
      <MessageCircle size={28} />
    </a>
  );
}
