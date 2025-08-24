import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Route from '../route';

const mockRoute = [
  {
    id: 1,
    departure: { scheduled: '2024-01-15T10:00:00Z', estimated: '2024-01-15T10:00:00Z' },
    arrival: { scheduled: '2024-01-15T10:00:00Z', estimated: '2024-01-15T10:00:00Z' },
    location: {
      name: 'Aberdeen',
      detailed_name: 'Aberdeen Bus Station',
      region_name: 'Aberdeen',
      code: 'ABD'
    },
    allow_boarding: true,
    allow_drop_off: true,
    skipped: false
  },
  {
    id: 2,
    departure: { scheduled: '2024-01-15T10:00:00Z', estimated: '2024-01-15T10:00:00Z' },
    arrival: { scheduled: '2024-01-15T10:00:00Z', estimated: '2024-01-15T10:00:00Z' },
    location: {
      name: 'Aberdeen',
      detailed_name: 'Aberdeen Bus Station',
      region_name: 'Aberdeen',
      code: 'ABD'
    },
    allow_boarding: true,
    allow_drop_off: true,
    skipped: false
  },
  {
    id: 3,
    departure: { scheduled: '2024-01-15T10:00:00Z', estimated: '2024-01-15T10:00:00Z' },
    arrival: { scheduled: '2024-01-15T10:00:00Z', estimated: '2024-01-15T10:00:00Z' },
    location: {
      name: 'Edinburgh',
      detailed_name: 'Edinburgh George Street',
      region_name: 'Aberdeen',
      code: 'ABD'
    },
    allow_boarding: true,
    allow_drop_off: true,
    skipped: false
  }
  // ... more stops
];

describe('Route Component', () => {
  it('renders all stops in the route', () => {
    render(<Route route={mockRoute} />);

    expect(screen.getByText('Aberdeen')).toBeInTheDocument();
    expect(screen.getByText('Edinburgh')).toBeInTheDocument();
  });

  it('shows bus emoji at the last actual departure stop', () => {
    render(<Route route={mockRoute} />);

    // just doing it like this because I've never used emojis like this before!
    const busEmoji = screen.getByText('🚌');
    expect(busEmoji).toBeInTheDocument();
  });
});
