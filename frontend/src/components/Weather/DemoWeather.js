import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherComponent = (itineraryData) => {
  const [weatherData, setWeatherData] = useState(null);
  console.log(itineraryData);
  const LAT = itineraryData.itineraryData.coords[1];
  const LNG = itineraryData.itineraryData.coords[0];
  console.log(LAT);
  console.log(LNG);

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

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Weather in {itineraryData.itineraryData.location}</h2>
          <p>Temperature: {weatherData.hourly.temperature_2m[0]}°C</p>
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
