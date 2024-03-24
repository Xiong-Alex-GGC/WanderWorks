import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import  AuthProvider  from '../context/authContext'
import  useAuth  from '../context/authContext';
import DashboardCalendar from '../components/Calendar/DashboardCalendar'; // Assuming this is the path to your component



describe('DashboardCalendar component', () => {

  
  test('renders the current month and year', () => {

    const { container } = render(<DashboardCalendar />);

    const monthLabel = container.querySelector('.month-label');

    const currentDate = new Date();

    const currentMonthYear = format(currentDate, 'MMMM yyyy');

    expect(monthLabel).toHaveTextContent(currentMonthYear);
  });

  test('changes the month and year when the user clicks the previous or next buttons', () => {

    render(<DashboardCalendar />);

    const prevButton = screen.getByLabelText('Previous Month');
    const nextButton = screen.getByLabelText('Next Month');

    const monthLabel = screen.getByText(/^\w+ \d{4}$/);

    const currentDate = new Date();

    const prevMonthYear = format(addMonths(currentDate, -1), 'MMMM yyyy');
    const nextMonthYear = format(addMonths(currentDate, 1), 'MMMM yyyy');

    fireEvent.click(prevButton);

    expect(monthLabel).toHaveTextContent(prevMonthYear);

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(monthLabel).toHaveTextContent(nextMonthYear);
  });

});
