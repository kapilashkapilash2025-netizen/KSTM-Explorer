import { describe, expect, it } from 'vitest';
import { filterPlaces, sortPlaces } from '@/lib/placeFilters';
import { Place } from '@/lib/types';

const sample: Place[] = [
  {
    id: 'p1', name: 'Galle Fort', province: 'Southern Province', district: 'Galle', category: 'Culture',
    description: 'fort', image: '/galle.jpg', rating: 4.7, bestTimeToVisit: 'AM', nearbyAttractions: [], tags: [], latitude: 6.0, longitude: 80.0,
  },
  {
    id: 'p2', name: 'Kandy Lake', province: 'Central Province', district: 'Kandy', category: 'Nature',
    description: 'lake', image: '/kandy.jpg', rating: 4.4, bestTimeToVisit: 'PM', nearbyAttractions: [], tags: [], latitude: 7.0, longitude: 81.0,
  },
  {
    id: 'p3', name: 'Arugam Bay', province: 'Eastern Province', district: 'Ampara', category: 'Beach',
    description: 'bay', image: '/arugam.jpg', rating: 4.9, bestTimeToVisit: 'AM', nearbyAttractions: [], tags: [], latitude: 6.8, longitude: 81.8,
  },
];

describe('place filters', () => {
  it('filters by search + province + category', () => {
    const result = filterPlaces(sample, 'galle', 'Southern Province', 'Culture');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('p1');
  });

  it('returns all places when all filters are open', () => {
    const result = filterPlaces(sample, '', 'All', 'All');
    expect(result).toHaveLength(3);
  });

  it('sorts by rating desc', () => {
    const result = sortPlaces(sample, 'rating');
    expect(result.map((p) => p.id)).toEqual(['p3', 'p1', 'p2']);
  });

  it('sorts by name asc', () => {
    const result = sortPlaces(sample, 'name');
    expect(result.map((p) => p.name)).toEqual(['Arugam Bay', 'Galle Fort', 'Kandy Lake']);
  });
});
