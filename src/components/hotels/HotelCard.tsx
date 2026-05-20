'use client';

import React, { useState, useEffect } from 'react';
import { Hotel } from '@/lib/types';
import { MapPin, Star, Heart, Navigation, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favouriteHotels') || '[]');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFavourite(favs.some((f: Hotel) => f.id === hotel.id));
  }, [hotel.id]);

  const toggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem('favouriteHotels') || '[]');
    let newFavs;
    if (isFavourite) {
      newFavs = favs.filter((f: Hotel) => f.id !== hotel.id);
    } else {
      newFavs = [...favs, hotel];
    }
    localStorage.setItem('favouriteHotels', JSON.stringify(newFavs));
    setIsFavourite(!isFavourite);
    window.dispatchEvent(new Event('favouritesUpdated'));
  };

  const openDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${hotel.latitude},${hotel.longitude}`, '_blank');
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col md:flex-row h-full md:h-[280px] border border-gray-100 group"
    >
      <div className="relative w-full md:w-2/5 h-48 md:h-full shrink-0 overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={toggleFavourite}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-700 hover:text-red-500 hover:bg-white transition-all shadow-sm"
          >
            <Heart className={`w-4 h-4 ${isFavourite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
          {Array(hotel.starRating).fill(0).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 text-xl leading-tight line-clamp-2 pr-2">{hotel.name}</h3>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg text-sm font-bold text-green-700 shrink-0">
              <Star className="w-3.5 h-3.5 fill-green-700" />
              {hotel.rating}
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{hotel.district}, {hotel.province}</span>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {hotel.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                <CheckCircle2 className="w-3 h-3 text-primary-500" />
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-xs text-gray-500 flex items-center px-2 py-1">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
          <div className="flex-1">
            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Price Range</span>
            <div className="text-sm font-bold text-gray-900">{hotel.priceRange}</div>
          </div>
          <button 
            onClick={openDirections}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors shrink-0"
            title="Directions"
          >
            <Navigation className="w-4 h-4" />
          </button>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shrink-0 shadow-sm shadow-primary-600/20">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
