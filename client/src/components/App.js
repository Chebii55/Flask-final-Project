import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './Header';
import LoginForm from './Login';
import SignupForm from './Signup';
import PerRestaurant from './PerRestaurant';
import Reviews from './Reviews';
import ReservationList from './ReservationList';
import ViewProfile from './ViewProfile';
import MadeReservations from './MadeReservations';
import SideBar from './SideBar';
import Home from './Home';
import About from './About';
import ContactUs from './ContactUs';
import MyReviews from './MyReviews';
import LandingPage from './LandingPage';

function App() {
  return (
    <Router className="App">
      <Header />
      <div className="flex justify-between">
        <SideBar/>
        <div className="flex-1"> {/* This div occupies the remaining space */}
          <Routes>
            <Route path="/"  element={<LandingPage/>} />
            <Route path="/home"  element={<Home/>} />
            <Route path="/reservation" element={<MadeReservations/>} />
            <Route path="/restaurants/:id" element={<PerRestaurant />} />
            <Route path="/reservations" element={<ReservationList />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/signup" element={<SignupForm/>} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/profile" element={<ViewProfile />} />                    
            <Route path="/about" element={<About />} />                    
            <Route path="/contactus" element={<ContactUs />} />  
            <Route path="/myreviews" element={<MyReviews/>} />                    
                  
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
