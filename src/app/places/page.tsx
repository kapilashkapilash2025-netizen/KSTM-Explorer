'use client';

import React, { useState } from 'react';
import { places } from '@/data/places';
import { provinces } from '@/data/provinces';
import { Place, PlaceCategory } from '@/lib/types';
import PlaceCard from '@/components/places/PlaceCard';
import PlaceDetailsPanel from '@/components/places/PlaceDetailsPanel';
import SectionHeader from '@/components/common/SectionHeader';
import SriLankaMap from '@/components/places/SriLankaMap';
import { Search, Filter, Grid, Map as MapIcon } from 'lucide-react';
import { filterPlaces, sortPlaces } from '@/lib/placeFilters';

const categories: (PlaceCategory | 'All')[] = [
  'All', 'Nature', 'Beach', 'Culture', 'Wildlife', 'Adventure', 'Religious', 'City'
];

export default function PlacesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredPlaces = sortPlaces(
    filterPlaces(places, searchTerm, selectedProvince, selectedCategory),
    sortBy
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <SectionHeader 
        title="Discover Places" 
        subtitle="Explore the most beautiful destinations across Sri Lanka." 
      />

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row gap-4">
        
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or district..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          <select 
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[160px]"
          >
            <option value="All">All Provinces</option>
            {provinces.map(prov => (
              <option key={prov.id} value={prov.name}>{prov.name}</option>
            ))}
          </select>

          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as PlaceCategory | 'All')}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[140px]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rating' | 'name')}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[140px]"
          >
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl shrink-0">
          <button 
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Grid className="w-4 h-4" /> Grid
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <MapIcon className="w-4 h-4" /> Map
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 font-medium">
        <Filter className="w-4 h-4" />
        Showing {filteredPlaces.length} places
      </div>

      {/* Content Area */}
      {viewMode === 'grid' ? (
        filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard 
                key={place.id} 
                place={place} 
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No places found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you&apos;re looking for.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedProvince('All');
                setSelectedCategory('All');
              }}
              className="mt-6 text-primary-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 h-[700px]">
          <div className="flex-1 min-h-[400px]">
            <SriLankaMap 
              className="w-full h-full" 
              places={filteredPlaces}
              onMarkerClick={(id) => setSelectedPlace(places.find(p => p.id === id) || null)} 
            />
          </div>
          <div className="w-full lg:w-80 h-full overflow-y-auto space-y-4 pr-2">
            <h3 className="font-bold text-gray-900 mb-4 sticky top-0 bg-[#f8fafc] py-2 z-10 flex items-center justify-between">
              <span>Map Locations</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{filteredPlaces.length}</span>
            </h3>
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
