import mapboxToken from '../../tokens/mapboxToken';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityLocationSuggestion = ({ onSuggestionSelect  }) => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const inputAddress = event.target.value;
    setAddress(inputAddress);

    // Call Mapbox Geocoding API for auto-suggestions
    if (inputAddress.trim() !== '') {
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
      const filteredSuggestions = response.data.features.filter(
        (feature) =>
        ['province', 'state', 'district', 'place', 'address', 'locality'].includes(
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
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder="Activity Address"
      />
      <br />

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
