'use client';

import React, { useState } from 'react';
import { hotels } from '@/data/hotels';
import { provinces } from '@/data/provinces';
import HotelCard from '@/components/hotels/HotelCard';
import SectionHeader from '@/components/common/SectionHeader';
import SriLankaMap from '@/components/places/SriLankaMap';
import { Search, Filter, Grid, Map as MapIcon, Star, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HotelsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedStarRatings, setSelectedStarRatings] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const handleStarToggle = (star: number) => {
    if (selectedStarRatings.includes(star)) {
      setSelectedStarRatings(selectedStarRatings.filter(s => s !== star));
    } else {
      setSelectedStarRatings([...selectedStarRatings, star]);
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hotel.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = selectedProvince === 'All' || hotel.province === selectedProvince;
    const matchesStars = selectedStarRatings.length === 0 || selectedStarRatings.includes(hotel.starRating);
    
    return matchesSearch && matchesProvince && matchesStars;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <SectionHeader 
        title={t('hotels')} 
        subtitle="Find the perfect stay for your Sri Lankan adventure." 
      />

      <div className="flex flex-col xl:flex-row gap-6 mb-8">
        {/* Filters Sidebar */}
        <div className="w-full xl:w-72 shrink-0 space-y-6 bg-card p-6 rounded-2xl shadow-sm border border-border h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </h3>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedProvince('All');
                setSelectedStarRatings([]);
              }}
              className="text-xs font-semibold text-primary hover:opacity-80"
            >
              Clear All
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Search Hotels</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Hotel name or city..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
            <select 
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-3 py-2.5 bg-muted border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Provinces</option>
              {provinces.map(prov => (
                <option key={prov.id} value={prov.name}>{prov.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Star Rating</label>
            <div className="space-y-2.5">
              {[5, 4, 3, 2, 1].map((star) => (
                <label key={star} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    selectedStarRatings.includes(star) 
                      ? 'bg-primary border-primary' 
                      : 'border-border bg-card group-hover:border-primary/50'
                  }`}>
                    {selectedStarRatings.includes(star) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={selectedStarRatings.includes(star)}
                    onChange={() => handleStarToggle(star)}
                  />
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    {Array(star).fill(0).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-1">{star} Stars</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600 font-medium">
              Found <span className="font-bold text-gray-900">{filteredHotels.length}</span> hotels
            </div>
            
            <div className="flex bg-white border border-gray-200 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid className="w-4 h-4" /> List View
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <MapIcon className="w-4 h-4" /> Map View
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            filteredHotels.length > 0 ? (
              <div className="flex flex-col gap-5">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-500">Try adjusting your filters to find what you&apos;re looking for.</p>
              </div>
            )
          ) : (
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[600px] xl:h-auto min-h-[600px] flex flex-col">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-800">Hotels Map</h3>
                <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200 shadow-sm text-gray-600 font-medium">Interactive mode coming soon</span>
              </div>
              <div className="flex-1 p-4">
                 <SriLankaMap className="w-full h-full" places={filteredHotels} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
