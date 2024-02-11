import React from 'react';
import '../App.css';
import Header from './Header';
import PerResHome from './PerResHome';
// import Block from './Block'
import LoginForm from './Login';
import SignupForm from './Signup';
import PerRestaurant from './PerRestaurant';
// import Reviews from './Reviews';
import ReservationList from './ReservationList';
import ViewProfile from './ViewProfile';
import MadeReservations from './MadeReservations';
import SideBar from './SideBar';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex justify-between">
        <SideBar/>
        <div className="flex flex-wrap gap-4 pt-8">
          <PerResHome />
          <PerResHome />
          <PerResHome />
          
        </div>
      </div>
      <div>
      <LoginForm/>
      <SignupForm/>
      <PerRestaurant/>
      <ReservationList/>
      <ViewProfile/>
      <MadeReservations/>
              </div>
    </div>
  );
}

export default App;
