import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css'
import LoginContainer from './containers/login/LoginContainer';
import SignupContainer from './containers/signup/SignupContainer';
import HomeContainer from './containers/HomeContainer';
import EventContainer from './containers/EventContainer';
import DashboardContainer from './containers/dashboard/EventMagament';
import Notfound from './containers/NotFound';
import BookingContainer from './containers/BookingContainer';
import AdminNavigation from './outlets/AdminNavigation';
import AdminRoutes from './outlets/AdminRoutes';
import UserRoutes from './outlets/UserRoutes';
import IsLoggedIn from './outlets/IsLoggedIn';



const App = () => {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeContainer/>} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/signup' element={<SignupContainer/>} />
          <Route path='/events' element={<EventContainer/>} />         
          <Route element={<IsLoggedIn />}>
          <Route path='/login' element={<LoginContainer />} />

          </Route>                  
          <Route element={<UserRoutes />}>
          <Route path='/booking' element={<BookingContainer/>} />
          </Route>
          <Route element={<AdminRoutes />}>
          <Route path='/dashboard' element={<DashboardContainer  />} />
          </Route>
          <Route path='/admin/unauthorized' element={<AdminNavigation />} />      
          <Route path='*' element={<Notfound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;