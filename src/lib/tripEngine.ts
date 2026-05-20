import { Place, SmartTripPlan, PlaceCategory, BudgetType, TripType, Hotel } from './types';
import { places } from '@/data/places';
import { hotels } from '@/data/hotels';

interface GenerateTripParams {
  startLocation: string;
  destination: string;
  tripType: TripType;
  province: string;
  days: number;
  interests: PlaceCategory[];
  budget: BudgetType;
}

const budgetMultipliers: Record<BudgetType, number> = {
  Low: 0.75,
  Medium: 1,
  Luxury: 1.85,
};

const dailyBaseCost = {
  transport: 7000,
  hotel: 12000,
  food: 5000,
  activities: 4500,
};

function pickHotelsForProvince(province: string, budget: BudgetType): Hotel[] {
  const inProvince = hotels.filter((h) => province === 'All' || h.province === province);
  const sorted = [...inProvince].sort((a, b) => b.rating - a.rating);

  if (budget === 'Low') return sorted.filter((h) => h.starRating <= 4).slice(0, 3);
  if (budget === 'Luxury') return sorted.filter((h) => h.starRating >= 5).slice(0, 3);
  return sorted.slice(0, 3);
}

function buildTimings(days: number, tripType: TripType): { travel: string[]; breaks: string[] } {
  const travel = Array.from({ length: days }, (_, i) =>
    `Day ${i + 1}: 08:30 AM departure, main transfer 11:00 AM, local commute 03:30 PM${
      tripType === 'Round-trip' && i === days - 1 ? ', return transfer 06:00 PM' : ''
    }`
  );

  const breaks = Array.from({ length: days }, (_, i) =>
    `Day ${i + 1}: Breakfast 07:30 AM, Lunch 01:00 PM, Tea break 04:30 PM, Dinner 08:00 PM`
  );

  return { travel, breaks };
}

export function generateTripPlan({
  startLocation,
  destination,
  tripType,
  province,
  days,
  interests,
  budget,
}: GenerateTripParams): SmartTripPlan {
  let availablePlaces = places.filter((p) => p.province === province || province === 'All');

  if (interests.length > 0) {
    availablePlaces = availablePlaces.sort((a, b) => {
      const aMatches = interests.includes(a.category) ? 1 : 0;
      const bMatches = interests.includes(b.category) ? 1 : 0;
      return bMatches - aMatches;
    });
  }

  const itinerary = [];
  const placesPerDay = Math.max(2, Math.min(4, Math.floor(availablePlaces.length / Math.max(days, 1))));
  let currentPlaceIndex = 0;

  for (let i = 1; i <= days; i++) {
    const dayPlaces: Place[] = [];

    for (let j = 0; j < placesPerDay; j++) {
      if (currentPlaceIndex < availablePlaces.length) {
        dayPlaces.push(availablePlaces[currentPlaceIndex]);
        currentPlaceIndex++;
      }
    }

    itinerary.push({
      day: i,
      places: dayPlaces,
      description:
        dayPlaces.length > 0
          ? `Visit ${dayPlaces.map((p) => p.name).join(', ')} with optimized local transfers and flexible photo/rest stops.`
          : 'Leisure buffer day for rest, local market walk, and optional attraction add-ons.',
    });
  }

  const m = budgetMultipliers[budget];
  const transport = Math.round(dailyBaseCost.transport * days * m);
  const hotel = Math.round(dailyBaseCost.hotel * days * m);
  const food = Math.round(dailyBaseCost.food * days * m);
  const activities = Math.round(dailyBaseCost.activities * days * m);
  const total = transport + hotel + food + activities;

  const hotelSuggestions = pickHotelsForProvince(province, budget);
  const nearbyTouristAttractions = availablePlaces.slice(0, 8);
  const timings = buildTimings(days, tripType);

  return {
    id: `trip-${Date.now()}`,
    title: `${days}-Day ${destination} Smart Trip`,
    province,
    days,
    interests,
    budget,
    itinerary,
    startLocation,
    destination,
    tripType,
    bestRoute: `${startLocation} -> ${destination}${tripType === 'Round-trip' ? ` -> ${startLocation}` : ''}`,
    travelTimings: timings.travel,
    foodBreakTimings: timings.breaks,
    hotelSuggestions,
    estimatedBudgetLkr: {
      transport,
      hotel,
      food,
      activities,
      total,
    },
    nearbyTouristAttractions,
    aiAssistantSummary:
      `Planned a ${days}-day ${tripType.toLowerCase()} itinerary from ${startLocation} to ${destination} ` +
      `with ${budget.toLowerCase()} budget optimization, balanced sightseeing blocks, and hotel/meal timing recommendations.`,
  };
}
