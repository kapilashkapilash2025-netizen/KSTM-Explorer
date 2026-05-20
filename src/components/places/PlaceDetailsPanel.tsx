'use client';

import React from 'react';
import { Place } from '@/lib/types';
import { X, MapPin, Star, Calendar, Navigation, Heart, Info, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PlaceDetailsPanelProps {
  place: Place | null;
  onClose: () => void;
}

export default function PlaceDetailsPanel({ place, onClose }: PlaceDetailsPanelProps) {
  const [isFavourite, setIsFavourite] = React.useState(false);

  React.useEffect(() => {
    if (place) {
      const favs = JSON.parse(localStorage.getItem('favouritePlaces') || '[]');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFavourite(favs.some((f: Place) => f.id === place.id));
    }
  }, [place]);

  const toggleFavourite = () => {
    if (!place) return;
    const favs = JSON.parse(localStorage.getItem('favouritePlaces') || '[]');
    let newFavs;
    if (isFavourite) {
      newFavs = favs.filter((f: Place) => f.id !== place.id);
    } else {
      newFavs = [...favs, place];
    }
    localStorage.setItem('favouritePlaces', JSON.stringify(newFavs));
    setIsFavourite(!isFavourite);
    window.dispatchEvent(new Event('favouritesUpdated'));
  };

  const openDirections = () => {
    if (!place) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`, '_blank');
  };

  return (
    <AnimatePresence>
      {place && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-card shadow-2xl z-50 flex flex-col overflow-hidden border-l border-border"
          >
            <div className="relative h-64 shrink-0">
              <Image src={place.image} alt={place.name} fill sizes="(max-width: 768px) 100vw, 400px" className="w-full h-full object-cover" />
              <button 
                onClick={onClose}
                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <button 
                onClick={toggleFavourite}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground shadow-lg hover:text-red-500 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavourite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                  {place.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                  <Star className="w-3 h-3 fill-primary" />
                  {place.rating}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2 leading-tight">{place.name}</h2>
              
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-6">
                <MapPin className="w-4 h-4" />
                <span>{place.district}, {place.province}</span>
              </div>

                {place.weather && (
                  <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Current Weather</h4>
                      <p className="text-foreground font-bold">{place.weather.condition}</p>
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {place.weather.temp}°C
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                    <Info className="w-4 h-4 text-primary" /> About
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {place.description}
                  </p>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                    <Calendar className="w-4 h-4 text-primary" /> Best Time To Visit
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {place.bestTimeToVisit}
                  </p>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    <MapPin className="w-4 h-4 text-primary" /> Nearby Attractions
                  </h3>
                  <ul className="space-y-2">
                    {place.nearbyAttractions.map((attr, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-2 rounded-lg border border-border">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                        {attr}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                    <Tag className="w-4 h-4 text-primary" /> Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
            </div>

            <div className="p-4 border-t border-border bg-card grid grid-cols-2 gap-3 shrink-0">
              <button 
                onClick={toggleFavourite}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-colors border ${
                  isFavourite 
                    ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'border-border bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavourite ? 'fill-red-600' : ''}`} />
                {isFavourite ? 'Saved' : 'Save'}
              </button>
              <button 
                onClick={openDirections}
                className="flex items-center justify-center gap-2 bg-primary hover:opacity-90 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-primary/20"
              >
                <Navigation className="w-4 h-4" />
                Directions
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
