import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent font-medium tracking-widest uppercase mb-4 text-sm">About Us</p>
            <h1 className="section-title">Best Hair Salon</h1>
            <p className="section-subtitle">
              Professional hair and grooming services in Satellite Town, Gujranwala.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="font-heading font-bold text-3xl text-primary mb-6">Our Story</h3>
              <p className="text-muted mb-6 leading-relaxed text-lg">
                Best Hair Salon has been serving the Gujranwala community with professional hair and grooming services. Located in the heart of Satellite Town, we have built a reputation for quality, consistency, and customer satisfaction.
              </p>
              <p className="text-muted leading-relaxed text-lg">
                Our team of skilled stylists brings years of experience and a passion for precision grooming. Whether you need a classic haircut, a modern style, or a complete grooming session, we are here to deliver.
              </p>
            </div>
            <div className="bg-background p-10 rounded-sm">
              <h3 className="font-heading font-bold text-2xl text-primary mb-6">Visit Us</h3>
              <div className="space-y-4 text-muted">
                <p className="flex items-start">
                  <span className="text-accent font-semibold w-24">Address:</span>
                  <span>Plot 480 B, Block B, Satellite Town, Gujranwala, Punjab, Pakistan</span>
                </p>
                <p className="flex items-center">
                  <span className="text-accent font-semibold w-24">Phone:</span>
                  <a href="tel:+923006442344" className="hover:text-accent transition-colors">+92 300 6442344</a>
                </p>
                <p className="flex items-center">
                  <span className="text-accent font-semibold w-24">Hours:</span>
                  <span>10:00 AM – 1:00 AM, Daily</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
