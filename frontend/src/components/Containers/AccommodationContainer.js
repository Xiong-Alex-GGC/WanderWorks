import React, { useState, useEffect } from "react";
import axios from "axios";
import AccommodationCard from "../Cards/AccommodationCard";

const AccommodationContainer = ({ itineraryData }) => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/accommodations/${itineraryData.id}`
        );
        setAccommodations(response.data);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };

    fetchAccommodations();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Your Accommodation</h1>
      <div className="accommodations-container">
        {accommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            itineraryData={itineraryData}
            {...accommodation}
          />
        ))}

        <style jsx>{`
          .accommodations-container {
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

export default AccommodationContainer;
