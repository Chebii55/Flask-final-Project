import React from 'react';

// Fake reservation data
const reservationsData = [
  { id: 1, date: '2024-02-15', time: '18:00', partySize: 4 },
  { id: 2, date: '2024-02-18', time: '19:30', partySize: 2 },
  // Add more reservation data as needed
];

function PersonalBookingCard({ reservation }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">Reservation Details</h3>
      <p>Date: {reservation.date}</p>
      <p>Time: {reservation.time}</p>
      <p>Party Size: {reservation.partySize}</p>
    </div>
  );
}

function MadeReservations() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reservationsData.map((reservation) => (
        <PersonalBookingCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
}

export default MadeReservations;
