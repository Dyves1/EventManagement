import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar';

// Define your base URL
const BASE_URL = 'http://localhost:3003';

function Hero() {
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
    <div>
      
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event._id} className="bg-white rounded-lg shadow-md p-6">
              <a href="#">
                <img className="w-full mb-4 rounded-lg" src="/docs/images/products/apple-watch.png" alt="product image" />
              </a>
              <div className="text-gray-900 dark:text-black">

                <div className='bottom flex justify-between items-center'>
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight mb-2">{event.title}</h5>
                </a>
                <p className="text-gray-600 text-sm">{event.date}</p>

                </div>
                <div className="text-gray-800 my-4 text-sm">{event.description}</div>
                <div className="bottom flex justify-between items-center mt-2">
                <span>Location:<a href='' className="text-gray-500"> {event.location}</a></span>

                  <a href="#" className="hover:text-blue-600 hover:underline text-xs font-semibold px-2.5 py-0.5 rounded text-#F04520-800 dark:text-blue-800 ml-3">{event.tickets} tickets</a>
                 
                </div>
                <div className="flex items-center justify-between mt-4">
                  <a href="#" className="text-blue-600 hover:underline">View Details</a>
                  <button
                    style={{ background: '#F04520' }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg--700 dark:focus:ring--800"
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
