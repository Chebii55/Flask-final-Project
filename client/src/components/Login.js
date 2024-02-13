import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [userOrStaff, setUserOrStaff] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password, user_or_staff: userOrStaff }),
      });

      const data = await response.json();
      
      setIsLoading(false);

      if (response.ok) {
        if (userOrStaff === 'user') {
          // Redirect to user dashboard after successful login
          navigate('/home');
        } else {
          // Redirect to staff dashboard after successful login
          navigate('/home');
        }
      } else {
        setError(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setIsLoading(false);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen px-4 md:px-10 lg:px-20 flex items-center justify-center">
      <div className="bg-white lg:w-5/12 md:w-6/12 w-10/12 shadow-3xl">
        <form className="p-12 md:p-24" onSubmit={handleLogin}>
          {/* Radio buttons for user/staff selection */}
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <input type="radio" id="user" value="user" checked={userOrStaff === 'user'} onChange={() => setUserOrStaff('user')} />
            <label htmlFor="user" className="text-blue">User</label>
            <input type="radio" id="staff" value="staff" checked={userOrStaff === 'staff'} onChange={() => setUserOrStaff('staff')} />
            <label htmlFor="staff" className="text-blue">Staff</label>
          </div>
          {/* Username input */}
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Username" />
          </div>
          {/* Password input */}
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
          </div>
          {/* Submit button */}
          <button className="bg-gradient-to-b from-blue-700 to-blue-900 font-medium p-2 md:p-4 text-white uppercase w-full">Login</button>
          {/* Loading indicator */}
          {isLoading && <p>Loading...</p>}
          {/* Error message */}
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
