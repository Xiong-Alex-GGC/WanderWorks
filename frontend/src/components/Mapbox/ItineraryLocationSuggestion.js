import mapboxToken from '../../tokens/mapboxToken';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Dropdown } from 'react-bootstrap';

const ItineraryLocationSuggestion = ({ onSuggestionSelect }) => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState(null); // State to track blur timeout

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

      // Extract suggestions from the response with specified place types
      const filteredSuggestions = response.data.features.filter(
        (feature) =>
          ['country', 'region', 'province', 'state', 'district', 'place'].includes(
            feature.place_type[0]
          )
      );

      const suggestionsList = filteredSuggestions.map((feature) => feature.place_name);
      setSuggestions(suggestionsList);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSuggestionSelect(suggestion);
    setAddress(suggestion);
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
          onFocus={handleInputFocus} // Handle onFocus event
          onBlur={handleInputBlur}
          required
        />
      </Form.Group>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <Dropdown show>
          <Dropdown.Menu>
            {suggestions.map((suggestion, index) => (
              <Dropdown.Item key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default ItineraryLocationSuggestion;
