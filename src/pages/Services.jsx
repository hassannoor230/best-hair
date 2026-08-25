import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Services = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-widest uppercase mb-4 text-sm">What We Offer</p>
          <h1 className="section-title">Our Services</h1>
          <p className="section-subtitle">Professional grooming services tailored to your needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Classic Haircut", desc: "A timeless classic haircut tailored to your style.", price: "Rs. 500", duration: "30 min" },
            { name: "Beard Grooming", desc: "Expert beard trimming and shaping.", price: "Rs. 300", duration: "20 min" },
            { name: "Hair Styling", desc: "Professional hair styling for any occasion.", price: "Rs. 700", duration: "40 min" },
            { name: "Shaving", desc: "Traditional hot towel shave.", price: "Rs. 400", duration: "25 min" },
            { name: "Hair Treatment", desc: "Deep conditioning and scalp treatment.", price: "Rs. 1000", duration: "45 min" },
            { name: "Hair Coloring", desc: "Professional coloring services.", price: "Rs. 1500", duration: "60 min" },
          ].map((service, idx) => (
            <div key={idx} className="group bg-background p-8 rounded-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-accent/20">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <div className="w-8 h-8 bg-accent rounded-full" />
              </div>
              <h3 className="font-heading font-bold text-xl text-primary mb-3">{service.name}</h3>
              <p className="text-muted mb-6 leading-relaxed">{service.desc}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-accent font-semibold text-lg">{service.price}</span>
                <span className="text-sm text-muted bg-secondary/5 px-3 py-1 rounded-full">{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
