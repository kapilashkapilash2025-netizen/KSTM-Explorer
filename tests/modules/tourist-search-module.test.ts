import { describe, expect, it } from 'vitest';
import { filterPlaces, sortPlaces } from '@/lib/placeFilters';
import { places } from '@/data/places';

describe('tourist search module', () => {
  it('filters by province and keeps valid categories', () => {
    const filtered = filterPlaces(places, '', 'Northern Province', 'All');
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((p) => p.province === 'Northern Province')).toBe(true);
  });

  it('sorts filtered results by name', () => {
    const filtered = filterPlaces(places, '', 'Central Province', 'All');
    const sorted = sortPlaces(filtered, 'name');
    expect(sorted[0].name.localeCompare(sorted[sorted.length - 1].name)).toBeLessThanOrEqual(0);
  });
});
