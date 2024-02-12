import React, { useEffect, useState } from 'react';

function PersonalBookingCard({ reservation }) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md p-6 rounded-xl w-96">
      <h3 className="text-lg font-semibold mb-2">Reservation Details</h3>
      <p className="text-gray-600 mb-2">Date: {reservation.created_at}</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
        Edit
      </button>
    </div>
  );
}

function MadeReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("/check_session")
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          fetchReservations();
        }
      })
      .catch(error => {
        console.error('Error checking session:', error);
        setError('An error occurred while checking your session.');
      });
  }, []);

  const fetchReservations = () => {
  
    fetch('/reservations')
      .then(res => res.json())
      .then(data => {
        setReservations(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
        setError('An error occurred while fetching your reservations.');
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (reservations.length === 0) {
    return <p>You have not made any reservations yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reservations.map((reservation) => (
        <PersonalBookingCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
}

export default MadeReservations;
