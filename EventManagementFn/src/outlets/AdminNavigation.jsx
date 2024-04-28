import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavigation = () => {
  return (
    <div className='navigate_page min-h-[80vh] flex flex-col items-center justify-center gap-12 max-w-[90%] mx-auto'>
      <h1 className='text-[3rem] text-center normal-case font-bold screen-mid:text-[2.5rem] screen-base:text-[2rem]'>
        This page is only accessible to administrators. Please log into your
        account.
      </h1>

<Link to="/login">
<button 
style={{background:'#F04520'}}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg--700 dark:focus:ring--800"
>

        Go to Login Page
      </button>
</Link>
    </div>
  );
};

export default AdminNavigation;