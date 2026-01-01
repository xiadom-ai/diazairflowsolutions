"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: "residential" | "commercial" | "ductwork";
  description?: string;
}

const galleryImages: GalleryImage[] = [
  // Residential
  {
    id: "res-1",
    url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    title: "Modern AC Installation",
    category: "residential",
    description: "High-efficiency AC system installation in Bowie, MD",
  },
  {
    id: "res-2",
    url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
    title: "Furnace Replacement",
    category: "residential",
    description: "Complete furnace system upgrade in Silver Spring, MD",
  },
  {
    id: "res-3",
    url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
    title: "Smart Thermostat Setup",
    category: "residential",
    description: "Smart home HVAC integration in Rockville, MD",
  },
  {
    id: "res-4",
    url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    title: "Heat Pump Installation",
    category: "residential",
    description: "Energy-efficient heat pump in Bethesda, MD",
  },
  {
    id: "res-5",
    url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    title: "AC Repair Service",
    category: "residential",
    description: "Professional AC maintenance and repair in College Park, MD",
  },
  {
    id: "res-6",
    url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    title: "HVAC Maintenance",
    category: "residential",
    description: "Annual HVAC system inspection in Hyattsville, MD",
  },
  // Commercial
  {
    id: "com-1",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    title: "Office Building HVAC",
    category: "commercial",
    description: "Complete HVAC system for 5-story office building in DC",
  },
  {
    id: "com-2",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    title: "Retail Space Climate Control",
    category: "commercial",
    description: "Multi-zone climate control for retail center in Bethesda",
  },
  {
    id: "com-3",
    url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    title: "Commercial HVAC System",
    category: "commercial",
    description: "Large-scale commercial HVAC installation in Arlington, VA",
  },
  {
    id: "com-4",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    title: "Restaurant Ventilation",
    category: "commercial",
    description: "Commercial kitchen HVAC and ventilation system in Silver Spring",
  },
  // Ductwork
  {
    id: "duct-1",
    url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    title: "Duct Installation",
    category: "ductwork",
    description: "New ductwork installation for residential home in Laurel, MD",
  },
  {
    id: "duct-2",
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    title: "Duct Cleaning Service",
    category: "ductwork",
    description: "Professional duct cleaning and sanitization in Rockville, MD",
  },
  {
    id: "duct-3",
    url: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&q=80",
    title: "Duct Sealing",
    category: "ductwork",
    description: "Duct sealing for improved energy efficiency in Upper Marlboro, MD",
  },
];

const categories = [
  { id: "all", label: "All Projects", count: galleryImages.length },
  {
    id: "residential",
    label: "Residential",
    count: galleryImages.filter((img) => img.category === "residential").length,
  },
  {
    id: "commercial",
    label: "Commercial",
    count: galleryImages.filter((img) => img.category === "commercial").length,
  },
  {
    id: "ductwork",
    label: "Ductwork",
    count: galleryImages.filter((img) => img.category === "ductwork").length,
  },
];

export function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              px-6 py-3 rounded-full font-semibold transition-all
              ${activeCategory === category.id
                ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/20"
                : "bg-[#201F1E] text-primary-200 hover:bg-[#2a2928] border border-primary-600/30"
              }
            `}
          >
            {category.label}
            <span className="ml-2 text-sm opacity-75">({category.count})</span>
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#201F1E] cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-primary-100">{image.description}</p>
                  )}
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ZoomIn className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full capitalize">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredImages.length === 0 && (
        <div className="text-center py-20">
          <p className="text-primary-200 text-lg">No projects found in this category.</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div
              className="max-w-6xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={selectedImage.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  width={1200}
                  height={800}
                  className="rounded-lg max-h-[80vh] w-auto h-auto object-contain"
                  quality={95}
                />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full capitalize mb-2">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-primary-100">{selectedImage.description}</p>
                  )}
                  <p className="text-sm text-primary-200 mt-2">
                    {currentIndex + 1} / {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
