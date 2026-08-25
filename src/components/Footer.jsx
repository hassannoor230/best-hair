import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">B</span>
              </div>
              <span className="font-heading font-bold text-xl">Best Hair Salon</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md leading-relaxed">
              Professional hair and grooming services in Satellite Town, Gujranwala. Your style, sharper.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-white/70 hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/gallery" className="text-white/70 hover:text-accent transition-colors">Gallery</Link></li>
              <li><Link to="/reviews" className="text-white/70 hover:text-accent transition-colors">Reviews</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-3 text-white/70">
              <li>+92 300 6442344</li>
              <li>Plot 480 B, Block B, Satellite Town, Gujranwala</li>
              <li>Open daily: 10:00 AM – 1:00 AM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} Best Hair Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
