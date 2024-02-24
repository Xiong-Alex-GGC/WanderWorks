import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { Marker, NavigationControl, FullscreenControl } from 'react-map-gl/';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import mapboxToken from '../../tokens/mapboxToken';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const DashboardMap = () => {
    // const tokyoCoords = [35.6764, 139.6500];
    // const shibuyaCoords = [35.6640, 139.6982];
    // const ggcCoords = [33.9712, -84.0027];

    const [itineraries, setItineraries] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/itineraries/${currentUser.uid}`);
                setItineraries(response.data);
            } catch (error) {
                console.error('Error fetching itineraries:', error);
            }
        };

        //using Itinerary.coords create and return a marker
        itineraries.forEach((itinerary, index) => {
            console.log(`Itinerary ${index + 1}:`, itinerary.coords);
        });

        fetchItineraries();
    }, []);

    //on marker click, show basic info
    // showMarkerInfo = () => {

    // }

    return (

        <div style={{ width: '100%' }}>
            <h2>Your Journey</h2>
            <div style={{
                fontSize: 12,
                marginRight: '15%',
                marginLeft: 'auto',
                textAlign: 'right',
                width: 200,
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>History</span>
                <span>Present</span>
                <span>Future</span>
                <span><b>Overall</b></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Map
                    mapboxAccessToken={mapboxToken}
                    style={{
                        width: '80%',
                        height: 300,
                        borderRadius: 20,
                        marginBottom: 30,
                        marginTop: 5
                    }}
                    mapStyle="mapbox://styles/mapbox/standard"
                // mapStyle="mapbox://styles/mapbox/outdoors-v12"

                // https://docs.mapbox.com/api/maps/styles/#mapbox-styles
                >
                    <NavigationControl />
                    <FullscreenControl />

                    {/* Create markers for each itinerary */}
                    {itineraries.map((itinerary, index) => (
                        <Marker
                            key={index}
                            latitude={itinerary.coords[1]} // Latitude
                            longitude={itinerary.coords[0]} // Longitude

                        // onClick={showMarkerInfo}
                        >
                            {/* Customize marker appearance if needed */}
                            {/* <div style={{ color: 'red', fontSize: '12px' }}>Marker {index + 1}</div> */}

                        </Marker>
                    ))}

                </Map>
            </div>

            <Row style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#f4f4f4',
                marginLeft: '10%',
                marginRight: '10%',
                padding: 15,
                borderRadius: 15,
                textAlign: 'center'
            }}>
                <Col>Countries:</Col>
                <Col>|</Col>
                <Col>Regions:</Col>
                <Col>|</Col>
                <Col>States:</Col>
                <Col>|</Col>
                <Col>Cities:</Col>
            </Row>

        </div>

    )
}

export default DashboardMap;