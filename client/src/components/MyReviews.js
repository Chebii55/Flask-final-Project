import React, { useState, useEffect } from "react";

function MyReviews() {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
  
        // Fetch user's reviews using the obtained user ID
        const reviewsResponse = await fetch(`/users/${userId}`);
        if (!reviewsResponse.ok) {
          throw new Error("Failed to fetch user's reviews");
        }
        const userReviewsData = await reviewsResponse.json();
        
        // Set user reviews and update loading state
        setUserReviews(userReviewsData.ratingreviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
        setLoading(false);
      }
    };
  
    fetchUserReviews();
  }, []);
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-950 flex justify-center items-center min-h-screen p-5">
      <div className="md:w-3/5 w-3/4 px-5 flex flex-col gap-2 p-3 bg-gray-800 text-white">
        <h1 className="py-3 text-lg">Your Reviews</h1>
        {userReviews.length > 0 ? (
          <div className="flex flex-col gap-3 mt-8">
            {userReviews.map(review => (
              <div key={review.id} className="flex flex-col gap-3 bg-gray-700 p-3">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 text-center rounded-full bg-red-500">J</div>
                    <span>user.id</span> 
                  </div>
                  <div className="flex p-1 gap-1 text-orange-300">
                    {Array.from({ length: review.rating }, (_, index) => (
                       <p key={index}>⭐</p>
                    ))}
                  </div>
                </div>
                <div>{review.review}</div>
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
