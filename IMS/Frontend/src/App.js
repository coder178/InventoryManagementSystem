import './App.css';
import Login from './Components/Login/index';
import PasswordReset from './Components/Login/passwordReset';
import ForgotPassword from './Components/Login/forgotPassword';
import Home from './Components/Home/index'
import Items from './Components/Pages/Items/index';
import Maintenance from './Components/Pages/Maintenance/index';
import Scrap from './Components/Pages/Scrap/index';
import Resell from './Components/Pages/Resell/index';
import Reports from './Components/Pages/Reports/Reports/index';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/passwordReset' element={<PasswordReset />} />
          <Route path='/ForgotPassword/:id/:token' element={<ForgotPassword />} />
          <Route path='/home' element={<Home />} />

          <Route path='items' element={<Items />} />
          <Route path='maintenance' element={< Maintenance />} />
          <Route path='scrap' element={<Scrap />} />
          <Route path='resell' element={<Resell />} />
          <Route path='reports' element={<Reports />} />

        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;
