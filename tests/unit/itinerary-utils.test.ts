import { describe, expect, it, vi } from 'vitest';
import { generateTripPlan } from '@/lib/tripEngine';

describe('trip engine', () => {
  it('builds consistent round-trip plan with budget totals', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1710000000000);

    const plan = generateTripPlan({
      startLocation: 'Colombo',
      destination: 'Kandy',
      tripType: 'Round-trip',
      province: 'Central Province',
      days: 3,
      interests: ['Nature', 'Culture'],
      budget: 'Medium',
    });

    expect(plan.id).toBe('trip-1710000000000');
    expect(plan.bestRoute).toContain('Colombo -> Kandy -> Colombo');
    expect(plan.itinerary).toHaveLength(3);
    expect(plan.travelTimings).toHaveLength(3);
    expect(plan.foodBreakTimings).toHaveLength(3);
    expect(plan.estimatedBudgetLkr.total).toBe(
      plan.estimatedBudgetLkr.transport +
      plan.estimatedBudgetLkr.hotel +
      plan.estimatedBudgetLkr.food +
      plan.estimatedBudgetLkr.activities
    );
  });
});
