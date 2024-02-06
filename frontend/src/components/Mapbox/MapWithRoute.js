import React, { useEffect, useRef } from 'react';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import mapboxToken from '../../tokens/mapboxToken';
import mapboxgl from 'mapbox-gl';

const MapWithRoute = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Your Mapbox access token
    const mapboxAccessToken = mapboxToken;

    // Create a Mapbox map
    mapboxgl.accessToken = mapboxAccessToken; // <-- Initialize mapboxgl with the access token

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1,
    });

    // Add Mapbox Directions control
    const directions = new MapboxDirections({
      accessToken: mapboxAccessToken,
      unit: 'metric',
      profile: 'mapbox/driving-traffic',
    });

    map.addControl(directions, 'top-left');
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '30vh' }} />
    </div>
  );
};

export default MapWithRoute;
