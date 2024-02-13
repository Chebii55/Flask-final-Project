import React, { useState, useEffect } from 'react';

function ViewProfile() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [sessionID, setSessionID] = useState('');

  useEffect(() => {
    fetch("/check_session")
      .then(response => response.json())
      .then(sessionData => {
        const { id, user_or_staff: userType } = sessionData;
        setSessionID(id);
        fetch(`/${userType}s/${id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${userType} data`);
            }
            return response.json();
          })
          .then(userData => {
            setUserData(userData);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error('Error checking session:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/users/${sessionID}`, {
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
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">View Profile</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">Name</label>
          <input type="text" id="name" name="name" className="border px-4 py-2 w-full" value={userData.name || ''} onChange={handleChange} readOnly={!isEditing} />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-2">Phone</label>
          <input type="text" id="phone" name="phone_number" className="border px-4 py-2 w-full" value={userData.phone_number || ''} onChange={handleChange} readOnly={!isEditing} />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" className="border px-4 py-2 w-full" value={userData.email || ''} onChange={handleChange} readOnly={!isEditing} />
        </div>
        {isEditing ? (
          <div className="flex justify-between">
            <button type="button" className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md uppercase hover:bg-blue-600 transition duration-300" onClick={handleSave}>Save</button>
            <button type="button" className="bg-gray-500 text-white font-medium py-2 px-4 rounded-md uppercase hover:bg-gray-600 transition duration-300" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <button type="button" className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md uppercase hover:bg-blue-600 transition duration-300" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </form>
    </div>
  );
}

export default ViewProfile;
