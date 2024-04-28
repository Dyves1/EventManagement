import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../../redux/Auth/authSlice';

// Create an Axios instance with a base URL



function SignupContainer() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useHistory
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { fullname, email, password, confirmPassword } = formData;
    const [errors, setErrors] = useState({});
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clear previous errors
            setErrors({});

            // Check if passwords match
            if (password !== confirmPassword) {
                throw new Error("Passwords don't match");
            }

            // Dispatch registerAsync action
            await dispatch(registerAsync({ email, password }));

            // Reset form data
            setFormData({
                fullname: '',
                email: '',
                password: '',
                confirmPassword: '',
            });

            // Show success toast message
            setToastType('success');
            setToastMessage('Signup successful');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            // Redirect to homepage
            
        } catch (error) {
            console.error(error);
            // Show error toast message
            setToastType('error');
            setToastMessage('Signup failed');
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
                                Already have an account?  
                                <Link to="/login">
                                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => {console.log('hhhh')}} style={{ color: '#F04520' }}>Login here</a>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {toastMessage && (
        <div className="bg-green-500 text-white py-3 text-center fixed bottom-0 left-0 right-0">

        <div className={`bg-${toastType === 'success' ? 'green' : 'red'}-500 text-white px-6 py-3 rounded-lg shadow-md`}>
            {toastMessage}
        </div>
    </div>
            )}
        </section>
    );
}

export default SignupContainer;
