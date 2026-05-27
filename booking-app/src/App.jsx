import { Routes, Route, Navigate } from 'react-router-dom'
import PhoneShell from './components/PhoneShell.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Restaurant from './pages/Restaurant.jsx'
import Booking from './pages/Booking.jsx'
import PaymentResult from './pages/PaymentResult.jsx'
import Orders from './pages/Orders.jsx'
import OrderDetail from './pages/OrderDetail.jsx'
import Profile from './pages/Profile.jsx'
import Favorites from './pages/Favorites.jsx'
import Points from './pages/Points.jsx'
import City from './pages/City.jsx'
import Discover from './pages/Discover.jsx'
import Phone from './pages/Phone.jsx'
import Help from './pages/Help.jsx'
import Contacts from './pages/Contacts.jsx'
import ShareOrder from './pages/ShareOrder.jsx'

export default function App() {
  return (
    <PhoneShell>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/orders/:id/share" element={<ShareOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/points" element={<Points />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/phone" element={<Phone />} />
        <Route path="/help" element={<Help />} />
        <Route path="/city" element={<City />} />
        <Route path="/search" element={<Search />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </PhoneShell>
  )
}
