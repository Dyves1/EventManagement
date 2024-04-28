import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EventModal from '../../components/EventModel';

const BaseURL = import.meta.env.VITE_REACT_BASE_URL;


function EventManagement() {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');


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
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };
    
      const openCreateModal = () => {
        setModalMode('create');
        toggleModal();
      };
    
      const openEditModal = (eventId) => {
        setSelectedEventId(eventId); // Set the selected event ID
        setModalMode('edit'); // Set the modal mode to 'edit'
        toggleModal(); // Open the modal
      

      };
      const handleDelete = async () => {
        try {
            await axios.delete(`${BaseURL}/events/${selectedEventId}`);
            fetchEvents(); // Fetch events again to reflect the changes
            setSelectedEventId(null); // Reset selectedEventId after deletion
            setIsConfirmationOpen(false);
            setToastMessage('Event delete successful');
            setToastType('success');
            window.location.reload(); // Close the confirmation modal after deletion
        } catch (error) {
            console.error('Error deleting event:', error);
            setToastMessage('Delete Event failed. Please try again.');

            setToastType('error');
        }
    };
    const confirmDelete = (eventId) => {
        setSelectedEventId(eventId);
        setIsConfirmationOpen(true); // Open the confirmation modal
    };

    const cancelDelete = () => {
        setIsConfirmationOpen(false); // Close the confirmation modal
    };
  return (
    <div>
<div style={{marginBottom:'20px'}} className='bottom flex justify-between items-center'><h1>Event Management Dashboard</h1>

<button
type="submit"
onClick={openCreateModal}
className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
<svg
className="me-1 -ms-1 w-5 h-5"
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<path
  fillRule="evenodd"
  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
  clipRule="evenodd"
/>
</svg>
Create Event
</button></div>


              {isModalOpen && <EventModal onClose={toggleModal} mode={modalMode} eventId={selectedEventId} />}
              <div className="flex flex-col items-center justify-between px-5 pb-5 space-y-5">
      {events.map(event => (
    <div className="bg-red-400 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl space-y-6">
          <div key={event._id} className="bg-white rounded-lg shadow-lg px-6 py-4 relative">
            <i className="icon fas fa-home absolute top-4 left-4 text-red-400"></i>
            <div className="bottom flex justify-between items-center">
              <span className="title text-xl font-semibold">{event.title}</span>
              <span className="text-gray-600">{event.date}</span>
            </div>
            <p className="text-gray-800 my-4 text-sm">{event.description}</p>
            <div className="bottom flex justify-between items-center">
              <a href="#" className="text-black bg-white-400 py-2 px-4 rounded-lg text-sm hover:scale-95 hover:underline transition duration-300">{event.tickets}tickets</a>
              <span>Location:<a href='' className="text-gray-500"> {event.location}</a></span>
            </div>
            <div className="bottom flex justify-between items-center">
            <button
            onClick={()=>openEditModal(event._id)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg--700 dark:focus:ring--800"
            >
              Edit
            </button>
            <button
            style={{background:'#F04520'}}
            onClick={() => confirmDelete(event._id)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg--700 dark:focus:ring--800"
            >
              Delete
            </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
      ))}
    </div>            
    {isConfirmationOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this event?</p>
                        <div className="flex justify-end">
                            <button
                                className="text-gray-500 mr-4 hover:text-gray-700"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                        
                    </div>
                </div>
            )}
               {toastMessage && (
        <div className="bg-green-500 text-white py-3 text-center fixed bottom-0 left-0 right-0">

                    <div className={`bg-${toastType === 'success' ? 'green' : 'red'}-500 text-white px-6 py-3 rounded-lg shadow-md`}>
                        {toastMessage}
                    </div>
                </div>
            )}         

    </div>
  )
}

export default EventManagement