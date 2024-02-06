import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl/';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import mapboxToken from '../../tokens/mapboxToken';
import { useState } from 'react';

const UserMap = () => {
    const tokyoCoords = [35.6764, 139.6500];
    const shibuyaCoords = [35.6640, 139.6982];
    const ggcCoords = [33.9712, -84.0027];

    ///
    return (

        <Map
            mapboxAccessToken= {mapboxToken}
            style={{
                width: "100%",
                height: "30vh",
            }}
            mapStyle="mapbox://styles/mapbox/standard"
            // https://docs.mapbox.com/api/maps/styles/#mapbox-styles
        >
            <NavigationControl />
            <GeolocateControl /> 

            <Marker 
                latitude={tokyoCoords[0]}
                longitude={tokyoCoords[1]}
            />

            <Marker 
                latitude={shibuyaCoords[0]}
                longitude={shibuyaCoords[1]}
            />

<Marker 
                latitude={ggcCoords[0]}
                longitude={ggcCoords[1]}
            />

        </Map>

    )
}

export default UserMap;