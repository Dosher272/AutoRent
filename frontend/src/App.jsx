import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CarPage from './pages/CarPage'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import About from './pages/About'
import Contacts from './pages/Contacts'
import Header from './components/Header'
import AdminBookings from './pages/AdminBookings'
<<<<<<< HEAD
import Payment from './pages/Payment'
=======
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cars/:id" element={<CarPage />} />
        <Route path="/booking/:id" element={<Booking />} />
<<<<<<< HEAD
        <Route path="/payment/:bookingId" element={<Payment />} />
=======
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />

        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </>
  )
}

export default App
