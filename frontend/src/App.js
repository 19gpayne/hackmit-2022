import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/homepage';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} exact={true} />
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
