"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { clientData } from "@/config/clientData";
import { 
  generateWhatsAppMessage, 
  redirectToWhatsApp, 
  formatPhoneForWhatsApp 
} from "@/lib/whatsapp";
import { trackAppointmentSubmitted, trackConversion } from "@/lib/analytics";

// ==================== VALIDATION SCHEMA ====================
const bookingSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  
  phone: z.string()
    .regex(/^[0-9+\-\s()]{10,}$/, "Please enter a valid phone number"),
  
  treatment: z.string()
    .min(1, "Please select a treatment"),
  
  preferredDate: z.string()
    .optional()
    .refine(
      (date) => !date || new Date(date) > new Date(),
      "Please select a future date"
    ),
  
  preferredTime: z.string().optional(),
  
  message: z.string()
    .max(500, "Message must be less than 500 characters")
    .optional(),
  
  // Anti-spam honeypot - should always be empty
  website: z.string()
    .max(0, "Invalid form submission")
    .optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// ==================== COMPONENT ====================
export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      treatment: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
      website: "", // Honeypot
    },
  });

  // ==================== FORM SUBMISSION ====================
  const onSubmit = async (data: BookingFormData) => {
    try {
      setLoading(true);
      setError(null);

      // Track submission
      trackAppointmentSubmitted(data.treatment);

      // Send to API route (which will save to Google Sheets)
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          treatment: data.treatment,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          message: data.message,
          source: "Website Booking Form",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }

      // Track conversion
      trackConversion(data.treatment);

      // Show success state
      setSuccess(true);

      // Generate WhatsApp message
      const whatsappMessage = generateWhatsAppMessage({
        name: data.name,
        treatment: data.treatment,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        message: data.message,
      });

      // Format phone number for WhatsApp
      const formattedPhone = formatPhoneForWhatsApp(clientData.contact.whatsappNumber);

      // Redirect to WhatsApp after 1 second
      setTimeout(() => {
        redirectToWhatsApp(formattedPhone, whatsappMessage);
      }, 1000);

      // Reset form after 2 seconds
      setTimeout(() => {
        reset();
        setSuccess(false);
      }, 3000);

    } catch (err) {
      console.error("Booking error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit booking. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // ==================== RENDER ====================
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">
        📅 Book Your Consultation
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        We&apos;ll connect with you on WhatsApp shortly
      </p>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✅ Booking submitted!</p>
          <p className="text-sm text-green-700 mt-1">
            You&apos;ll be redirected to WhatsApp in a moment...
          </p>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">❌ {error}</p>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* NAME FIELD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Your full name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            disabled={loading}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* PHONE FIELD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            {...register("phone")}
            placeholder="10-digit phone number"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            disabled={loading}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* TREATMENT FIELD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Treatment Interested In *
          </label>
          <select
            {...register("treatment")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.treatment ? "border-red-500" : "border-gray-300"
            }`}
            disabled={loading}
          >
            <option value="">-- Select a treatment --</option>
            {clientData.treatments?.map((treatment) => (
              <option key={treatment.id} value={treatment.name}>
                {treatment.name}
              </option>
            ))}
          </select>
          {errors.treatment && (
            <p className="text-red-500 text-xs mt-1">{errors.treatment.message}</p>
          )}
        </div>

        {/* PREFERRED DATE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Date (Optional)
          </label>
          <input
            type="date"
            {...register("preferredDate")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.preferredDate ? "border-red-500" : "border-gray-300"
            }`}
            disabled={loading}
          />
          {errors.preferredDate && (
            <p className="text-red-500 text-xs mt-1">{errors.preferredDate.message}</p>
          )}
        </div>

        {/* PREFERRED TIME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Time (Optional)
          </label>
          <input
            type="time"
            {...register("preferredTime")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={loading}
          />
        </div>

        {/* MESSAGE FIELD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Message (Optional)
          </label>
          <textarea
            {...register("message")}
            placeholder="Any specific concerns or questions?"
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            disabled={loading}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* HONEYPOT (hidden anti-spam field) */}
        <input
          type="hidden"
          {...register("website")}
          style={{ display: "none" }}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
        >
          {loading || isSubmitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Booking...
            </>
          ) : (
            <>
              📞 Book Appointment
            </>
          )}
        </button>

        {/* PRIVACY NOTE */}
        <p className="text-xs text-gray-500 text-center">
          We&apos;ll contact you via WhatsApp within the next 2 hours
        </p>
      </form>
    </div>
  );
}
