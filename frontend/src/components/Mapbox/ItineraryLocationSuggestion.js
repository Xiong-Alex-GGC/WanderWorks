import mapboxToken from '../../tokens/mapboxToken';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Dropdown } from 'react-bootstrap';

const ItineraryLocationSuggestion = ({ addressSelect, coordsSelect }) => {
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState(null); // Changed to null instead of empty string

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState(null); 

  const handleInputChange = (event) => {
    const inputAddress = event.target.value;
    setAddress(inputAddress);

    // Call Mapbox Geocoding API for auto-suggestions
    if (inputAddress.trim() !== '') {
      fetchSuggestions(inputAddress);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          input
        )}.json?access_token=` + mapboxToken
      );

      // Extract suggestions and coordinates from the response
      const suggestionsList = response.data.features.map((feature) => {
        return {
          suggestion: feature.place_name,
          coordinates: feature.center
        };
      });

      setSuggestions(suggestionsList);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion, coordinates) => {
    addressSelect(suggestion);
    coordsSelect(coordinates)

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
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Trip Location:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the Address"
          value={address}
          onChange={handleInputChange}
          onFocus={handleInputFocus} 
          onBlur={handleInputBlur}
          required
        />
      </Form.Group>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <Dropdown show>
          <Dropdown.Menu>
            {suggestions.map((suggestionObj, index) => (
              <Dropdown.Item key={index} onClick={() => handleSuggestionClick(suggestionObj.suggestion, suggestionObj.coordinates)}>
                {suggestionObj.suggestion}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default ItineraryLocationSuggestion;
