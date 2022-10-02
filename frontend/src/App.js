import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AuthRoute from './authroute';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signup';
import SearchPage from './pages/search';
import ListingPage from './pages/listing';
import SponsorPage from './pages/sponsor';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} exact={true} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/listing/:id" element={<ListingPage />} />
            <Route path="/sponsor" element={<SponsorPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
