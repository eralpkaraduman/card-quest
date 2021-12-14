import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HomeScreen} from '@screens/HomeScreen.web';
import {CardsScreen} from '@screens/CardsScreen.web';

export function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomeScreen />} />
          <Route path="cards" element={<CardsScreen />} />
          <Route path="*" element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
