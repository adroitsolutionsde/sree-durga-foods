'use client';

export default function ContactForm() {
  return (
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
  );
}