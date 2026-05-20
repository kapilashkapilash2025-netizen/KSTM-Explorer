import { Place, PlaceCategory } from './types';

export function filterPlaces(
  allPlaces: Place[],
  searchTerm: string,
  selectedProvince: string,
  selectedCategory: PlaceCategory | 'All'
): Place[] {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return allPlaces.filter((place) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      place.name.toLowerCase().includes(normalizedSearch) ||
      place.district.toLowerCase().includes(normalizedSearch);
    const matchesProvince = selectedProvince === 'All' || place.province === selectedProvince;
    const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;

    return matchesSearch && matchesProvince && matchesCategory;
  });
}

export function sortPlaces(places: Place[], sortBy: 'rating' | 'name'): Place[] {
  const copy = [...places];
  if (sortBy === 'rating') return copy.sort((a, b) => b.rating - a.rating);
  return copy.sort((a, b) => a.name.localeCompare(b.name));
}
