import React from 'react';

function About() {
  return (
    <div className="bg-gray-800 min-h-screen px-4 md:px-10 lg:px-20">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-white mb-8">About Us</h1>
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <p className="text-gray-800 leading-relaxed">
          At Reservista, we believe that every dining experience should be memorable and exceptional. Our commitment to excellence drives us to provide not just a meal, but an unforgettable journey for our guests. From our carefully crafted menus featuring the finest ingredients to our warm and inviting atmosphere, we strive to create the perfect setting for every occasion. 
          </p>
          <p className="text-gray-800 leading-relaxed mt-4">
          Whether you're celebrating a special milestone or simply enjoying a night out with loved ones, we're here to ensure that your reservation with us is nothing short of extraordinary. Join us and indulge in the art of dining, where every moment is savored and every memory cherished.  
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
