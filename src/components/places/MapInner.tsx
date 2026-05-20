'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Hotel, Place } from '@/lib/types';
import Image from 'next/image';

// Fix for default marker icons in Next.js
type MapItem = Place | Hotel;

function isHotel(item: MapItem): item is Hotel {
  return 'starRating' in item;
}

const getIcon = (item: MapItem) => {
  let color = '#ef4444'; // default red
  
  if (isHotel(item)) {
    // It's a hotel
    color = '#f59e0b'; // Amber for all hotels
  } else {
    // It's a place
    switch (item.category) {
      case 'Nature': color = '#0096C7'; break;
      case 'Beach': color = '#3b82f6'; break; // blue
      case 'Culture': color = '#f59e0b'; break; // amber
      case 'Wildlife': color = '#8b5cf6'; break; // violet
      case 'Adventure': color = '#ec4899'; break; // pink
      case 'Religious': color = '#10b981'; break; // emerald
      case 'City': color = '#6b7280'; break; // gray
    }
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

interface MapInnerProps {
  onMarkerClick?: (placeId: string) => void;
  places: MapItem[];
}

export default function MapInner({ onMarkerClick, places }: MapInnerProps) {
  const position: [number, number] = [7.8731, 80.7718]; // Center of Sri Lanka

  return (
    <MapContainer 
      center={position} 
      zoom={8} 
      scrollWheelZoom={true}
      className="w-full h-full rounded-3xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => (
        <Marker 
          key={place.id} 
          position={[place.latitude, place.longitude]}
          icon={getIcon(place)}
          eventHandlers={{
            click: () => {
              onMarkerClick?.(place.id);
            },
          }}
        >
          <Popup>
            <div className="p-1">
              <h4 className="font-bold text-sm mb-1">{place.name}</h4>
              <p className="text-xs text-gray-600 mb-2">{isHotel(place) ? 'Hotel' : place.category} • {place.district}</p>
              <Image src={place.image} alt={place.name} width={240} height={96} className="w-full h-24 object-cover rounded mb-2" />
              <button 
                onClick={() => onMarkerClick?.(place.id)}
                className="w-full bg-primary text-white text-[10px] py-1 rounded font-bold"
              >
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
