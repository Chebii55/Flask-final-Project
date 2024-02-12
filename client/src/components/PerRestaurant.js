import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Reviews from './Reviews';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PerRestaurant() {
  const [formData, setFormData] = useState({
    review: '',
    rating: '',
    restaurant_id: null,
    user_id: null
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from check_session endpoint
        const response = await fetch('/check_session');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        const userId = userData.id;

        // Update formData with the user_id
        setFormData(prevState => ({
          ...prevState,
          user_id: userId,
          restaurant_id: id // Assuming id represents the restaurant ID
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRestaurant(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  function handleBookRestaurant() {
    // Check if formData.user_id is available
    if (!formData.user_id) {
      console.error('User ID is missing.');
      toast.error('Failed to book restaurant. User ID is missing.');
      return;
    }
  
    // Check if restaurant ID is available
    if (!restaurant || !restaurant.id) {
      console.error('Restaurant ID is missing.');
      toast.error('Failed to book restaurant. Restaurant ID is missing.');
      return;
    }
  
    const bookingData = {
      restaurant_id: restaurant.id,
      user_id: formData.user_id
    };
  
    console.log('Booking data:', bookingData);
  
    fetch('/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Restaurant booked successfully');
      toast.success('Restaurant booked successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      toast.error('Failed to book restaurant. Please try again later.');
    });
  }
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    fetch(`/ratingreviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(updatedReviews => {
        setRestaurant(prevRestaurant => ({
          ...prevRestaurant,
          reviews: updatedReviews
        }));
        setFormData({
          review: '',
          rating: ''
        });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">{restaurant.name}</h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{restaurant.details}</p>
          <button onClick={handleBookRestaurant} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Tables Available: {restaurant.tables}
          </button>
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
          <img src={restaurant.image} alt="Restaurant" className="rounded-lg" style={{ width: '100%', height: '50%' }} />
        </div>
      </div>
      <Reviews key={restaurant.id} id={restaurant.id} reviews={restaurant.reviews}/>
    </section>
  );
}

export default PerRestaurant

