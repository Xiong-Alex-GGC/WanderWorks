import { useAuth } from "../context/authContext";
import ExploreContainer from "../components/Containers/ExploreContainer";
import ActivityLocationSuggestion from "../components/Mapbox/ActivityLocationSuggeston";
import { useState } from "react";

const Explore = () => {
  const { currentUser } = useAuth();
  const [coords, setCoords] = useState([]);
  const [location, setLocation] = useState("");

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  const handleCoordsSelect = (selectedCoords) => {
    setCoords(selectedCoords);
  };

  return (
    <>
      <div style={{ textAlign: "center", padding: 20 }}>
        <h2 style={{ fontFamily: "Times New Roman, Times, serif" }}>Explore</h2>
        <ActivityLocationSuggestion
          addressSelect={handleLocationSelect}
          coordsSelect={handleCoordsSelect}
        />
        <ExploreContainer />
      </div>
    </>
  );
};

export default Explore;
