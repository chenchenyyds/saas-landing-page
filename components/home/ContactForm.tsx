"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { Send, CheckCircle2 } from "lucide-react";
import { RoughNotation } from "react-rough-notation";
import toast, { Toaster } from "react-hot-toast";

interface ContactFormProps {
  locale: any;
  langName: string;
}

const ContactForm = ({ locale }: ContactFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = locale.validation?.nameMin || "Name must be at least 2 characters";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = locale.validation?.emailInvalid || "Please enter a valid email";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = locale.validation?.messageMin || "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        toast.success(locale.successMessage || "Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error(locale.errorMessage || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col justify-center max-w-2xl w-[95%] mx-auto items-center pt-16 pb-20">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-center">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <p className="mt-4 text-lg text-default-500">
          {locale.description}
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="w-full space-y-6 bg-content1 rounded-2xl border border-default-200 p-8 shadow-sm"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {locale.nameLabel}
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-default-300 bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={locale.namePlaceholder}
          />
          {errors.name && <p className="mt-1 text-sm text-danger">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            {locale.emailLabel}
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-default-300 bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={locale.emailPlaceholder}
          />
          {errors.email && <p className="mt-1 text-sm text-danger">{errors.email}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            {locale.messageLabel}
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-lg border border-default-300 bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder={locale.messagePlaceholder}
          />
          {errors.message && <p className="mt-1 text-sm text-danger">{errors.message}</p>}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 rounded-xl text-base font-semibold shadow-lg shadow-blue-500/25 disabled:opacity-50"
          size="lg"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {locale.sendingText || "Sending..."}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {isSuccess ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  {locale.sentText || "Sent!"}
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  {locale.submitText}
                </>
              )}
            </span>
          )}
        </Button>
      </motion.form>
    </section>
  );
};

export default ContactForm;
