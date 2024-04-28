import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../components/button/Button';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../redux/Auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import isAdmin from '../../utils/auth'
import { decodeToken } from 'react-jwt';
const BaseURL = import.meta.env.VITE_REACT_BASE_URL;

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL:BaseURL , // Replace with your API base URL
});

function LoginContainer() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
const dispatch =useDispatch()
const navigate = useNavigate()
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const token = localStorage.getItem('token');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginAsync({ 
                email: formData.email,
                password: formData.password,
            }));
            setToastMessage('Login successful');
            setToastType('success');
        } catch (error) {
            console.error('Login error:', error);
            setToastMessage('Login failed. Please try again.');
            setToastType('error');
        }

    };
    useEffect(() => {
        if (token !== null) {
            const tokenDecoded = decodeToken(token);
            const {userId,isAdmin}=tokenDecoded

            if(isAdmin==true){
                navigate('/dashboard')
            }else(
                navigate('/')
            )
            
        }
        else{
            navigate('/login')
        }
    }, [dispatch,  token]);

    return (
        <section className="bg-white-50 dark:bg-white-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-grey rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-black-900 md:text-2xl dark:text-black">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black-900 dark:text-black">Your email</label>
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
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black-900 dark:text-black">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="bg-white-50 border border-gray-300 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
  type="submit"
  style={{ background:"#F04520",Color:'black'}}
  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
  Login
</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?  
                                <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500" style={{ color: '#F04520' }}>
                                Sign up
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

export default LoginContainer;
