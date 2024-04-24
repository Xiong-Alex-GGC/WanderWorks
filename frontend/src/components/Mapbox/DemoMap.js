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

    //remove any existings markers & routes
    removeMarkers();
    removeRoutes();
    
    let filtered = activitiesData;
  
    // Filter activities by Day
    if (view === "day") {
      filtered = activitiesData.filter(activity => {
        const activityDate = new Date(activity.date).toLocaleDateString();
        const selectedDate = selectedDay ? new Date(selectedDay).toLocaleDateString() : new Date().toLocaleDateString();
        return activityDate === selectedDate;
      });
    } else if (view === "week") {
      // Filter activities by week
      filtered = activitiesData.filter(activity => {
        const selectedDate = selectedDay ? new Date(selectedDay) : new Date();
        const activityDate = new Date(activity.date);
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
        return (
          activityDate >= startOfWeek &&
          activityDate < new Date(startOfWeek.setDate(startOfWeek.getDate() + 7))
        );
      });
    } else if (view === "month") {
      // Filter activities by month
      filtered = activitiesData.filter(activity => {
        const selectedDate = selectedDay ? new Date(selectedDay) : new Date();
        const activityDate = new Date(activity.date);
        const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    
        return activityDate >= startOfMonth && activityDate <= endOfMonth;
      });
    }
  
    setFilteredActivities(filtered);

  }, [selectedDay, activitiesData, view]);



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

  useEffect(() => {
    if (!map.current || !filteredActivities) return;
    addEventMarkers();
    addRoutes();
  }, [filteredActivities]);

  const addEventMarkers = async () => {

    filteredActivities.forEach((activity) => {
      const { coords } = activity;
      if (coords) {
        // Create a marker for each activity
        const marker = new mapboxgl.Marker()
          .setLngLat([coords[0], coords[1]])
          .addTo(map.current);

        // event listener to open the popup on click
        marker.getElement().addEventListener("mouseenter", () => {
          const markerPopup = new mapboxgl.Popup()
            .setLngLat([coords[0], coords[1]])
            .setHTML(`<p>${activity.name}</p>`)
            .addTo(map.current);

          map.current.on("mouseenter", () => {
            markerPopup.addTo(map.current);
          });

          // Add mouseleave event listener 
          map.current.on("mouseleave", () => {
            markerPopup.remove();
          });
        });
      }
    });
  };

  const addRoutes = async () => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    // Sort activitiesData by date and then by startTime
    filteredActivities.sort((a, b) => {
      if (a.date !== b.date) {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(a.startTime) - new Date(b.startTime);
      }
    });

    for (let i = 0; i < filteredActivities.length - 1; i++) {
      const activity = filteredActivities[i];
      const nextActivity = filteredActivities[i + 1];
      const transportationType = nextActivity.type;
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

          // Calculate midpoint coordinates for the popup
          const midPointCoordinates = [
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2,
          ];

          const distanceInKilometers = data.routes[0].distance / 1000;
          const durationInMinutes = data.routes[0].duration / 60;
          const popupContentStyle = "font-weight: bold;";

          // Create a popup for each route
          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
            <div style="${popupContentStyle}">
              ${nextActivity.transportationType} | ${activity.name} - ${nextActivity.name} <br/> 
              ${distanceInKilometers} km | 
              Time: ${durationInMinutes} minutes
            </div>`)
            .setLngLat(midPointCoordinates);

          // mouseenter event listener 
          map.current.on("mouseenter", sourceID, () => {
            popup.addTo(map.current);
          });

          // mouseleave event listener
          map.current.on("mouseleave", sourceID, () => {
            popup.remove();
          });

        } catch (error) {
          console.error("Error fetching route:", error);
        }
      } else if (["plane", "cruise"].includes(transportationType)) {
        // Check if the line crosses the antimeridian
        const crossesAntimeridian =
          Math.abs(
            filteredActivities[i].coords[0] - filteredActivities[i + 1].coords[0]
          ) > 180;

        // Adjust coordinates if the line crosses the antimeridian
        const coordinates = crossesAntimeridian
          ? [
            filteredActivities[i].coords,
            [
              filteredActivities[i + 1].coords[0] +
              (filteredActivities[i + 1].coords[0] < filteredActivities[i].coords[0]
                ? 360
                : -360),
                filteredActivities[i + 1].coords[1],
            ],
          ]
          : [filteredActivities[i].coords, filteredActivities[i + 1].coords];

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

  const removeMarkers = () => {
    if (!map.current) return;
  
    // Get all map markers
    const markers = document.querySelectorAll(".mapboxgl-marker");
  
    // Remove each marker from the map
    markers.forEach(marker => {
      marker.remove();
    });
  };
  

  useEffect(() => {
    if (!map.current) return;

    map.current.on("load", () => {
      addRoutes();
      addEventMarkers();
    });

    return () => {
      if (map.current) {
        map.current.off("load", addRoutes);
        map.current.off("load", addEventMarkers);
      }
    };
  }, [map.current]);

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
    console.log("Selected view:", selectedValue);
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
