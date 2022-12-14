import React, {useEffect} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AuthRoute from './authroute';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signup';
import SearchPage from './pages/search';
import ListingPage from './pages/listing';
import SponsorPage from './pages/sponsor';
import PortalPage from './pages/portal';
import EditListing from './pages/editlisting';
import Profile from './pages/profile';
import SponsorSearch from './pages/sponsorsearch';

import Geocode from "react-geocode";
import {GEOCODE_API_KEY} from './var';

function App() {
  useEffect(() => {
    Geocode.setApiKey(GEOCODE_API_KEY);
  }, [])

  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} exact={true} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/listing/:id" element={<ListingPage />} />
            <Route path="/my-yard" element={<><AuthRoute element={PortalPage} /></>} />
            <Route path="/settings" element={<><AuthRoute element={Profile} /></>} />
            <Route path="/my-yard/:id" element={<><AuthRoute element={EditListing} /></>} />
            <Route path="/sponsor" element={<SponsorPage />} />
            <Route path="/sponsor-search" element={<SponsorSearch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
