import React, { useState } from 'react';

const Reviews = (props) => {
  // State to store edited review text
  const [editedReview, setEditedReview] = useState('');
  
  // Function to handle editing a review
  const handleEditReview = (reviewId) => {
    // Send a PUT request to update the review with the edited text
    fetch(`your-api-endpoint/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reviewText: editedReview }),
    })
    .then(response => {
      if (response.ok) {
        // Handle success
        console.log(`Review with ID ${reviewId} edited successfully.`);
        // Clear the edited review state
        setEditedReview('');
      } else {
        // Handle error
        console.error('Failed to edit review:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error editing review:', error);
    });
  };

  // Function to handle deleting a review
  const handleDeleteReview = (reviewId) => {
    // Send a DELETE request to delete the review
    fetch(`your-api-endpoint/${reviewId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        // Handle success
        console.log(`Review with ID ${reviewId} deleted successfully.`);
      } else {
        // Handle error
        console.error('Failed to delete review:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting review:', error);
    });
  };

  return (
    <div className="bg-gray-950 flex justify-center items-center min-h-screen p-5">
      <div className="md:w-3/5 w-3/4 px-5 flex flex-col gap-2 p-3 bg-gray-800 text-white">
        <h1 className="py-3 text-lg">Reviews</h1>
        
        {/* Item Container */}
        <div className="flex flex-col gap-3 mt-8">
          <div className="flex flex-col gap-3 bg-gray-700 p-3">
            {/* Profile and Rating */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="w-7 h-7 text-center rounded-full bg-red-500">J</div>
                <span>Jess Hopkins</span>
              </div>
              <div className="flex p-1 gap-1 text-orange-300">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-half"></ion-icon>
              </div>
            </div>

            <div>
              Gorgeous design! Even more responsive than the previous version. A pleasure to use!
            </div>

            <div className="flex justify-between">
              <span>Feb 13, 2021</span>
              <div className="flex gap-2">
                <button className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60" onClick={() => handleEditReview('reviewId1')}>
                  Edit
                </button>
                <button className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60" onClick={() => handleDeleteReview('reviewId1')}>
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-gray-700 p-3">
            {/* Profile and Rating */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="w-7 h-7 text-center rounded-full bg-yellow-500">A</div>
                <span>Alice Banks</span>
              </div>
              <div className="flex p-1 gap-1 text-orange-300">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
              </div>
            </div>

            <div>
              The device has a clean design and the metal housing feels sturdy in my hands. Soft rounded corners make it a pleasure to look at.
            </div>

            <div className="flex justify-between">
              <span>Feb 13, 2021</span>
              <div className="flex gap-2">
                <button className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60" onClick={() => handleEditReview('reviewId2')}>
                  Edit
                </button>
                <button className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60" onClick={() => handleDeleteReview('reviewId2')}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
