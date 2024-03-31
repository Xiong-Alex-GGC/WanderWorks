import React, { useState, useEffect } from "react";
import axios from "axios";

// Using https://api.open-meteo.com/

const WeatherComponent = (itineraryData) => {
  const [weatherData, setWeatherData] = useState(null);
  console.log(itineraryData);
  const LNG = itineraryData.itineraryData.coords[0];
  const LAT = itineraryData.itineraryData.coords[1];
  console.log(LNG);
  console.log(LAT);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}&hourly=temperature_2m`
        );
        const data = await response.data;
        setWeatherData(data);

        console.log(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []); // Empty dependency array to ensure effect runs only once

  const currentTemperature = () => {
    const date = new Date();
    const currentTime = date.getHours();
    const temperature = weatherData.hourly.temperature_2m[currentTime];
    return `${temperature}`;
  };

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Weather in {itineraryData.itineraryData.location}</h2>
          <p>Temperature: {currentTemperature()}°C</p>
          <p>
            {/* Weather description: {weatherData.current.weather_descriptions[0]} */}
          </p>
          {/* Add more weather data fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
