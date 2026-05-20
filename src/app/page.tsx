'use client';

import React, { useState } from 'react';
import { places } from '@/data/places';
import { Place, PlaceCategory } from '@/lib/types';
import PlaceCard from '@/components/places/PlaceCard';
import PlaceDetailsPanel from '@/components/places/PlaceDetailsPanel';
import SriLankaMap from '@/components/places/SriLankaMap';
import SectionHeader from '@/components/common/SectionHeader';
import { Filter, Map as MapIcon, Grid, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

const categories: (PlaceCategory | 'All')[] = [
  'All', 'Nature', 'Beach', 'Culture', 'Wildlife', 'Adventure', 'Religious', 'City'
];

export default function Home() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | 'All'>('All');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredPlaces = places.filter(place => 
    activeCategory === 'All' ? true : place.category === activeCategory
  );

  const scrollToDiscover = () => {
    const section = document.getElementById('discover-places-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      
      {/* Hero Section - Friendly Student Style */}
      <div className="bg-gradient-to-r from-[#07182d] via-[#0a2a4a] to-[#08345d] rounded-3xl p-8 sm:p-12 mb-8 text-white relative overflow-hidden border border-primary-700/60 neon-glow">
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-xl overflow-hidden mb-6 bg-white/10 backdrop-blur-sm border border-primary-300/40 p-1"
          >
            <Image src="/logo.png" alt="Logo" width={64} height={64} className="w-full h-full object-cover rounded-lg" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
          >
            {t('discoverPlaces')} <span className="text-secondary-200">Sri Lanka</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-50 text-lg mb-8 opacity-90"
          >
            Explore amazing places, plan your trip and create unforgettable memories with your smart assistant.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/trip-planner" className="bg-white/10 backdrop-blur text-primary-100 px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-all duration-300 active:scale-95 border border-primary-300/40 hover:shadow-[0_0_16px_rgba(56,189,248,0.35)]">
              {t('tripPlanner')}
            </Link>
            <button
              type="button"
              onClick={scrollToDiscover}
              className="bg-primary-500/90 text-white border border-primary-300/60 px-6 py-3 rounded-full font-bold hover:bg-primary-400 transition-all duration-300 active:scale-95 neon-glow"
            >
              {t('discoverPlaces')}
            </button>
          </motion.div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none">
          <div className="absolute right-10 top-10 w-64 h-64 bg-cyan-300 rounded-full blur-3xl opacity-25"></div>
          <div className="absolute right-40 bottom-10 w-48 h-48 bg-sky-400 rounded-full blur-3xl opacity-25"></div>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
        
        <div className="flex-1 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary-600 text-white shadow-[0_0_18px_rgba(56,189,248,0.35)]' 
                    : 'bg-card text-muted-foreground border border-border hover:border-primary-300 hover:text-primary-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:bg-muted transition-all duration-300 hover:shadow-[0_0_12px_rgba(56,189,248,0.25)]">
            <Filter className="w-4 h-4" />
            {t('filters')}
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex bg-muted p-1 rounded-full border border-border">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-card shadow-sm text-primary-400' : 'text-muted-foreground hover:text-primary-300'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${viewMode === 'map' ? 'bg-card shadow-sm text-primary-400' : 'text-muted-foreground hover:text-primary-300'}`}
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'grid' ? (
        <div id="discover-places-section">
          <SectionHeader 
            title={activeCategory === 'All' ? t('topDestinations') : `${activeCategory} ${t('places')}`} 
            subtitle={t('showingPlaces', { count: filteredPlaces.length })} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard 
                key={place.id} 
                place={place} 
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
          <div className="w-full lg:w-2/3 h-full">
            <SriLankaMap 
              className="w-full h-full" 
              places={filteredPlaces}
              onMarkerClick={(id) => setSelectedPlace(places.find(p => p.id === id) || null)} 
            />
          </div>
          <div className="w-full lg:w-1/3 h-full overflow-y-auto pr-2 space-y-4">
            <h3 className="font-bold text-lg text-gray-900 mb-4 sticky top-0 bg-[#f8fafc] py-2 z-10">{t('placesOnMap')}</h3>
            {filteredPlaces.map((place) => (
              <PlaceCard 
                key={place.id} 
                place={place} 
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        </div>
      )}

      <PlaceDetailsPanel place={selectedPlace} onClose={() => setSelectedPlace(null)} />
    </div>
  );
}
