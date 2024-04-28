import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_REACT_BASE_URL;



const EventModal = ({ onClose, mode , eventId}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description:'',
    tickets: '',
  });
  const [toastType, setToastType] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (mode === 'edit') {
      // Fetch existing event data when in edit mode
      fetchEventData();
    }
  }, [mode, eventId]);

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`${BaseURL}/events/${eventId}`);
      const eventData = response.data;
            // Populate form data with existing event data
      setFormData({
        title: eventData.title,
        date: eventData.date,
        location: eventData.location,
        description:eventData.description,
        tickets: eventData.tickets,
      });
      
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'create') {
      try {
        await axios.post(`${BaseURL}/events`, formData);
        setMessage('Event created successfully!');
        setShowMessage(true);
        setToastType('success');
        setTimeout(() => {
            setShowMessage(false);
          onClose();

          }, 3000);
      } catch (error) {
        setMessage('Error creating event.');
        setShowMessage(true);
        console.error('Error creating event:', error);
        setToastType('error');
      }
    } else if (mode === 'edit') {

      try {
        // Assuming you have event ID available for editing
        await axios.put(`${BaseURL}/events/${event.id}`, formData);
        setMessage(data.message);
        setShowMessage(true);
        setToastType('success');
        onClose();
      } catch (error) {
        setMessage('Error editing event.');
        setShowMessage(true);
        console.error('Error editing event:', error);
        setToastType('error');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePopupClose = () => {
    setShowMessage(false);
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full md:max-w-md rounded-lg overflow-hidden">
        <div className="flex p-4 md:p-5 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === 'create' ? 'Create New Event' : 'Edit Event'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-5">
        <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Date
              </label>
              <div className="relative">
    <input 
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"

    placeholder="Enter event date"
    required
    />
</div>

            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter event location"
                required
              />
            </div>



          </div>
          <div className="mb-4">
            <label htmlFor="tickets" className="block mb-2 text-sm font-medium text-gray-900">Tickets Available</label>
            <input
              type="number"
              id="tickets"
              name="tickets"
              value={formData.tickets}
              onChange={handleChange}
              className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter number of tickets available"
             
            />
                                  <div className="col-span-2">
                        <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Event Description</label>
                        <textarea 
                             type="text"
                             
                             name="description"
                        id="description" 
                        rows="4" 
                        value={formData.description}
                        onChange={handleChange}
                        className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="Write Event description here"> </textarea>                  
                    </div>
          </div>



          <button
            type="submit"
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
            {mode === 'create' ? 'Add Event' : 'Save Changes'}
          </button>
        </form>

        {/* Popup message */}
        {showMessage && (
        <div className="bg-green-500 text-white py-3 text-center fixed bottom-0 left-0 right-0">

        <div className={`bg-${toastType === 'success' ? 'green' : 'red'}-500 text-white px-6 py-3 rounded-lg shadow-md`}>
            {message}
        </div>
    </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;
