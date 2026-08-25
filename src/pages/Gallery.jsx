import React, { useState } from "react";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1593702288056-f3a841767df4?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=85",
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-widest uppercase mb-4 text-sm">Our Work</p>
          <h1 className="section-title">Gallery</h1>
          <p className="section-subtitle">Take a look inside our salon and our work</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {images.map((image, i) => (
            <div
              key={i}
              className={`aspect-[4/3] ${i === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto" : ""} bg-background overflow-hidden cursor-pointer group`}
              onClick={() => setSelectedImage(i)}
            >
              <img src={image} alt={`Best Hair Salon work ${i + 1}`} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-accent transition-colors">
            <X className="w-8 h-8" />
          </button>
          <img src={images[selectedImage]} alt="Selected salon work" className="max-w-4xl w-full max-h-[85vh] object-cover" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
