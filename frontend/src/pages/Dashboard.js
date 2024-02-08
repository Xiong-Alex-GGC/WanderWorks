import { useAuth } from "../context/authContext";
import MapWithRoute from "../components/Mapbox/MapWithRoute";
import UserMap from "../components/Mapbox/Map";
import DemoMap from "../components/Mapbox/DemoMap";
import ItineraryContainer from "../components/Containers/ItineraryContainer";



const Dashboard = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <div>
                Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in 
            </div>

            {/*To be deleted, only here to demo */}
            <UserMap />
            <hr/>

            <ItineraryContainer />

        </>
    )
}

export default Dashboard;