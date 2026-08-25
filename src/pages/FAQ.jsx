import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "What are your salon hours?", answer: "We are open from 10:00 AM to 1:00 AM daily." },
    { question: "Do I need an appointment?", answer: "Appointments are recommended but walk-ins are welcome based on availability." },
    { question: "What payment methods do you accept?", answer: "We accept cash and all major payment methods." },
    { question: "Where are you located?", answer: "Plot 480 B, Block B, Satellite Town, Gujranwala, Punjab, Pakistan." },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-widest uppercase mb-4 text-sm">FAQ</p>
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="section-subtitle">Everything you need to know about our salon</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-background rounded-sm overflow-hidden border border-gray-100">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-heading font-bold text-primary text-lg">{faq.question}</span>
                <span className="text-accent text-2xl font-light">{openIndex === idx ? "−" : "+"}</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-muted leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
