export type PlaceCategory = 'Nature' | 'Beach' | 'Culture' | 'Wildlife' | 'Adventure' | 'Religious' | 'City';
export type BudgetType = 'Low' | 'Medium' | 'Luxury';
export type TripType = 'One-way' | 'Round-trip';

export interface Place {
  id: string;
  name: string;
  province: string;
  district: string;
  category: PlaceCategory;
  description: string;
  image: string;
  rating: number;
  bestTimeToVisit: string;
  nearbyAttractions: string[];
  tags: string[];
  latitude: number;
  longitude: number;
  weather?: {
    temp: number;
    condition: string;
  };
  nearbyPlaceIds?: string[];
}

export interface Hotel {
  id: string;
  name: string;
  province: string;
  district: string;
  starRating: number;
  description: string;
  image: string;
  rating: number;
  priceRange: string;
  amenities: string[];
  latitude: number;
  longitude: number;
}

export interface TripPlan {
  id: string;
  title: string;
  province: string;
  days: number;
  interests: PlaceCategory[];
  budget: BudgetType;
  itinerary: TripDay[];
}

export interface TripDay {
  day: number;
  places: Place[];
  description: string;
}

export interface SmartTripPlan extends TripPlan {
  startLocation: string;
  destination: string;
  tripType: TripType;
  bestRoute: string;
  travelTimings: string[];
  foodBreakTimings: string[];
  hotelSuggestions: Hotel[];
  estimatedBudgetLkr: {
    transport: number;
    hotel: number;
    food: number;
    activities: number;
    total: number;
  };
  nearbyTouristAttractions: Place[];
  aiAssistantSummary: string;
}

export type EmergencyContactType = 'Hotline' | 'Police' | 'Medical' | 'Specialized';

export interface EmergencyContact {
  id: string;
  title: string;
  description: string;
  phone: string;
  type: EmergencyContactType;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Province {
  id: string;
  name: string;
  shortDescription: string;
  placeCount: number;
  image: string;
}
