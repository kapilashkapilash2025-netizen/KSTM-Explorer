'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Star, Heart, Navigation } from 'lucide-react';
import { Place } from '@/lib/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PlaceCardProps {
  place: Place;
  onClick?: () => void;
}

export default function PlaceCard({ place, onClick }: PlaceCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [imageSrc, setImageSrc] = useState(place.image);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favouritePlaces') || '[]');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFavourite(favs.some((f: Place) => f.id === place.id));
  }, [place.id]);

  const toggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem('favouritePlaces') || '[]');
    let newFavs;
    if (isFavourite) {
      newFavs = favs.filter((f: Place) => f.id !== place.id);
    } else {
      newFavs = [...favs, place];
    }
    localStorage.setItem('favouritePlaces', JSON.stringify(newFavs));
    setIsFavourite(!isFavourite);
    
    // Dispatch custom event to update other components
    window.dispatchEvent(new Event('favouritesUpdated'));
  };

  const openDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass-panel rounded-2xl overflow-hidden hover:shadow-[0_0_24px_rgba(56,189,248,0.25)] cursor-pointer group flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={place.name}
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageSrc('/logo.png')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5 pointer-events-none"></div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={toggleFavourite}
            className="w-8 h-8 rounded-full bg-card/90 backdrop-blur flex items-center justify-center text-foreground hover:text-red-500 transition-all shadow-sm border border-primary-900/35"
          >
            <Heart className={`w-4 h-4 ${isFavourite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur px-2.5 py-1 rounded-md text-xs font-semibold text-primary shadow-sm">
          {place.category}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-foreground text-lg line-clamp-1">{place.name}</h3>
          <div className="flex items-center gap-1 bg-primary/10 px-1.5 py-0.5 rounded text-xs font-bold text-primary">
            <Star className="w-3 h-3 fill-primary" />
            {place.rating}
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
          <MapPin className="w-3 h-3" />
          <span>{place.district}, {place.province}</span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
          {place.description}
        </p>
        
        <div className="flex items-center gap-2 mt-auto">
          <button className="flex-1 bg-primary/15 text-primary hover:bg-primary/25 py-2 rounded-xl text-sm font-semibold transition-colors border border-primary-900/30">
            View Details
          </button>
          <button 
            onClick={openDirections}
            className="w-10 h-10 flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 rounded-xl transition-colors"
            title="Directions"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
