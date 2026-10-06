"use client";

import { MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { clientData } from "@/config/clientData";
import { trackWhatsAppClick } from "@/lib/analytics";

interface WhatsAppCTAProps {
  message: string;
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  location?: string; // For analytics tracking
}

/**
 * Reusable WhatsApp CTA Button
 * Can be used in sections, cards, CTAs, etc.
 */
export default function WhatsAppCTA({
  message,
  label = "Chat on WhatsApp",
  className = "",
  variant = "primary",
  size = "md",
  showIcon = true,
  location = "generic",
}: WhatsAppCTAProps) {
  const handleClick = () => {
    trackWhatsAppClick(location);
  };

  const link = createWhatsAppLink(clientData.contact.whatsappNumber, message);

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm gap-1",
    md: "px-4 py-3 text-base gap-2",
    lg: "px-6 py-4 text-lg gap-3",
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-green-500 text-green-500 hover:bg-green-50",
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-lg
        font-semibold
        transition-all
        duration-300
        transform
        hover:scale-105
        active:scale-95
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      title="Start WhatsApp conversation"
      aria-label={label}
    >
      {showIcon && <MessageCircle size={20} />}
      <span>{label}</span>
    </a>
  );
}
