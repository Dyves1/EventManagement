import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginContainer from './containers/login/LoginContainer';
import SignupContainer from './containers/signup/SignupContainer';
import HomeContainer from './containers/HomeContainer';
import EventContainer from './containers/EventContainer';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<HomeContainer/>} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/signup' element={<SignupContainer/>} />
          <Route path='/events' element={<EventContainer/>} />
          

          {/* <Route path='*' element={<NotFoundPage />} /> */}

        </Routes>
      </Router>
    </div>
  );
};

export default App;