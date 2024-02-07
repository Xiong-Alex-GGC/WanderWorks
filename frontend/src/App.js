import './App.css';
import Nav from './components/Layout/Nav';
import AppFooter from './components/Layout/Footer';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import DemoMap from "./components/Mapbox/DemoMap";



function App() {
  return (
    <AuthProvider>
      <Nav />
      <Outlet/>
      <AppFooter />
    </AuthProvider>
  );
}

export default App;