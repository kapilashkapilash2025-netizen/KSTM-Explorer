'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Hotel, Place } from '@/lib/types';

const MapInner = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted rounded-3xl flex items-center justify-center border-4 border-border shadow-2xl">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-muted-foreground">Loading Interactive Map...</p>
      </div>
    </div>
  ),
});

interface SriLankaMapProps {
  className?: string;
  onMarkerClick?: (placeId: string) => void;
  places?: Array<Place | Hotel>;
}

export default function SriLankaMap({ className = '', onMarkerClick, places = [] }: SriLankaMapProps) {
  return (
    <div className={`rounded-3xl relative overflow-hidden h-full min-h-[400px] border-4 border-border shadow-2xl ${className}`}>
      <MapInner onMarkerClick={onMarkerClick} places={places} />
      
      {/* Legend */}
      <div className="absolute right-6 bottom-6 bg-card/80 backdrop-blur-md p-3 rounded-2xl border border-border z-[1000] hidden sm:block shadow-xl">
        <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground opacity-60 mb-2">Categories</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {[
            { name: 'Nature', color: 'bg-[#22c55e]' },
            { name: 'Beach', color: 'bg-[#3b82f6]' },
            { name: 'Culture', color: 'bg-[#f59e0b]' },
            { name: 'Wildlife', color: 'bg-[#8b5cf6]' },
            { name: 'Adventure', color: 'bg-[#ec4899]' },
            { name: 'Religious', color: 'bg-[#10b981]' },
          ].map((cat) => (
            <div key={cat.name} className="flex items-center gap-2 text-[10px] font-bold text-foreground">
              <div className={`w-2 h-2 ${cat.color} rounded-full`}></div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
