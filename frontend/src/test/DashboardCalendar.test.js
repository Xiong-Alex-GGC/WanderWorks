import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import  AuthProvider  from '../context/authContext'; // Import the AuthProvider correctly
import  useAuth  from '../context/authContext';
import DashboardCalendar from '../components/Calendar/DashboardCalendar'; // Assuming this is the path to your component


// Write a test suite that describes the DashboardCalendar component
describe('DashboardCalendar component', () => {

  // Write a test case that checks if the component renders the current month and year
  test('renders the current month and year', () => {
    // Render the component and get the container element
    const { container } = render(<DashboardCalendar />);
    // Find the month label element by its text content
    const monthLabel = container.querySelector('.month-label');
    // Get the current date
    const currentDate = new Date();
    // Format the current month and year as a string
    const currentMonthYear = format(currentDate, 'MMMM yyyy');
    // Expect the month label element to have the current month and year as its text content
    expect(monthLabel).toHaveTextContent(currentMonthYear);
  });

  // Write a test case that checks if the component changes the month and year when the user clicks the previous or next buttons
  test('changes the month and year when the user clicks the previous or next buttons', () => {
    // Render the component
    render(<DashboardCalendar />);
    // Find the previous and next buttons by their labels
    const prevButton = screen.getByLabelText('Previous Month');
    const nextButton = screen.getByLabelText('Next Month');
    // Find the month label element by its text content
    const monthLabel = screen.getByText(/^\w+ \d{4}$/);
    // Get the current date
    const currentDate = new Date();
    // Format the previous and next months and years as strings
    const prevMonthYear = format(addMonths(currentDate, -1), 'MMMM yyyy');
    const nextMonthYear = format(addMonths(currentDate, 1), 'MMMM yyyy');
    // Click the previous button
    fireEvent.click(prevButton);
    // Expect the month label element to have the previous month and year as its text content
    expect(monthLabel).toHaveTextContent(prevMonthYear);
    // Click the next button twice
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    // Expect the month label element to have the next month and year as its text content
    expect(monthLabel).toHaveTextContent(nextMonthYear);
  });

  // Write more test cases as needed
});
