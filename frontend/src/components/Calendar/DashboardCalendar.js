import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday, isSameDay } from 'date-fns';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import {
    CalendarContainer,
    InformationCol,
    CalendarCol,
    DateButton,
    ComponentContainer,
    MonthContainer,
    WeekDaySpan,
    MonthLabel,
    MonthLabelContainer,
    YearButton
} from '../../styles/Calendar-Styles';

import { useAuth } from '../../context/authContext';
import theme from '../../styles/theme';
import { Link } from 'react-router-dom';



const DashboardCalendar = () => {
    // Get current date
    const currentDate = new Date();

    // Get the current year
    const currentYear = currentDate.getFullYear();

    // State to manage selected day and selected date
    const [selectedDate, setSelectedDate] = useState(currentDate);

    // Get the start and end dates of the current month
    const [displayDate, setDisplayDate] = useState(currentDate);

    // Get user ItineraryData
    const [itineraries, setItineraries] = useState([]);
    const { currentUser } = useAuth();

    const [selectedItinerary, setSelectedItinerary] = useState([null]);


    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/itineraries/${currentUser.uid}`);
                setItineraries(response.data);
            } catch (error) {
                console.error('Error fetching itineraries:', error);
            }
        };

        fetchItineraries();
    }, []);

    // Get the start and end dates of the calendar
    const startDate = startOfMonth(displayDate);
    const endDate = endOfMonth(displayDate);
    const startCalendar = startOfWeek(startDate);
    const endCalendar = endOfWeek(endDate);

    // Generate calendar weeks
    const calendarWeeks = [];
    let currentDatePointer = startCalendar;
    while (currentDatePointer <= endCalendar) {
        const currentWeek = [];
        for (let i = 0; i < 7; i++) {
            currentWeek.push(currentDatePointer);
            currentDatePointer = addDays(currentDatePointer, 1);
        }
        calendarWeeks.push(currentWeek);
    }

    // Handle day click
    const handleDayClick = (day) => {
        setSelectedDate(day); // Update the selected date


        // Find the itinerary for the clicked day
        const clickedItinerary = itineraries.find(itinerary => {
            const itineraryStartDate = new Date(itinerary.startDate);
            itineraryStartDate.setDate(itineraryStartDate.getDate() - 1); // Set startDate to one day before
            const itineraryEndDate = new Date(itinerary.endDate);

            return day >= itineraryStartDate && day <= itineraryEndDate;
        });

        // Set the selected itinerary
        setSelectedItinerary(clickedItinerary);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' }); // Get short month name (e.g., "Jan")
        const day = date.getDate(); // Get day of the month
        return `${month} ${day}`;
    };

    // Render calendar days as buttons
    const renderCalendarWeeks = () => {
        return calendarWeeks.map((week, index) => (
            <div key={index} style={{ display: 'flex' }}>
                {week.map(day => {
                    const isWithinRange = itineraries.some(itinerary => {
                        const itineraryStartDate = new Date(itinerary.startDate);
                        itineraryStartDate.setDate(itineraryStartDate.getDate() - 1); // Set startDate to one day before
                        const itineraryEndDate = new Date(itinerary.endDate);
                        return day >= itineraryStartDate && day <= itineraryEndDate;
                    });
                    return (
                        <DateButton
                            key={day.getTime()}
                            style={{
                                backgroundColor: isSameMonth(day, displayDate) ? (isToday(day) ? '#F48989' : (isSameDay(day, selectedDate) ? '#F7F79C ' : (isWithinRange ? 'pink' : '#fff'))) : 'white', // Change background color if it's today or the selected day & hide day if its not in the month
                                color: isSameMonth(day, displayDate) ?
                                    (isSameDay(day, currentDate) ? '#fff' : (isWithinRange ? theme.colors.white : 'inherit')) :
                                    'white' // Change text color to white if it's the current day and in the same month, otherwise inherit
                            }}
                            onClick={() => handleDayClick(day)}
                        >
                            {format(day, 'd')}
                        </DateButton>
                    );
                })}
            </div>
        ));
    };

    // Render month buttons
    const renderMonthButtons = () => {
        const months = [];
        for (let i = 0; i < 12; i++) {
            const monthDate = new Date(currentYear, i, 1);
            months.push(
                <MonthLabel
                    key={i}
                    onClick={() => setDisplayDate(startOfMonth(monthDate))}
                    style={{
                        fontWeight: isSameMonth(monthDate, displayDate) ? 'bold' : 'normal',
                        color: isSameMonth(monthDate, displayDate) ? 'black' : 'gray',

                    }}
                >
                    {format(monthDate, 'MMM').toUpperCase()}
                </MonthLabel>
            );
        }
        return months;
    };

    // Function to render the weekday labels
    const renderWeekdayLabels = () => {
        // Get the start of the week (default is Sunday)
        const startOfWeekDate = startOfWeek(new Date());

        // Generate an array of weekday labels starting from Monday
        const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
            const currentDate = addDays(startOfWeekDate, i);
            return format(currentDate, 'EEE').toUpperCase(); // Format the date to get the weekday label (e.g., MON, TUE, etc.)
        });

        // Render the weekday labels
        return (
            <>
                {weekdayLabels.map(label => (
                    <WeekDaySpan key={label}>{label}</WeekDaySpan>
                ))}
            </>
        );
    };

    //


    const itineraryInformation = () => {



        if (selectedItinerary) {

            return (
                <div>
                    <Link to={`/Itinerary/${selectedItinerary.id}`} style={{ textDecoration: 'none', color: 'black', background: 'white', padding: 3 }}>Open Itinerary</Link>
                    <br/><br/>
                    <p>{selectedItinerary.tripName}</p>
                    <p>{selectedItinerary.location}</p>
                    <p>Date: {formatDate(selectedItinerary.startDate)} - {formatDate(selectedItinerary.endDate)}</p>

                </div>
            );
        } else {
            return <p>No itinerary selected</p>;
        }
    };

    return (
        <>

            <h1 style={{ margin: '5%' }}>Shedule Overview</h1>

            <ComponentContainer>
                <CalendarContainer>
                    <InformationCol xs={4}>
                        <Row>                        <h4>
                            {format(selectedDate, 'EEEE')}
                            <br />
                            {format(selectedDate, 'MMMM do')}
                            <hr />
                        </h4></Row>
                        <Row>
                            {itineraryInformation()}
                        </Row>


                    </InformationCol>

                    <CalendarCol xs={8}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <YearButton>
                                {format(startDate, 'yyyy')}
                            </YearButton>
                        </div>

                        <MonthLabelContainer>
                            {renderMonthButtons()}
                        </MonthLabelContainer>

                        <MonthContainer>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {renderWeekdayLabels()}
                            </div>
                            <div>
                                {renderCalendarWeeks()}
                            </div>
                        </MonthContainer>
                    </CalendarCol>
                </CalendarContainer>
            </ComponentContainer>

        </>
    );
};

export default DashboardCalendar;
