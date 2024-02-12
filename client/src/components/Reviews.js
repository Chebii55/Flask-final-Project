import React, { useState, useEffect } from 'react';

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/restaurants/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        const rev=data.ratingreviews
        setReviews(rev); // Assuming data is an array of reviews

        // Fetch user names for each review
        const userIds = rev.map(review => review.user_id);
        // console.log(userIds)
        const names = {};
        for (const userId of userIds) {
          const userResponse = await fetch(`/users/${userId}`);
          if (userResponse.ok) {
            const userData = await userResponse.json();
            names[userId] = userData.name;
          } else {
            names[userId] = 'Unknown User';
          }
        }
        setUserNames(names);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const averageRating = reviews.length > 0 ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : 0;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-950 flex justify-center items-center min-h-screen p-5">
      <div className="md:w-3/5 w-3/4 px-5 flex flex-col gap-2 p-3 bg-gray-800 text-white">
        <h1 className="py-3 text-lg">Reviews</h1>
        <div className="flex flex-col gap-3 mt-8">
          {reviews.map((review,index )=> (
            <div key={`${review.id}_${index}`}   className="flex flex-col gap-3 bg-gray-700 p-3">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="w-7 h-7 text-center rounded-full bg-red-500">J</div>
                  <span>{userNames[review.user_id]}</span> {/* Display user name */}
                </div>
                <div className="flex p-1 gap-1 text-orange-300">
                  {Array.from({ length: review.rating }, (_, index) => (
                     <p key={index}>⭐</p>
                  ))}
                </div>
              </div>
              <div>{review.review}</div>
              <div className="flex justify-between">
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">Average Rating: {averageRating.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Reviews;
