import React, { useState } from 'react';
import Reviews from './Reviews';

function PerRestaurant() {
  const [formData, setFormData] = useState({
    review: '',
    rating: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, for example, sending the data to a server
    console.log(formData);
    // Reset form data after submission
    setFormData({
      review: '',
      rating: ''
    });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Welcome To Harare City</h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Welcome to [Company Name], your gateway to unforgettable travel experiences. We are a leading travel and tour company dedicated to creating exceptional journeys for adventurers, explorers, and wanderers like you.</p>
          {/* eslint-disable-next-line */}
          <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
            Get started
            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </a>
          <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Speak to Sales
          </a> 
          
          {/* Add Review Form */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col mb-4">
              <label htmlFor="review" className="text-gray-700">Review:</label>
              <textarea id="review" name="review" value={formData.review} onChange={handleChange} className="border border-gray-300 rounded px-3 py-1 mt-2"></textarea>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="rating" className="text-gray-700">Rating:</label>
              <input type="number" id="rating" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} className="border border-gray-300 rounded px-3 py-1 mt-2" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit Review</button>
          </form>
          
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
          <img src="https://lp-cms-production.imgix.net/2019-06/554369495_full.jpg" alt="mockup" className="rounded-lg" />
        </div>                
      </div>
      <Reviews/>
    </section>
  );
}

export default PerRestaurant;
