import { describe, expect, it } from 'vitest';
import { provinces } from '@/data/provinces';

describe('province data integrity', () => {
  it('contains all 9 unique Sri Lankan provinces', () => {
    const names = provinces.map((p) => p.name);
    const unique = new Set(names);
    expect(unique.size).toBe(9);

    const required = [
      'Western Province',
      'Central Province',
      'Southern Province',
      'Northern Province',
      'Eastern Province',
      'North Western Province',
      'North Central Province',
      'Uva Province',
      'Sabaragamuwa Province',
    ];

    required.forEach((name) => {
      expect(names).toContain(name);
    });
  });
});
