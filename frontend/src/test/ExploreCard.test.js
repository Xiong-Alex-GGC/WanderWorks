 import React from 'react';
 import { render } from '@testing-library/react';
 import ExploreCard from '../components/Cards/ExploreCard';
 import axios from 'axios';
import { MemoryRouter } from 'react-router-dom'

describe('ExploreCard', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ExploreCard
          id="1"
          tripName="Trip Name"
          startDate="2022-03-01"
          endDate="2022-03-10"
          imgURL="https://example.com/image.jpg"
        />
      </MemoryRouter>
    );
  });
});

