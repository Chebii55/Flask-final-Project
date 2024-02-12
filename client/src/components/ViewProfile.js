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

    const fetchUserData = async () => {
      try {
        const response = await fetch('userdata');
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
      const response = await fetch('/users', {
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
    <div className="flex flex-wrap gap-4 pt-8 bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-white lg:w-5/12 md:w-6/12 w-full shadow-3xl rounded-lg overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 p-6 bg-gray-200">View Profile</h1>
        <form className="p-6 md:p-12">
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
            <input type="text" id="name" className="bg-gray-100 pl-3 py-2 w-full focus:outline-none" placeholder="Name" value={userData.name} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">Phone</label>
            <input type="text" id="phone" className="bg-gray-100 pl-3 py-2 w-full focus:outline-none" placeholder="Phone" value={userData.phone} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input type="email" id="email" className="bg-gray-100 pl-3 py-2 w-full focus:outline-none" placeholder="Email" value={userData.email} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="mb-6">
            <label htmlFor="staffId" className="block text-lg font-medium text-gray-700 mb-2">Staff ID</label>
            <input type="text" id="staffId" className="bg-gray-100 pl-3 py-2 w-full focus:outline-none" placeholder="Staff ID" value={userData.staffId} onChange={handleChange} disabled={!isEditing} />
          </div>
          {!isEditing ? (
            <button className="bg-blue-500 text-white font-medium py-3 w-full rounded-md uppercase hover:bg-blue-600 transition duration-300" onClick={handleEdit}>Edit Profile</button>
          ) : (
            <div className="flex justify-between">
              <button className="bg-green-500 text-white font-medium py-3 w-1/2 rounded-md uppercase hover:bg-green-600 transition duration-300" onClick={handleSave}>Save</button>
              <button className="bg-gray-500 text-white font-medium py-3 w-1/2 rounded-md uppercase hover:bg-gray-600 transition duration-300" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ViewProfile;
