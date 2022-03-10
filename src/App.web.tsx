import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {HomeScreen} from '@screens/HomeScreen.web';
import {CardsScreen} from '@screens/CardsScreen.web';
import {GameScreen} from '@screens/GameScreen.web';
import {defaultTheme} from './theme';
import {ThemeProvider} from 'styled-components/native';
import {PageLayout} from '@components/PageLayout.web';
import {BattleLogScreen} from '@screens/BattleLogScreen.web';

import './styles.css';

export function App(): React.ReactElement {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<HomeScreen />} />
            <Route path="cards" element={<CardsScreen />} />
            <Route path="game" element={<GameScreen />} />
            <Route path="battle-log" element={<BattleLogScreen />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
