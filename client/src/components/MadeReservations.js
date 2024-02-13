import React, { useEffect, useState } from 'react';

function PersonalBookingCard({ reservation, onDelete }) {
  const handleDelete = () => {
    onDelete(reservation.id);
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md p-6 rounded-xl w-96">
      <h3 className="text-lg font-semibold mb-2">Reservation Details</h3>
      <p className="text-gray-600 mb-2">Restaurant ID: {reservation.restaurant_id}</p>
      <p className="text-gray-600 mb-2">Date: {reservation.created_at}</p>
      <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
        Delete
      </button>
    </div>
  );
}

function MadeReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = () => {
      fetch("/check_session")
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            fetchReservationsForUser(data.id); // Fetch reservations specifically for the user
          }
        })
        .catch(error => {
          console.error('Error checking session:', error);
          setError('An error occurred while checking your session.');
        });
    };

    const fetchReservationsForUser = (userId) => {
      fetch(`/reservations?user_id=${userId}`) // Fetch reservations for the user
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch reservations for the user');
          }
          return res.json();
        })
        .then(data => {
          setReservations(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching reservations:', error);
          setError('An error occurred while fetching your reservations.');
          setLoading(false);
        });
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = (reservationId) => {
    fetch(`/reservations/${reservationId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }
      // Remove the deleted reservation from the state
      setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationId));
    })
    .catch(error => {
      console.error('Error deleting reservation:', error);
      setError('An error occurred while deleting the reservation.');
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
        <PersonalBookingCard key={reservation.id} reservation={reservation} onDelete={handleDeleteReservation} />
      ))}
    </div>
  );
}

export default MadeReservations;
