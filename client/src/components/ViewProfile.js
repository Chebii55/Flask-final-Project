import React, { useState, useEffect } from 'react';

function ViewProfile() {
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    staffId: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from the server
    // For demonstration, I'm using dummy data here
    const fetchUserData = async () => {
      try {
        // Make a GET request to fetch user data
        const response = await fetch('https://api.example.com/userdata');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Make a PUT request to update user data
      const response = await fetch('https://api.example.com/userdata', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-5/12 md:w-6/12 w-10/12 shadow-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 p-6 bg-gray-200">View Profile</h1>
        <form className="p-12 md:p-24">
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
            </svg>
            <input type="text" id="name" className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Name" value={userData.name} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
            </svg>
            <input type="text" id="phone" className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Phone" value={userData.phone} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
            </svg>
            <input type="email" id="email" className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Email" value={userData.email} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
            </svg>
            <input type="text" id="staffId" className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Staff ID" value={userData.staffId} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
            </svg>
            <input type="password" id="password" className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" disabled={!isEditing} />
          </div>
          {!isEditing ? (
            <button className="bg-gradient-to-b from-blue-700 to-blue-900 font-medium p-2 md:p-4 text-white uppercase w-full" onClick={handleEdit}>Edit Profile</button>
          ) : (
            <div className="flex">
              <button className="bg-gradient-to-b from-green-400 to-green-600 font-medium p-2 md:p-4 text-white uppercase mr-2" onClick={handleSave}>Save</button>
              <button className="bg-gradient-to-b from-gray-400 to-gray-600 font-medium p-2 md:p-4 text-white uppercase" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ViewProfile;
