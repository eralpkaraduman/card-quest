import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HomeScreen} from '@screens/HomeScreen.web';
import {CardsScreen} from '@screens/CardsScreen.web';
import {defaultTheme} from './theme';
import {ThemeProvider} from 'styled-components/native';

export function App(): React.ReactElement {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomeScreen />} />
            <Route path="cards" element={<CardsScreen />} />
            <Route path="*" element={<HomeScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
