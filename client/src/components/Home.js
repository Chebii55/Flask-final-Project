import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PerResHome from "./PerResHome";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/restaurants")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data);
        setData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-4 pt-8">
      {data.map(restaurant => (
        <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
          <PerResHome key={restaurant.id} data={restaurant} />
        </Link>
      ))}
    </div>
  );
}

export default Home;
