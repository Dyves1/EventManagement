import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define your base URL
const BASE_URL = 'http://localHost:3003';

function EventContainer() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when component mounts

    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events`); // Concatenate with the base URL
      setEvents(response.data.data); // Assuming your API returns data in a 'data' property
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="flex items-center justify-between px-5 pb-5">
      {events.map(event => (
        <div key={event._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700">
          <a href="#">
            <img className="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{event.title}</h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {event.date}
              </div>
              <span className="bg-blue-100 text-#F04520-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{event.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <a href="#" className="details hover:text-{#F04520}-600 hover:underline">View Details</a>
              <button
              style={{background:'#F04520'}}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg--700 dark:focus:ring--800"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventContainer;
