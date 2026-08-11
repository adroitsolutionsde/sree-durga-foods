import { Mail, MapPin, Phone, Clock } from "lucide-react";
import ContactForm from "./ContactForm";
import { BUSINESS_CONFIG } from "@/lib/config";

export default function ContactPage() {
  const { address, phone, email } = BUSINESS_CONFIG;
  
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
                    {address.line1}, {address.area}, {address.city}, {address.state} {address.pincode}, {address.country}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-dark text-maroon">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-brown-light">Email</p>
                  <p className="text-sm font-medium text-brown-dark">{email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-dark text-maroon">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-brown-light">Phone / WhatsApp</p>
                  <p className="text-sm font-medium text-brown-dark">{phone}</p>
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
          <ContactForm />
        </div>
      </div>
    </>
  );
}