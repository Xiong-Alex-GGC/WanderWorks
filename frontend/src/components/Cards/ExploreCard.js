import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  margin: "10px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
};

const headingStyle = {
  color: "#333",
};

const textStyle = {
  margin: "8px 0",
  color: "#665",
};

const ExploreCard = ({ location, imgURL }) => {
  return (
    <div style={cardStyle}>
      <div
        style={{
          height: 300,
          backgroundColor: "grey",
          backgroundImage: `url(${imgURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <h2>{location}</h2>
    </div>
  );
};

export default ExploreCard;
