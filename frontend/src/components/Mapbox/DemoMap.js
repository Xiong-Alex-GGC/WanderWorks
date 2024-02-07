import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { NavigationControl, GeolocateControl } from 'react-map-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import mapboxToken from '../../tokens/mapboxToken';
import mapboxgl from 'mapbox-gl';

import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

const DemoMap = () => {
  const mapRef = useRef(null);

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });

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

    // Add NavigationControl to the map
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add GeolocateControl to the map
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }), 'top-right');

    map.addControl(new mapboxgl.FullscreenControl());




    //Directions
    const directions = new MapboxDirections({
        accessToken: mapboxAccessToken,
        controls: {
          instructions: true,
          inputs: true,
          profileSwitcher: true,
        },
        alternatives: true,
        congestion: true,

        // waypoints: [
        //   { coordinates: [-83.7206, 33.9924], name: 'Home Town' },
        //   { coordinates: [-83.7132, 33.9519], name: 'Bethlehem, GA' },
        // ],
      });
  
    map.addControl(directions, 'top-left');

    map.on('move', () => {
        setViewport({
          latitude: map.getCenter().lat,
          longitude: map.getCenter().lng,
          zoom: map.getZoom(),
        });
      });
  
      return () => {
        map.remove();
      };
    }, [setViewport]); // Add setViewport to the dependency array
  
    return (
      <>
        <div ref={mapRef} style={{ width: '60%', height: '20vh' }} />
      </>
    );
  };
  
  export default DemoMap;
