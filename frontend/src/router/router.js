import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from "../App";
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import NewItinerary from '../pages/NewItinerary';
import Itinerary from '../pages/Itinerary';
import Explore from '../pages/Explore';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>

            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Explore" element={<Explore />} />
            <Route path="/NewItinerary" element={<NewItinerary />} />
            <Route path="/Itinerary/:id" element={<Itinerary />} />

        </Route>
    )
);

export default router;