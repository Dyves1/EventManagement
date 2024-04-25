import React, { useState } from 'react';
import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'http://localHost:3003', // Replace with your API base URL
});

function SignupContainer() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');

    const handleChange = (e) => {
        const {name,value} =e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields
    
        if (formData.password !== formData.confirmPassword) {
            // Handle password mismatch error
            setToastMessage('Passwords do not match');
            setToastType('danger');
            return;
        }
    
        try {
            const response = await axiosInstance.post('/signup', formData);
            // Handle successful signup
            setToastMessage(response.data.message);
            setToastType('success');
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            // Handle signup error
            setToastMessage(error.message);
            setToastType('danger');
        }
    };
    

    return (
        <section className="bg-white-50 dark:bg-white-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-grey rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-black-900 dark:text-black">Your Full Names</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="John Doe"
                                    required
                                />
                                {!formData.fullname && <p className="text-xs text-red-500">Full name is required</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black-900 dark:text-black">Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                                {!formData.email && <p className="text-xs text-red-500">The email is required</p>}

                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black-900 dark:text-black">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-white-50 border border-gray-300 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                    required
                                />
                                {!formData.password && <p className="text-xs text-red-500">Password is required</p>}
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-black-900 dark:text-black">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirm-password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="bg-white-50 border border-gray-300 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                    required
                                />
                                 {!formData.confirmPassword.trim() && <p className="text-xs text-red-500">Confirm Password is required</p>}
                            </div>


                                        <button
  type="submit"
  style={{ background:"#F04520",Color:'black'}}
  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
  Create an account
</button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => {console.log('hhhh')}} style={{ color: '#F04520' }}>Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            {toastMessage && (
                <div id="toast-success" className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${toastType === 'success' ? 'visible' : 'invisible'}`} role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">{toastMessage}</div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            )}
            {toastMessage && (
                <div id="toast-danger" className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${toastType === 'danger' ? 'visible' : 'invisible'}`} role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                        </svg>
                        <span className="sr-only">Error icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">{toastMessage}</div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            )}
        </section>
    );
}

export default SignupContainer;
