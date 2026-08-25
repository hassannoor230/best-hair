import React from "react";
import { Phone, MessageCircle, Navigation } from "lucide-react";

const MobileActionBar = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 px-4 py-3">
      <div className="flex items-center justify-around">
        <a href="tel:+923006442344" className="flex flex-col items-center text-primary hover:text-accent transition-colors">
          <Phone className="w-5 h-5" />
          <span className="text-xs mt-1 font-medium">Call</span>
        </a>
        <a href="https://wa.me/923006442344" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-green-600 hover:text-green-700 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs mt-1 font-medium">WhatsApp</span>
        </a>
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-blue-600 hover:text-blue-700 transition-colors">
          <Navigation className="w-5 h-5" />
          <span className="text-xs mt-1 font-medium">Directions</span>
        </a>
      </div>
    </div>
  );
};

export default MobileActionBar;
