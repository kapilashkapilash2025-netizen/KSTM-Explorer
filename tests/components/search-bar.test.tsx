import { describe, expect, it } from 'vitest';
import { filterPlaces } from '@/lib/placeFilters';
import { places } from '@/data/places';

describe('search behavior contract', () => {
  it('returns hits for known keyword', () => {
    const result = filterPlaces(places, 'Kandy', 'All', 'All');
    expect(result.length).toBeGreaterThan(0);
  });
});
