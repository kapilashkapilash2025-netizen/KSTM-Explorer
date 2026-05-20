import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { ComponentProps } from 'react';
import PlaceCard from '@/components/places/PlaceCard';
import { Place } from '@/lib/types';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
}));

const place: Place = {
  id: 'p100',
  name: 'GALLE FORT',
  province: 'Southern Province',
  district: 'Galle',
  category: 'Culture',
  description: 'Historic fort',
  image: '/places/Galle-fort.jpg',
  rating: 4.8,
  bestTimeToVisit: 'Morning',
  nearbyAttractions: [],
  tags: [],
  latitude: 6.026,
  longitude: 80.217,
};

describe('PlaceCard', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
      clear: () => {
        store.clear();
      },
    });
    vi.stubGlobal('open', vi.fn());
  });

  it('renders place data and toggles favourite', () => {
    render(<PlaceCard place={place} />);

    expect(screen.getByText('GALLE FORT')).toBeInTheDocument();
    expect(screen.getByText('Culture')).toBeInTheDocument();

    const favBtn = screen.getAllByRole('button')[0];
    fireEvent.click(favBtn);
    expect(localStorage.getItem('favouritePlaces')).toContain('p100');
  });

  it('opens google direction link', () => {
    render(<PlaceCard place={place} />);
    const directionBtn = screen.getByTitle('Directions');
    fireEvent.click(directionBtn);
    expect(window.open).toHaveBeenCalledTimes(1);
  });
});
