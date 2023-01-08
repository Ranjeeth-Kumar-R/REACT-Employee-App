import React from 'react';
import './App.css';


import { Home } from './Components/Home';
import { Department } from './Components/Department';
import { Employee } from './Components/Employee';
import { Navigation } from './Components/Navigation';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="Container">
        {/* <Home/>
        <Department/>
        <Employee/> */}
        <h3 className='m-3 d-flex justify-content-center'>React Js with Web Api Demo</h3>
        <h5 className='m-3 d-flex justify-content-center'>Employee Management Portal</h5>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/Department' element={<Department />} />
          <Route path='/Employee' element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
