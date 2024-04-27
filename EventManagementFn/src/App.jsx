import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css'
import LoginContainer from './containers/login/LoginContainer';
import SignupContainer from './containers/signup/SignupContainer';
import HomeContainer from './containers/HomeContainer';
import EventContainer from './containers/EventContainer';
import DashboardContainer from './containers/dashboard/EventMagament';
import Notfound from './containers/NotFound';

import { useState } from 'react';
import BookingContainer from './containers/BookingContainer';


const App = () => {
  

  const [userRole, setUserRole] = useState('');
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeContainer/>} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/signup' element={<SignupContainer/>} />
          <Route path='/events' element={<EventContainer/>} />
          {/* <Route path='/dashboard' element={<DashboardContainer/>} /> */}
          <Route path='/dashboard' element={<DashboardContainer userRole={userRole} />} />
          <Route path='/login' element={<LoginContainer setUserRole={setUserRole} />} />
          <Route path='/booking' element={<BookingContainer/>} />

          

          

          <Route path='*' element={<Notfound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;