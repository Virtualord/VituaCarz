import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { ToastContainer, toast } from 'react-toastify';
import login from "./pages/auth/Login";
import AllCars from "./pages/AllCars";
import CarDetails from "./pages/auth/CarDetails";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AllBookings from "./pages/AllBookings";
import BookingDetails from "./pages/auth/BookingDetails";

const App = () => {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/login" element={<login />} />
      <Route path="/" element={<Home />} />
      <Route path="/all-cars" element={<AllCars />} />
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path="/add-car" element={<AddCar />} />
      <Route path="/edit-car/:id" element={<EditCar />} />
      <Route path="/all-bookings" element={<AllBookings />} />
      <Route path="/booking-details/:id" element={<BookingDetails />} />
    </Routes>
    </>
  )
}

export default App
