import React, { useEffect, useState } from 'react';

const ReservationList = () => {
  const [reservationData, setReservationData] = useState([]);
  const [restaurantNames, setRestaurantNames] = useState({});
  const [userNames ,setUserNames] = useState({});

  useEffect(() => {
    fetch("/reservations")
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setReservationData(data);

        const restaurantIds = data.map(reservation => reservation.restaurant_id);
        const userIds = data.map(reservation => reservation.user_id);

        fetch(`/restaurants?id=${restaurantIds.join(',')}`)
          .then(res => res.json())
          .then(restaurantData => {
            // console.log("Restaurant Data:", restaurantData);
            const names = {};
            restaurantData.forEach(restaurant => {
              names[restaurant.id] = restaurant.name;
            });
            setRestaurantNames(names);
          })
          .catch(error => console.error("Error fetching restaurants:", error));

        fetch(`/users?id=${userIds.join(',')}`)
          .then(res => res.json())
          .then(userData => {
            // console.log("User Data:", userData);
            const names = {};
            userData.forEach(user => {
              names[user.id] = user.name;
            });
            setUserNames(names);
          })
          .catch(error => console.error("Error fetching users:", error));
      })
      .catch(error => console.error("Error fetching reservations:", error));
  }, []);

  const renderReservations = () => {
    return reservationData.map((reservation, index) => (
      <tr key={reservation.id}>
        <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-l border-gray-300">
          {index + 1}
        </td>
        <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-l border-gray-300">
          {reservation.restaurant_id}
        </td>
        <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-l border-gray-300">
          {restaurantNames[reservation.restaurant_id] || 'Loading...'}
        </td>
        <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-l border-gray-300">
          {reservation.user_id}
        </td>
        <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-l border-gray-300">
          {userNames[reservation.user_id] || 'Loading...'}
        </td>
        <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-l border-gray-300">
          {reservation.created_at}
        </td>
      </tr>
    ));
  };

  return (
    <section className="bg-white py-20 lg:py-[120px] pr-100 flex justify-center">
      <div className="container">
        <div className="w-full">
          <div className="max-w-full overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-800 text-white text-center border-b border-gray-300">
                  <th className="w-1/12 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
                    Index
                  </th>
                  <th className="w-1/4 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">
                    Restaurant ID
                  </th>
                  <th className="w-1/4 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">
                    Restaurant Name
                  </th>
                  <th className="w-1/4 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">
                    User ID
                  </th>
                  <th className="w-1/4 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">
                    User Name
                  </th>
                  <th className="w-1/4 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">
                    Time Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {renderReservations()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationList;
