import React, { useState, useEffect } from "react";
import axios from "axios";
import ActivityCard from "../Cards/ActivityCard";

const ActivityContainer = ({ itineraryData }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/activities/${itineraryData.id}`
        );
        // Sort activities by date before setting state
        const sortedActivities = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setActivities(sortedActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, [itineraryData.id]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Your Schedule</h1>
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
            display: fluid;
            margin: 0 15% 0 15%;
            justify-content: center; /* Horizontally center the items */
            align-items: center; /* Vertically center the items */
            width: 100%;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ActivityContainer;
