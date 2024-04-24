import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday, isSameDay } from 'date-fns';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';

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


const ItineraryCalendar = ({onSelectDay}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const currentYear = currentDate.getFullYear();
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [displayDate, setDisplayDate] = useState(currentDate);
    const [itineraries, setItineraries] = useState([]);
    const { currentUser } = useAuth();
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [mode, setMode] = useState('week');

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

    const startDate = startOfMonth(displayDate);
    const endDate = endOfMonth(displayDate);
    const startCalendar = startOfWeek(startDate);
    const endCalendar = endOfWeek(endDate);

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



    const handleDayClick = (day) => {
        setSelectedDate(day);
        onSelectDay(day);

        const clickedItinerary = itineraries.find(itinerary => {
            const itineraryStartDate = new Date(itinerary.startDate);
            itineraryStartDate.setDate(itineraryStartDate.getDate() - 1);
            const itineraryEndDate = new Date(itinerary.endDate);

            return day >= itineraryStartDate && day <= itineraryEndDate;
        });

        setSelectedItinerary(clickedItinerary);
    };

    const renderCalendarWeeks = () => {
        return calendarWeeks.map((week, index) => (
            <div key={index} style={{ display: 'flex' }}>
                {week.map(day => {
                    const isWithinRange = itineraries.some(itinerary => {
                        const itineraryStartDate = new Date(itinerary.startDate);
                        itineraryStartDate.setDate(itineraryStartDate.getDate() - 1);
                        const itineraryEndDate = new Date(itinerary.endDate);
                        return day >= itineraryStartDate && day <= itineraryEndDate;
                    });
                    return (
                        <DateButton
                            key={day.getTime()}
                            style={{
                                backgroundColor: isSameMonth(day, displayDate) ? (isToday(day) ? '#F48989' : (isSameDay(day, selectedDate) ? '#F7F79C ' : (isWithinRange ? 'pink' : '#fff'))) : 'white',
                                color: isSameMonth(day, displayDate) ?
                                    (isSameDay(day, currentDate) ? '#fff' : (isWithinRange ? theme.colors.white : 'inherit')) :
                                    'white'
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

    const renderCalendarWeek = () => {
        // Find the index of the current week
        const currentWeekIndex = calendarWeeks.findIndex((week) =>
            week.some((day) => isSameDay(day, currentDate))
        );

        // Function to handle navigating to the next week
        const handleNextWeek = () => {
            if (currentWeekIndex < calendarWeeks.length - 1) {
                // Navigate to the next week
                setCurrentDate(calendarWeeks[currentWeekIndex + 1][0]);
            }
        };

        // Function to handle navigating to the previous week
        const handlePreviousWeek = () => {
            if (currentWeekIndex > 0) {
                // Navigate to the previous week
                setCurrentDate(calendarWeeks[currentWeekIndex - 1][0]);
            }
        };

        // If the current week is found, render only that week
        if (currentWeekIndex !== -1) {
            const currentWeek = calendarWeeks[currentWeekIndex];
            return (
                <div>
                    <div key={currentWeekIndex} style={{ display: 'flex' }}>
                        {currentWeek.map((day) => {
                            const isWithinRange = itineraries.some((itinerary) => {
                                const itineraryStartDate = new Date(itinerary.startDate);
                                itineraryStartDate.setDate(itineraryStartDate.getDate() - 1);
                                const itineraryEndDate = new Date(itinerary.endDate);
                                return day >= itineraryStartDate && day <= itineraryEndDate;
                            });
                            return (
                                <DateButton
                                    key={day.getTime()}
                                    style={{
                                        backgroundColor: isToday(day) ? '#F48989' : isSameDay(day, selectedDate) ? '#F7F79C ' : 'inherit',
                                        color: isToday(day) ? 'white' : 'black',
                                    }}
                                    onClick={() => handleDayClick(day)}
                                >
                                    {format(day, 'd')}
                                </DateButton>
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex' }}>
                        {currentWeekIndex > 0 && (
                            <div>
                                <button onClick={handlePreviousWeek}>Previous Week</button>
                            </div>
                        )}
                        {currentWeekIndex < calendarWeeks.length - 1 && (
                            <div style={{ marginLeft: 'auto' }}>
                                <button onClick={handleNextWeek}>Next Week</button>
                            </div>
                        )}
                    </div>

                </div>
            );
        }
        // If the current week is not found, return null or any fallback content
        return null;
    };

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

    const renderWeekdayLabels = () => {
        const startOfWeekDate = startOfWeek(new Date());
        const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
            const currentDate = addDays(startOfWeekDate, i);
            return format(currentDate, 'EEE').toUpperCase();
        });

        return (
            <>
                {weekdayLabels.map(label => (
                    <WeekDaySpan key={label}>{label}</WeekDaySpan>
                ))}
            </>
        );
    };

    const toggleMode = () => {
        setMode(mode === 'full' ? 'week' : 'full'); // Toggle between 'full' and 'week' mode
    };

    return (
        <>
            {mode === 'full' && (
                <div>
                    <MonthLabelContainer>
                        {renderMonthButtons()}
                    </MonthLabelContainer>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {renderWeekdayLabels()}
                        </div>
                        <div>
                            {renderCalendarWeeks()}
                        </div>
                    </div>
                </div>
            )}
            {mode !== 'full' && (
                <>
                    <MonthLabelContainer>
                        {renderMonthButtons()}
                    </MonthLabelContainer>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {renderWeekdayLabels()}
                    </div>
                    <div>
                        {renderCalendarWeek()}
                    </div>
                </>
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={toggleMode} style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', outline: 'none', marginLeft: 'auto' }}>
                    {mode === 'full' ? 'Week View ' : 'Month View '}
                    <BsChevronDown />
                </button>
            </div>
        </>
    );
};

export default ItineraryCalendar;
