import React from "react";
import { Star } from "lucide-react";

const Reviews = () => {
  return (
    <div className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-widest uppercase mb-4 text-sm">Testimonials</p>
          <h1 className="section-title">Customer Reviews</h1>
          <p className="section-subtitle">See what our clients have to say about us</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Ali R.", rating: 5, review: "Best haircut experience in Gujranwala. The attention to detail is incredible.", source: "Google" },
            { name: "Hassan M.", rating: 5, review: "Professional service and great atmosphere. Highly recommended.", source: "Google" },
            { name: "Ahmed K.", rating: 4, review: "Excellent beard grooming service. Clean and comfortable salon.", source: "Google" },
          ].map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < review.rating ? "text-accent fill-accent" : "text-gray-300"}`} />
                ))}
              </div>
              <p className="text-text mb-6 italic leading-relaxed">"{review.review}"</p>
              <div>
                <p className="font-semibold text-primary">{review.name}</p>
                <p className="text-sm text-muted">{review.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
