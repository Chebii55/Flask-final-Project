import React from 'react';
import { Link } from 'react-router-dom';

function Header() {


  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to log out");
      }
      console.log("Session deleted successfully");
    })
    .catch(error => {
      console.error("Error logging out:", error);
    });
  }
 
  return (
    <header className="bg-gray-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img className="h-10 w-auto rounded-full" src={require('./Logo001.jpeg')} alt="Logo" />
          <span className="text-white text-lg font-semibold ml-2">Reservista</span>
        </div>
        <nav className="space-x-4 flex items-center">
          <Link to="/home" className="text-blue-500 hover:text-blue-700 focus:outline-none">
            <button>Home</button>
          </Link><Link to="/about">
          <button href="/about" className="text-blue-500 hover:text-blue-700 focus:outline-none">
          About</button></Link><Link to="/contactus">
          <button href="/contact" className="text-blue-500 hover:text-blue-700 focus:outline-none" >ContactUs</button></Link>
            <Link to="/"><button onClick={() =>  handleLogOut()} className="text-blue-500 hover:text-blue-700 focus:outline-none">Logout</button></Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
