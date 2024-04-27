import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar';
import EventPhoto from "../assets/image/eventPhoto.jpg";
import { useParams } from 'react-router-dom';

// Define your base URL

const BaseURL = import.meta.env.VITE_REACT_BASE_URL;

function EventContainer() {
  const { eventId } = useParams();
  const [events, setEvents] = useState([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState(null);


  useEffect(() => {
    // Fetch events when component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BaseURL}/events`); // Concatenate with the base URL
      setEvents(response.data.data); // Assuming your API returns data in a 'data' property
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleBooking = (eventId) => {
    setIsBookingModalOpen(true);
    setSelectedEventId(eventId);
  };

  const handleSubmitBooking = () => {

    const token = localStorage.getItem('token');
    

  
    fetch(`${BaseURL}/booking/${selectedEventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        tickets: numTickets,
      }),
    })
      .then(response => {
        console.log('Booking successful:', response);
        setIsBookingModalOpen(false);
      })
      console.log(tickets)

      .catch(error => {
        console.error('Error booking:', error.message);
      });

  };
  
  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto pt-10 px-5 py-10 mt-10">
      <Navbar />
<h1 className='self-center text-2xl font-semibold whitespace-nowrap dark:text-black pb-5'>All Events </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
            <div key={event._id} className="bg-white rounded-lg shadow-md p-6">
              <a href="#">
                <img className="w-full mb-4 rounded-lg" src={EventPhoto} alt="#" />
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
                  onClick={()=>handleBooking(event._id)}
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

      {isBookingModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            {/* Booking Modal */}
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Book Ticket</h3>
                      <div className="mt-2">
                        <input type="number" min="1" value={numTickets} onChange={(e) => setNumTickets(e.target.value)} className="mt-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={handleSubmitBooking} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Confirm
                  </button>
                  <button onClick={() => setIsBookingModalOpen(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default EventContainer;
