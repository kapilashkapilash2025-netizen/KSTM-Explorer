import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SectionHeader from '@/components/common/SectionHeader';

describe('SectionHeader', () => {
  it('renders title, subtitle, and action', () => {
    render(
      <SectionHeader
        title="DISCOVER PLACES"
        subtitle="EXPLORE SRI LANKA"
        action={<button>VIEW ALL</button>}
      />
    );

    expect(screen.getByText('DISCOVER PLACES')).toBeInTheDocument();
    expect(screen.getByText('EXPLORE SRI LANKA')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'VIEW ALL' })).toBeInTheDocument();
  });
});
