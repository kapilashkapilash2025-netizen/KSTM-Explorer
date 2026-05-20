'use client';

import React, { useState, useEffect } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import { Place, Hotel } from '@/lib/types';
import PlaceCard from '@/components/places/PlaceCard';
import HotelCard from '@/components/hotels/HotelCard';
import PlaceDetailsPanel from '@/components/places/PlaceDetailsPanel';
import { Heart, MapPin, BedDouble, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FavouritesPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'places' | 'hotels'>('places');
  const [favPlaces, setFavPlaces] = useState<Place[]>([]);
  const [favHotels, setFavHotels] = useState<Hotel[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isClient, setIsClient] = useState(false);

  const loadFavourites = () => {
    const places = JSON.parse(localStorage.getItem('favouritePlaces') || '[]');
    const hotels = JSON.parse(localStorage.getItem('favouriteHotels') || '[]');
    setFavPlaces(places);
    setFavHotels(hotels);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    loadFavourites();

    const handleFavUpdate = () => {
      loadFavourites();
    };

    window.addEventListener('favouritesUpdated', handleFavUpdate);
    return () => window.removeEventListener('favouritesUpdated', handleFavUpdate);
  }, []);


  if (!isClient) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <SectionHeader 
        title={t('favourites')} 
        subtitle="Manage all your saved places and hotels in one place." 
      />

      <div className="flex gap-4 border-b border-border mb-8">
        <button
          onClick={() => setActiveTab('places')}
          className={`flex items-center gap-2 pb-4 px-2 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'places'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <MapPin className="w-4 h-4" />
          {t('places')}
          <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs ml-1">
            {favPlaces.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('hotels')}
          className={`flex items-center gap-2 pb-4 px-2 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'hotels'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <BedDouble className="w-4 h-4" />
          {t('hotels')}
          <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs ml-1">
            {favHotels.length}
          </span>
        </button>
      </div>

      {activeTab === 'places' && (
        favPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favPlaces.map((place) => (
              <PlaceCard 
                key={place.id} 
                place={place} 
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border shadow-sm">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No saved places yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6 px-4">Explore the beautiful destinations in Sri Lanka and tap the heart icon to save them here.</p>
            <Link href="/places" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-primary/20">
              Explore Places <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )
      )}

      {activeTab === 'hotels' && (
        favHotels.length > 0 ? (
          <div className="flex flex-col gap-6">
            {favHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border shadow-sm">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No saved hotels yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6 px-4">Find the perfect stay for your trip and tap the heart icon to save it here.</p>
            <Link href="/hotels" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-primary/20">
              Explore Hotels <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )
      )}

      <PlaceDetailsPanel place={selectedPlace} onClose={() => setSelectedPlace(null)} />
    </div>
  );
}
