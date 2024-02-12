import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <section className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Restaurant</h1>
        <p className="text-xl mb-8">Experience the finest cuisine in town.</p>
        <div className="flex flex-col gap-4">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Log In
          </Link>
          <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
