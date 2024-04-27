import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css'
import LoginContainer from './containers/login/LoginContainer';
import SignupContainer from './containers/signup/SignupContainer';
import HomeContainer from './containers/HomeContainer';
import EventContainer from './containers/EventContainer';
import DashboardContainer from './containers/dashboard/EventMagament';
import Notfound from './containers/NotFound';
import { useState } from 'react';
const App = () => {

  const [userRole, setUserRole] = useState('admin');

  const isAdmin = () => {
      return userRole === 'admin';
  };
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeContainer/>} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/signup' element={<SignupContainer/>} />
          <Route path='/events' element={<EventContainer/>} />
          <Route path='/dashboard' element={<DashboardContainer/>} />
          {/* {isAdmin() ? (
                        <Route path="/admin" element={<AdminDashboard />} />
                    ) : (
                        <Route path="/admin" element={<Navigate to="/" replace />} />
                    )} */}
          

          <Route path='*' element={<Notfound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;