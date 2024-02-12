import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  useEffect(() => {
    // Function to fetch session information
    const checkSession = async () => {
      try {
        const response = await fetch('/check_session');
        if (response.ok) {
          setIsLoggedIn(true); // Set isLoggedIn to true if session is active
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession(); // Call the check session function
  }, [isLoggedIn]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  return (
    <header className="bg-gray-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img className="h-10 w-auto rounded-full" src={require('./Logo001.jpeg')} alt="Logo" />
          <span className="text-white text-lg font-semibold ml-2">Reservista</span>
        </div>
        <nav className="space-x-4 flex items-center">
          <Link to="/" className="text-blue-500 hover:text-blue-700 focus:outline-none">
            <button>Home</button>
          </Link><Link to="/about">
          <button href="/about" className="text-blue-500 hover:text-blue-700 focus:outline-none" onClick={() => setIsLoggedIn(false)}>About</button></Link><Link to="/contactus">
          <button href="/contact" className="text-blue-500 hover:text-blue-700 focus:outline-none" onClick={() => setIsLoggedIn(false)}>ContactUs</button></Link>
          {!isLoggedIn ? (
            <div className="relative inline-block text-left">
              <div>
                <button onClick={toggleDropdown} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-700">
                  Login/Sign Up
                  <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M14 8a2 2 0 11-4 0 2 2 0 014 0zm-4 8a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <div className="py-1" role="none">
                    <Link to="/login"><button onClick={() => setIsLoggedIn(true)} className="block w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 focus:outline-none" role="menuitem">Login</button></Link>
                    <Link to="/signup" ><button onClick={() => setIsLoggedIn(true)} className="block w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 focus:outline-none" role="menuitem">Sign Up</button></Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/"><button onClick={() => setIsLoggedIn(false)} className="text-blue-500 hover:text-blue-700 focus:outline-none">Logout</button></Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
