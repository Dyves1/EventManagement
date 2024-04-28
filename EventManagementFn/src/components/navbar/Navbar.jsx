import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../navbar/Logo.png";
import { Link } from 'react-router-dom';
import { logout } from '../../redux/Auth/authSlice';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout =()=>{

try {
  dispatch(logout())
  setToastMessage('logout successful');
  setToastType('success');
  window.location.reload();
} catch (error) {
  console.error('Logout error:', error);
  setToastMessage('Logout failed. Please try again.');
  setToastType('error');
}
  }

  return (
<nav className="bg-white dark:bg-white-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="#" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black" style={{color:"#F04520"}}>EVENTUS</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

            {isLoggedIn?(
                        <button type="button"
          onClick={()=> handleLogout()}

                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        logout
                        </button>
            ):( 
              <Link to="/login">
          <button
           type="button" style={{background:'#F04520'}} className="text-black bg-#F04520-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Login
          </button>
          </Link>
            )}
          <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div className={`w-full md:block md:w-auto ${isOpen ? '' : 'hidden'}`} id="navbar-sticky">
          <ul style={{background:'white'}} className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-white-900 dark:border-white-700">
          <li>
              <Link to ='/' className="block py-2 px-3 text-black-900 rounded hover:bg-white-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-white-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-white-700">Home</Link>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-black-900 rounded hover:bg-white-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-white-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-white-700">About</a>
            </li>
            <li>
              <Link to ='/booking' className="block py-2 px-3 text-black-900 rounded hover:bg-white-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-white-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-white-700">My Bookings</Link>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-black-900 rounded hover:bg-white-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-white-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-white-700">Contact</a>
            </li>
          </ul>
        </div>
        {toastMessage && (
        <div className="bg-green-500 text-white py-3 text-center fixed bottom-0 left-0 right-0">

                    <div className={`bg-${toastType === 'success' ? 'green' : 'red'}-500 text-white px-6 py-3 rounded-lg shadow-md`}>
                        {toastMessage}
                    </div>
                </div>
            )}  
      </div>
    </nav>
  );
}

export default Navbar;
