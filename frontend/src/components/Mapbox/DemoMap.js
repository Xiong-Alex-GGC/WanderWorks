import axios from "axios";
import mapboxgl from "mapbox-gl";
import mapboxToken from "../../tokens/mapboxToken";
import { FaCar, FaWalking, FaBicycle, FaPlane, FaTrain } from "react-icons/fa";

import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState, useRef } from "react";

mapboxgl.accessToken = mapboxToken;

const MapComponent = ({ itineraryData, activitiesData, selectedDay }) => {
  const [showRoute, setShowRoute] = useState(true);
  const [view, setView] = useState("overall"); // Default view
  const mapContainer = useRef(null); // Reference to the map container
  const map = useRef(null); // Reference to the Mapbox map instance

  const [filteredActivities, setFilteredActivities] = useState([]); // State to hold filtered activities


  useEffect(() => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [itineraryData.coords[0], itineraryData.coords[1]],
      zoom: 9,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  }, []);

  console.log(activitiesData);

  useEffect(() => {
    //modify this to account for view type & then replace all instances of activitiesData with filteredData
    const filtered = activitiesData.filter(activity => {
      const activityDate = new Date(activity.date).toLocaleDateString();
      const selectedDate = new Date(selectedDay).toLocaleDateString();
      // Compare if the activity occurs on the same day as selectedDay
      return activityDate === selectedDate;
    });
    setFilteredActivities(filtered);
  }, [selectedDay, activitiesData]);

  console.log("=======================")
  console.log(filteredActivities);

  const addEventMarkers = async () => {
    if (!map.current || !activitiesData) return; 

    activitiesData.forEach((activity) => {
      const { coords } = activity; 
      if (coords) {
        // Create a marker for each activity
        const marker = new mapboxgl.Marker()
          .setLngLat([coords[0], coords[1]]) // Set longitude and latitude
          .addTo(map.current); // Add the marker to the map
      }
    });
  };

  const addRoutes = async () => {
    if (!map.current || !map.current.isStyleLoaded()) return; 

    // Sort activitiesData by date and then by startTime
    activitiesData.sort((a, b) => {
      if (a.date !== b.date) {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(a.startTime) - new Date(b.startTime);
      }
    });

    for (let i = 0; i < activitiesData.length - 1; i++) {
      const activity = activitiesData[i];
      const nextActivity = activitiesData[i + 1];
      const transportationType = nextActivity.transportationType;
      const start = activity.coords;
      const end = nextActivity.coords;
      const sourceID = "route" + i;

      if (["walking", "driving", "cycling"].includes(transportationType)) {
        try {
          const url = `https://api.mapbox.com/directions/v5/mapbox/${transportationType}/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&steps=true&overview=full&access_token=${mapboxgl.accessToken}`;
          const response = await fetch(url);
          const data = await response.json();
          const route = data.routes[0].geometry;

          // Add the new source and layer
          map.current.addSource(sourceID, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: route,
            },
          });

          map.current.addLayer({
            id: sourceID,
            type: "line",
            source: sourceID,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#F48989",
              "line-width": 5,
            },
          });
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      } else if (["plane", "cruise"].includes(transportationType)) {
        // Check if the line crosses the antimeridian
        const crossesAntimeridian =
          Math.abs(
            activitiesData[i].coords[0] - activitiesData[i + 1].coords[0]
          ) > 180;

        // Adjust coordinates if the line crosses the antimeridian
        const coordinates = crossesAntimeridian
          ? [
            activitiesData[i].coords,
            [
              activitiesData[i + 1].coords[0] +
              (activitiesData[i + 1].coords[0] < activitiesData[i].coords[0]
                ? 360
                : -360),
              activitiesData[i + 1].coords[1],
            ],
          ]
          : [activitiesData[i].coords, activitiesData[i + 1].coords];

        // Add layer to map
        map.current.addLayer({
          id: sourceID,
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: coordinates,
              },
            },
          },
          paint: {
            "line-color": "red",
            "line-opacity": 0.7,
            "line-width": 3,
            "line-dasharray": [2, 2],
          },
        });
      }
    }
  };

  const removeRoutes = () => {
    if (!map.current || !map.current.isStyleLoaded()) return; // Check if the map's style is loaded

    // Use a more robust way to find all route-related layers and sources
    const routeIds = map.current
      .getStyle()
      .layers.filter((layer) => layer.id.startsWith("route"))
      .map((layer) => layer.id);

    routeIds.forEach((routeId) => {
      if (map.current.getLayer(routeId)) {
        map.current.removeLayer(routeId);
      }
      if (map.current.getSource(routeId)) {
        map.current.removeSource(routeId);
      }
    });
  };

  useEffect(() => {
    if (!map.current) return; // Ensure map instance is available

    // Listen for the 'load' event on the map
    map.current.on("load", () => {
      // Now that the map is loaded, it's safe to call these functions
      addRoutes();
      addEventMarkers();
    });

    // Clean up event listener when component unmounts or if map instance changes
    return () => {
      if (map.current) {
        map.current.off("load", addRoutes);
        map.current.off("load", addEventMarkers);
      }
    };
  }, [map.current]); // Dependency array includes map.current to re-run effect if map instance changes

  useEffect(() => {
    if (!map.current) return;
    if (showRoute) {
      addRoutes();
    } else {
      removeRoutes();
    }
  }, [showRoute]);


  const handleViewChange = (e) => {
    const selectedValue = e.target.value;
    setView(selectedValue);
    console.log("Selected view:", selectedValue); // Log the selected value
  };

  return (
    <div
      ref={mapContainer}
      className="mapContainer"
      style={{ height: "100vh", width: "100%" }}
    >
      <div
        style={{
          position: "absolute",
          margin: 10,
          zIndex: 100,
          backgroundColor: "white",
          padding: 8,
          cursor: "pointer",
          borderRadius: 10,
          height: 80,
          width: 400,
        }}
      >
        <button
          onClick={() => setShowRoute(!showRoute)}
          style={{
            margin: 10,
            backgroundColor: "#f4f4f4",
            padding: 8,
            borderRadius: 10,
            height: 50,
            width: 100,
          }}
        >
          Toggle Routes
        </button>

        <select
          onChange={handleViewChange}
          value={view}
          style={{
            backgroundColor: "#f4f4f4",
            padding: 8,
            borderRadius: 10,
            height: 50,
            width: 100,
            cursor: "pointer",
          }}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="overall">Overall</option>
        </select>
      </div>
    </div>
  );
};

export default MapComponent;
