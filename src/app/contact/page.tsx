"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactItems = [
  {
    icon: <MapPin className="size-5" />,
    title: "Visit us",
    text: "123 Community Street, Cityville, CC 12345",
  },
  {
    icon: <Phone className="size-5" />,
    title: "Call us",
    text: "+1 (555) 123-4567",
  },
  {
    icon: <Mail className="size-5" />,
    title: "Email us",
    text: "hello@sodilaevents.com",
  },
  {
    icon: <Clock className="size-5" />,
    title: "Hours",
    text: "Mon - Fri: 9:00 AM - 6:00 PM",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleChangeText = (key: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate sending the message
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    toast.success("Thanks! Your message has been sent successfully.");
  };

  return (
    <div className="min-h-[calc(100vh-240px)] bg-background text-foreground">
      {/* Hero */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
              <Mail className="size-4" />
              Get in touch
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Have a question? We would love to hear from you.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
              Whether you are an organizer, a volunteer, or just curious about
              Sodila Events, drop us a line and we will get back to you shortly.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Reach out through any channel below. We typically respond within
              24 hours.
            </p>

            <div className="mt-10 space-y-5">
              {contactItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-card p-5"
                >
                  <div className="flex-shrink-0 mt-0.5 rounded-lg bg-muted p-2.5 text-muted-foreground">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">Follow us</h3>
              <div className="flex gap-3">
                {["X", "Facebook", "Instagram", "LinkedIn"].map((network) => (
                  <a
                    key={network}
                    href="#"
                    className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-background flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
                    aria-label={network}
                  >
                    <span className="sr-only">{network}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Alex Rivera"
                    value={formData.name}
                    onChange={handleChange("name")}
                    required
                    className="h-11 border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange("email")}
                    required
                    className="h-11 border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Question about an upcoming event"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                  required
                  className="h-11 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={handleChangeText("message")}
                  rows={5}
                  required
                  className="resize-none border-gray-200 dark:border-gray-700"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto h-11 px-8 font-medium"
              >
                {submitting ? "Sending..." : "Send Message"}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-card p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to create your first event?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of organizers using Sodila Events to bring their
              communities together.
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center justify-center rounded-lg bg-foreground px-8 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
            >
              Create Event <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
