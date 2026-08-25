import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";

const ServiceDetail = () => {
  const { slug } = useParams();

  return (
    <div className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/80 mb-8 font-medium">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Back to Services
        </Link>
        <div className="bg-background p-10 rounded-sm">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-6 capitalize">{slug?.replace(/-/g, " ")}</h1>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center text-muted">
              <Tag className="w-5 h-5 mr-2 text-accent" />
              <span>Professional Service</span>
            </div>
            <div className="flex items-center text-muted">
              <Clock className="w-5 h-5 mr-2 text-accent" />
              <span>45 min</span>
            </div>
          </div>
          <p className="text-text text-lg mb-8 leading-relaxed">Professional service delivered with precision and care by our expert stylists.</p>
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <span className="text-accent font-bold text-4xl">Rs. 500</span>
            <Link to="/appointment" className="btn-primary inline-flex items-center">
              Book Now <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
