import React, { useState, useEffect } from "react";

function MyReviews() {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedReview, setEditedReview] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        // Fetch user session data
        const sessionResponse = await fetch(`/check_session`);
        if (!sessionResponse.ok) {
          throw new Error("Failed to fetch user session data");
        }
        const sessionData = await sessionResponse.json();
        
        // Extract user ID from session data
        const userId = sessionData.id;
  
        if (!userId || typeof userId !== 'number') {
          throw new Error("Invalid user ID");
        }
  
        const reviewsResponse = await fetch(`/users/${userId}`);
        if (!reviewsResponse.ok) {
          throw new Error("Failed to fetch user's reviews");
        }
        const userReviewsData = await reviewsResponse.json();
        setUserReviews(userReviewsData.ratingreviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
        setLoading(false);
      }
    };
  
    fetchUserReviews();
  }, []);
  
  const handleEdit = (index) => {
    setEditedReview(userReviews[index].review);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleSave = async () => {
    try {
      const editedReviews = [...userReviews];
      editedReviews[editIndex].review = editedReview;
      setUserReviews(editedReviews);
      
      // Make API call to update the review in the backend
      await fetch(`/update_review/${userReviews[editIndex].id}`, {
        method: 'PUT',
        body: JSON.stringify({ review: editedReview }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      setIsEditing(false);
      setEditIndex(null);
      setEditedReview('');
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleDelete = async (index) => {
    try {
      // Make API call to delete the review from the backend
      await fetch(`/delete_review/${userReviews[index].id}`, {
        method: 'DELETE',
      });

      // Remove the review from the state
      const updatedReviews = userReviews.filter((_, i) => i !== index);
      setUserReviews(updatedReviews);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-950 flex justify-center items-center min-h-screen p-5">
      <div className="md:w-3/5 w-3/4 px-5 flex flex-col gap-2 p-3 bg-gray-800 text-white">
        <h1 className="py-3 text-lg">Your Reviews</h1>
        {userReviews.length > 0 ? (
          <div className="flex flex-col gap-3 mt-8">
            {userReviews.map((review, index) => (
              <div key={review.id} className="flex flex-col gap-3 bg-gray-700 p-3">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <span>User</span> 
                  </div>
                  <div className="flex p-1 gap-1 text-orange-300">
                    {Array.from({ length: review.rating }, (_, index) => (
                       <p key={index}>⭐</p>
                    ))}
                  </div>
                </div>
                <div className="text-gray-400">Restaurant: {review.restaurant_id}</div>
                <div>{review.review}</div>
                <div>
                  {isEditing && editIndex === index ? (
                    <>
                      <textarea value={editedReview} onChange={(e) => setEditedReview(e.target.value)} className="bg-gray-800 text-white p-2 rounded-md" />
                      <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">Save</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(index)} className="text-blue-400 hover:text-blue-600">Edit</button>
                      <button onClick={() => handleDelete(index)} className="text-red-400 hover:text-red-600">Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </div>
  );
}

export default MyReviews;
