import { useAuth } from "../context/authContext";
import MapWithRoute from "../components/Mapbox/MapWithRoute";
import DashboardMap from "../components/Mapbox/DashboardMap";
import DemoMap from "../components/Mapbox/DemoMap";
import ItineraryContainer from "../components/Containers/ItineraryContainer";
import DashboardCalendar from "../components/Calendar/DashboardCalendar";
import { Button, Nav, Image, Container, Figure, FigureImage, FigureCaption } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import photo from "../images/DashboardBackground.jpg";

const Dashboard = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <Container fluid style={{ padding: 0 }}>
                <Figure style={{ position: 'relative', textAlign: 'center' }}>
                    <FigureImage src={photo} fluid style={{ width: '100vw', height: 'auto' }} alt="Dashboard Background"></FigureImage>
                    <FigureCaption style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <h2 style={{ color: "Black" }}>Hello {currentUser && (currentUser.displayName ? currentUser.displayName : currentUser.email)}!
                            <br />
                            Welcome to WanderWork!</h2>
                        <Nav.Link as={Link} to="/NewItinerary">
                            <Button variant="primary">Plan Your Next Adventure</Button>
                        </Nav.Link>
                    </FigureCaption>
                </Figure>
            </Container>

            <ItineraryContainer />

            <DashboardMap />

            <DashboardCalendar />
        </>
    )
}

export default Dashboard;