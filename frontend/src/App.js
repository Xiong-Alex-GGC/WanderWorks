import './App.css';
import Nav from './components/Layout/Nav';
import AppFooter from './components/Layout/Footer';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';  



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