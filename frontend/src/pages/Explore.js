import { useAuth } from "../context/authContext";
import ExploreContainer from "../components/Containers/ExploreContainer";
import TestWeather from "../components/Weather/TestWeatherAPI";

const Explore = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <div style={{ textAlign: "center", padding: 20 }}>
        <h2 style={{ fontFamily: "Times New Roman, Times, serif" }}>Explore</h2>
        <ExploreContainer />
      </div>
    </>
  );
};

export default Explore;
