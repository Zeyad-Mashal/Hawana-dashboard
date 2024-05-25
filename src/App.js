import './App.css';
import Navbar from './components/Navbar/Navbar';
import Gallary from './components/Gallary/Gallary';
import ContactUs from './components/ContactUs/ContactUs';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import AddCategory from './components/AddCategory/AddCategory';
import AddSubCategory from './components/AddSubCategory/AddSubCategory';
function App() {
  const isAuth = localStorage.getItem('Hawana-Logged-In') === "true" ? true : false;
  return (
    <div className="App" >
      {isAuth ? <Navbar /> : ''}
      <Routes>
        <Route path='/gallary' element={isAuth ? <Gallary /> : <Navigate to="/" />} />
        <Route path='/subcategory/:categoryId' element={isAuth ? <AddSubCategory /> : <Navigate to="/" />} />
        <Route path='/contact' element={isAuth ? <ContactUs /> : <Navigate to="/" />} />
        <Route path='/category' element={isAuth ? <AddCategory /> : <Navigate to="/" />} />
        <Route path='/' element={isAuth ? <Navigate to="/gallary" /> : <Login />} />
      </Routes>

    </div>
  );
}

export default App;
