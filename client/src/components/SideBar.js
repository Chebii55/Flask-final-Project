import React, { useState, useEffect } from "react";
import Block from "./Block";
import { Link } from "react-router-dom";

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Fetch session data when the component mounts
    fetch("/check_session")
      .then((res) => res.json())
      .then((data) => {
        setSessionData(data);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 ${collapsed ? 'w-16 bg-blue-500' : 'w-full max-w-[15rem]'} p-4 shadow-xl shadow-blue-gray-900/5 transition-all duration-300`}>
      {!collapsed && (
        <>
          <div className="mb-2 p-4">
            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Reservations Made</h5>
          </div>
          <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
            {sessionData && sessionData.user_or_staff === 'user' && (
              <>
                <Link to="/myreviews">
                  <Block fill={"My Reviews"} width={200} /> 
                </Link>
                <Link to="/madereservations">
                  <Block fill={"MadeReservations"} width={200} />
                </Link>
                <Link to="/profile">
                  <Block fill={"View Profile"} width={200} /> 
                </Link>
              </>
            )}
            {sessionData && sessionData.user_or_staff === 'staff' && (
              <>
                <Link to="/reservations">
                  <Block fill={"Reservation List"} width={200} /> 
                </Link>
              </>
            )}
          </nav>
        </>
      )}
      <button className="absolute bottom-4 left-4 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center" onClick={toggleCollapse}>
        {collapsed ? '>' : '<'}
      </button>
    </div>
  );
}

export default SideBar;
