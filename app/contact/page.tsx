'use client';

import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-brown-dark to-brown py-20 text-center text-white">
        <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
        <p className="mt-2 opacity-80">We would love to hear from you</p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 md:grid-cols-2 md:px-6">
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-brown-dark">Get in Touch</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-dark text-maroon">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-brown-light">Address</p>
                  <p className="text-sm font-medium text-brown-dark">
                    No. 135, Village High Road, Sholinganallur, Chennai 600119
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-dark text-maroon">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-brown-light">Email</p>
                  <p className="text-sm font-medium text-brown-dark">[To be configured]</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-dark text-maroon">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-brown-light">Phone / WhatsApp</p>
                  <p className="text-sm font-medium text-brown-dark">[To be configured]</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-dark text-maroon">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-brown-light">Business Hours</p>
                  <p className="text-sm font-medium text-brown-dark">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-48 items-center justify-center rounded-2xl border border-border bg-cream-dark text-brown-light">
            <div className="text-center">
              <div className="text-3xl">🗺️</div>
              <p className="mt-2 text-sm">Google Maps will be configured here</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-brown-dark">Send a Message</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! We will get back to you soon.");
              (e.target as HTMLFormElement).reset();
            }}
            className="mt-4 space-y-3"
          >
            <input type="text" placeholder="Your Name" className="input" required />
            <input type="email" placeholder="Email Address" className="input" required />
            <input type="tel" placeholder="Mobile Number" className="input" />
            <select className="input">
              <option>General Enquiry</option>
              <option>Order Support</option>
              <option>Product Question</option>
              <option>Bulk Order</option>
            </select>
            <textarea placeholder="Your Message" className="input min-h-[120px]" required />
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}