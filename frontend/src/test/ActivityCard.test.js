import React from 'react';
import { render } from '@testing-library/react';
import ActivityCard from "../components/Cards/ActivityCard"; // Assuming this is the path to your component
import axios from 'axios';

jest.mock('axios');

describe('ActivityCard', () => {
  it('renders activity card correctly', () => {
    const { getByText } = render(
      <ActivityCard
        id="1"
        name="Activity Name"
        date="2024-02-29"
        startTime="10:00 AM"
        endTime="12:00 PM"
        address="123 Main St"
        expense="$50"
        notes="Some notes"
        tags="tag1, tag2"
      />
    );

    expect(getByText('Activity Name')).toBeInTheDocument();
    // Add more assertions for other elements
  });
});

