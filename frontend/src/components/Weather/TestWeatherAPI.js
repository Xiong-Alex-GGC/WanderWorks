import React, { useState, useEffect } from "react";
import axios from "axios";
import weatherToken from "../../tokens/weatherToken";
import { Card, Col, Row } from "react-bootstrap";
import { BiMap } from "react-icons/bi";
import icon from "../../images/cloudy.png";
// Using http://api.weatherapi.com/

const TestWeather = (itineraryData) => {
  const [weatherData, setWeatherData] = useState(null);
  console.log(itineraryData);
  const API_KEY = weatherToken;
  const CITY = itineraryData.itineraryData.location;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}`
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

  const weatherWidget = {
    background: "linear-gradient(to bottom, #FFFFFF, #89D0FF)", // Adjust colors as needed
    width: "400px",
    color: "grey",
    margin: "10px 0 10px 25%",
  };
  return (
    <div>
      {weatherData ? (
        <Card border="info" style={weatherWidget}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              <Row>
                <Col>
                  {" "}
                  <BiMap />
                  {itineraryData.itineraryData.location}
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  {weatherData.current.condition.text}
                </Col>
              </Row>
              <Row>
                <Col className="d-flex align-items-center justify-content-center">
                  {weatherData.current.feelslike_f}°F
                </Col>
                <Col>
                  <Card.Img src={icon} style={{ width: "50px" }}></Card.Img>
                </Col>
              </Row>
            </Card.Title>
            <Card.Text style={{ textAlign: "center" }}>
              <p>Local Time: {weatherData.location.localtime}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestWeather;
