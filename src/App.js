import './App.css';
import Navbar from './components/Navbar/Navbar';
import Gallary from './components/Gallary/Gallary';
import ContactUs from './components/ContactUs/ContactUs';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
function App() {
  const isAuth = localStorage.getItem('Hawana-Logged-In') === "true" ? true : false;
  return (
    <div className="App" >
      {isAuth ? <Navbar /> : ''}
      <Routes>
        <Route path='Hawana-dashboard/gallary' element={isAuth ? <Gallary /> : <Navigate to="/" />} />
        <Route path='Hawana-dashboard/contact' element={isAuth ? <ContactUs /> : <Navigate to="/" />} />
        <Route path='Hawana-dashboard/' element={isAuth ? <Navigate to="/gallary" /> : <Login />} />
      </Routes>

    </div>
  );
}

export default App;
