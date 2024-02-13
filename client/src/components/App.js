import React, { useEffect, useState } from 'react';
import '../App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './Header';
import LoginForm from './Login';
import SignupForm from './Signup';
import PerRestaurant from './PerRestaurant';
import Reviews from './Reviews';
import ReservationList from './ReservationList';
import ViewProfile from './ViewProfile';
import SideBar from './SideBar';
import Home from './Home';
import About from './About';
import ContactUs from './ContactUs';
import MyReviews from './MyReviews';
import LandingPage from './LandingPage';
import MadeReservations from './MadeReservations';

function App() {
  return (
    <Router className="App">
      <AppContainer />
    </Router>
  );
}

function AppContainer() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    fetch("/check_session")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to check session');
        }
      })
      .then(data => {
        setSession(true);
      })
      .catch(error => {
        console.error(error);
        setSession(false);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-between">
        {session ? <SideBar /> : null}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/restaurants/:id" element={<PerRestaurant />} />
            <Route path="/reservations" element={<ReservationList />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/madereservations" element={<MadeReservations />} />
            <Route path="/profile" element={<ViewProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/myreviews" element={<MyReviews />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
