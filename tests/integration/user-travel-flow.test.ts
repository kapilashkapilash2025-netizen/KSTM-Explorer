import { describe, expect, it } from 'vitest';
import { filterPlaces } from '@/lib/placeFilters';
import { places } from '@/data/places';
import { generateTripPlan } from '@/lib/tripEngine';

describe('integration: user travel flow', () => {
  it('search -> filter -> generate itinerary flow works', () => {
    const searched = filterPlaces(places, 'Kandy', 'Central Province', 'All');
    expect(searched.length).toBeGreaterThan(0);

    const plan = generateTripPlan({
      startLocation: 'Colombo',
      destination: 'Kandy',
      tripType: 'Round-trip',
      province: 'Central Province',
      days: 3,
      interests: ['Nature'],
      budget: 'Medium',
    });

    expect(plan.itinerary.length).toBe(3);
    expect(plan.hotelSuggestions.length).toBeGreaterThan(0);
    expect(plan.bestRoute).toContain('Colombo -> Kandy -> Colombo');
  });
});
