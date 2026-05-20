import { describe, expect, it } from 'vitest';
import { generateTripPlan } from '@/lib/tripEngine';

describe('ai assistant summary fallback module', () => {
  it('returns deterministic summary text without external AI dependency', () => {
    const plan = generateTripPlan({
      startLocation: 'Colombo',
      destination: 'Galle',
      tripType: 'One-way',
      province: 'Southern Province',
      days: 2,
      interests: [],
      budget: 'Low',
    });

    expect(plan.aiAssistantSummary).toContain('2-day');
    expect(plan.aiAssistantSummary.toLowerCase()).toContain('budget optimization');
  });
});
