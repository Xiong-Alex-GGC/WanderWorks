import mapboxToken from "../../tokens/mapboxToken";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

const ActivityLocationSuggestion = ({ onSuggestionSelect, onCoordsSelect }) => {
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState(null); 

  const handleInputChange = (event) => {
    const inputAddress = event.target.value;
    setAddress(inputAddress);

    // Call Mapbox Geocoding API for auto-suggestions
    if (inputAddress.trim() !== "") {
      fetchSuggestions(inputAddress);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          input
        )}.json?access_token=` + mapboxToken
      );

      // Extract suggestions from the response with specified place types
      const filteredSuggestions = response.data.features.filter((feature) =>
        [
          "province",
          "state",
          "district",
          "place",
          "address",
          "locality",
        ].includes(feature.place_type[0])
      );

      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion, coordinates) => {
    onSuggestionSelect(suggestion);
    onCoordsSelect(coordinates);
    setAddress(suggestion);
    setCoords(coordinates); // Set coordinates
    setSuggestions([]);
    setShowDropdown(false);
  };

  const handleInputBlur = () => {
    // Delay the execution of onBlur to allow time for onClick to be triggered
    const timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // Adjust the timeout duration as needed

    setBlurTimeout(timeoutId);
  };

  const handleInputFocus = () => {
    // Clear the blur timeout if input is focused before it expires
    if (blurTimeout) {
      clearTimeout(blurTimeout);
      setBlurTimeout(null);
    }
  }

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Activity Address"
        value={address}
        onChange={handleInputChange}
        onFocus={handleInputFocus} 
        onBlur={handleInputBlur}
        style={{ width: "207px" }}
        required
      />
      {/* Display suggestions */}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLocationSuggestion;
