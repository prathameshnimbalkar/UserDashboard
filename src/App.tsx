import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormOne from './Components/Forms/FormOne';
import FormTwo from './Components/Forms/FormTwo';
import FormThree from './Components/Forms/FormThree';
import Profile from './Components/Profile/Profile';
import {DashboardView}  from './Components/Dashboard';
import { NavigationProvider } from './Components/Helper/NavigationContext';

function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <Routes>
          <Route path='/' element={<DashboardView />}>
            <Route path="/one" element={<FormOne />} />
            <Route path="/two" element={<FormTwo />} />
            <Route path="/three" element={<FormThree />} />
          </Route>
        <Route path="/profile" element={<Profile />} />
        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;
