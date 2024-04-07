import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Gallary from './components/Gallary/Gallary';
import ContactUs from './components/ContactUs/ContactUs';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/gallary' element={<Gallary />} />
        <Route path='/contact' element={<ContactUs />} />
      </Routes>

    </div>
  );
}

export default App;
