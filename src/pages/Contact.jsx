import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-widest uppercase mb-4 text-sm">Contact Us</p>
          <h1 className="section-title">Get In Touch</h1>
          <p className="section-subtitle">We would love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-background p-10 rounded-sm">
            {success ? (
              <div className="text-center py-12">
                <h3 className="font-heading font-bold text-2xl text-primary mb-4">Thank You!</h3>
                <p className="text-muted">Your message has been sent successfully. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Name</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Phone</label>
                  <input type="tel" required className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent" placeholder="Your phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Email</label>
                  <input type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Message</label>
                  <textarea required rows="5" className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent" placeholder="Your message" />
                </div>
                <button type="submit" className="btn-primary w-full">Send Message</button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-background p-8 rounded-sm">
              <h3 className="font-heading font-bold text-xl text-primary mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-accent mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-primary mb-1">Address</p>
                    <p className="text-muted">Plot 480 B, Block B, Satellite Town, Gujranwala, Punjab, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-accent mr-4" />
                  <div>
                    <p className="font-medium text-primary mb-1">Phone</p>
                    <a href="tel:+923006442344" className="text-muted hover:text-accent transition-colors">+92 300 6442344</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-accent mr-4" />
                  <div>
                    <p className="font-medium text-primary mb-1">Hours</p>
                    <p className="text-muted">10:00 AM – 1:00 AM, Daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
