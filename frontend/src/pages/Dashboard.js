import { useAuth } from "../context/authContext";
import MapWithRoute from "../components/Mapbox/MapWithRoute";
import DashboardMap from "../components/Mapbox/DashboardMap";
import DemoMap from "../components/Mapbox/DemoMap";
import ItineraryContainer from "../components/Containers/ItineraryContainer";
import DashboardCalendar from "../components/Calendar/DashboardCalendar";


const Dashboard = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <div>
                Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in 
            </div>

            <ItineraryContainer />


            {/*To be deleted, only here to demo */}
            <DashboardMap />
            <hr/>
            <DashboardCalendar />

            <hr/>


        </>
    )
}

export default Dashboard;