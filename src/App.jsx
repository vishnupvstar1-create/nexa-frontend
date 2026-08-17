import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // <--- 1. Import it here
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import ContactUs from './pages/ContactUs';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/car/:modelCd" element={<CarDetail />} />
        </Routes>
      </div>

      <ScrollToTop /> {/* <--- 2. Add it right above the Footer! */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;