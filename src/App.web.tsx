import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home} from '@screens/Home.web';

export function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
