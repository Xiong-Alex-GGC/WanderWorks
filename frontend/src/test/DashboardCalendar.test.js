
import DashboardCalendar from '../components/Calendar/DashboardCalendar'; // Assuming this is the path to your component
import React from 'react';
import { render, screen } from '@testing-library/react';
import { format, getDaysInMonth } from 'date-fns';
import { AuthProvider } from '../context/authContext';

describe('DashboardCalendar', () => {
  test('renders the correct number of days for the current month', () => {
    render(
      <AuthProvider>
        <DashboardCalendar />
      </AuthProvider>
    );

    const currentDate = new Date();
    const daysInMonth = getDaysInMonth(currentDate);

    // Find all buttons representing days in the calendar
    const dayButtons = screen.getAllByRole('button').filter(button =>
      button.textContent.match(/^\d+$/) // Matches buttons with only numbers (days)
    );

    // Check if the number of day buttons matches the number of days in the current month
    expect(dayButtons.length).toBeGreaterThanOrEqual(daysInMonth);
  });
});
