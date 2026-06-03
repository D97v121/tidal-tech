import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Admin from './pages/Admin'
import Terms from './pages/Terms'
import Consult from './pages/Consult'
import PhoneSupport from './pages/PhoneSupport'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/phone-support" element={<PhoneSupport />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App