import React, { useState, useEffect } from "react";
import axios from "axios";
import ActivityCard from "../Cards/ActivityCard";
import { Container, Row, Col } from "react-bootstrap";

const ActivityContainer = ({ itineraryData }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/activities/${itineraryData.id}`
        );
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h1>Your Activities</h1>
      <div className="activities-container">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            itineraryData={itineraryData}
            {...activity}
          />
        ))}

        <style jsx>{`
          .activities-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin: 20px;
            border: "1px solid #ccc";
            padding: "15px";
            margin: "10px";
            borderradius: "8px";
            boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)";
            backgroundcolor: "#fff";
          }
        `}</style>
      </div>
    </div>
  );
};

export default ActivityContainer;
