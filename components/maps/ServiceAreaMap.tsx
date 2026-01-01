"use client";

import { useState } from "react";
import { MapPin, Phone, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { serviceAreas } from "@/lib/data";

interface City {
  name: string;
  state: string;
  coordinates?: { lat: number; lng: number };
  responseTime: string;
}

const cities: City[] = [
  { name: "Bowie", state: "MD", responseTime: "30-45 min", coordinates: { lat: 38.9427, lng: -76.7302 } },
  { name: "Upper Marlboro", state: "MD", responseTime: "30-45 min", coordinates: { lat: 38.8157, lng: -76.7494 } },
  { name: "Laurel", state: "MD", responseTime: "30-45 min", coordinates: { lat: 39.0993, lng: -76.8483 } },
  { name: "Silver Spring", state: "MD", responseTime: "45-60 min", coordinates: { lat: 39.0040, lng: -77.0261 } },
  { name: "Rockville", state: "MD", responseTime: "60-75 min", coordinates: { lat: 39.0840, lng: -77.1528 } },
  { name: "Bethesda", state: "MD", responseTime: "60-75 min", coordinates: { lat: 38.9847, lng: -77.1200 } },
  { name: "College Park", state: "MD", responseTime: "30-45 min", coordinates: { lat: 38.9807, lng: -76.9369 } },
  { name: "Hyattsville", state: "MD", responseTime: "30-45 min", coordinates: { lat: 38.9559, lng: -76.9456 } },
  { name: "Washington", state: "DC", responseTime: "45-60 min", coordinates: { lat: 38.9072, lng: -77.0369 } },
  { name: "Arlington", state: "VA", responseTime: "60-75 min", coordinates: { lat: 38.8799, lng: -77.1067 } },
  { name: "Alexandria", state: "VA", responseTime: "60-75 min", coordinates: { lat: 38.8048, lng: -77.0469 } },
  { name: "Baltimore", state: "MD", responseTime: "45-60 min", coordinates: { lat: 39.2904, lng: -76.6122 } },
  { name: "Ellicott City", state: "MD", responseTime: "60-75 min", coordinates: { lat: 39.2673, lng: -76.7983 } },
  { name: "Harford County", state: "MD", responseTime: "60-75 min", coordinates: { lat: 39.5663, lng: -76.3522 } },
  { name: "Easton", state: "MD", responseTime: "75-90 min", coordinates: { lat: 38.7743, lng: -76.0760 } },
  { name: "Westminster", state: "MD", responseTime: "75-90 min", coordinates: { lat: 39.5754, lng: -77.0011 } },
  { name: "Frederick", state: "MD", responseTime: "75-90 min", coordinates: { lat: 39.4143, lng: -77.4105 } },
  { name: "Elkton", state: "MD", responseTime: "75-90 min", coordinates: { lat: 39.6068, lng: -75.8333 } },
  { name: "Annapolis", state: "MD", responseTime: "45-60 min", coordinates: { lat: 38.9784, lng: -76.4922 } },
  { name: "Anne Arundel County", state: "MD", responseTime: "45-60 min", coordinates: { lat: 39.0458, lng: -76.6413 } },
  { name: "Carroll County", state: "MD", responseTime: "75-90 min", coordinates: { lat: 39.5754, lng: -77.0011 } },
  { name: "Denton", state: "MD", responseTime: "75-90 min", coordinates: { lat: 38.8857, lng: -75.8272 } },
];

export function ServiceAreaMap() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const hasGoogleMapsKey = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="space-y-8">
      {/* Map Implementation */}
      <div
        className="relative rounded-2xl overflow-hidden aspect-[16/9]"
        style={{
          border: '1px solid transparent',
          backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
      >
        <iframe
          width="100%"
          height="100%"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=13133%20Beaver%20Terrace%2CRockville%2CMD%2C20853&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          title="Service Area Map"
          className="w-full h-full filter grayscale-[0.5] invert-[0.9] contrast-[1.1] opacity-80 hover:opacity-100 transition-opacity duration-300"
        ></iframe>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city, index) => (
          <motion.button
            key={city.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedCity(city)}
            className={`
              text-left p-4 rounded-xl transition-all group
              ${selectedCity?.name === city.name
                ? "bg-primary-600 border-primary-500 shadow-lg shadow-primary-500/20"
                : "shadow-lg hover:shadow-xl"
              }
            `}
            style={selectedCity?.name !== city.name ? {
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            } : {}}
          >
            <div className="flex items-start gap-3">
              <MapPin
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${selectedCity?.name === city.name ? "text-white" : "text-primary-400"
                  }`}
              />
              <div className="flex-1">
                <h3
                  className={`font-semibold ${selectedCity?.name === city.name ? "text-white" : "text-white"
                    }`}
                >
                  {city.name}, {city.state}
                </h3>
                <p
                  className={`text-sm mt-1 ${selectedCity?.name === city.name ? "text-white/80" : "text-primary-200"
                    }`}
                >
                  Response: {city.responseTime}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Selected City Info */}
      {selectedCity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Service in {selectedCity.name}, {selectedCity.state}
              </h3>
              <p className="text-white/90 mb-4">
                We provide full HVAC services to {selectedCity.name} and surrounding areas. Our
                certified technicians can typically reach you within {selectedCity.responseTime}.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:2404327489"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call (240) 432-7489
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-neutral-300"
                >
                  <Navigation className="h-4 w-4" />
                  Request Service
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Coverage Notice */}
      <div
        className="rounded-xl p-6"
        style={{
          border: '1px solid transparent',
          backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
      >
        <p className="text-primary-200 text-center">
          <span className="font-semibold text-white">Don't see your city?</span> We may still serve
          your area. Call us at{" "}
          <a href="tel:2404327489" className="text-primary-400 hover:underline font-semibold">
            (240) 432-7489
          </a>{" "}
          to confirm service availability.
        </p>
      </div>
    </div>
  );
}
