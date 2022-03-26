import React from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {HomeScreen} from '@screens/HomeScreen.web';
import {CardsScreen} from '@screens/CardsScreen.web';
import {GameScreen} from '@screens/GameScreen.web';
import {PageLayout} from '@components/PageLayout.web';
import {CardDetailModal} from '@components/CardDetailModal.web';
import {CardsPageDetailSection} from '@components/CardsPageDetailSection.web';
import {BattleLogScreen} from '@screens/BattleLogScreen.web';

import './styles.css';

export function App(): React.ReactElement {
  const location = useLocation();
  const state = location.state as {backgroundLocation?: Location};
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="cards" element={<CardsScreen />}>
            <Route path=":id" element={<CardsPageDetailSection />} />
          </Route>
          <Route path="game" element={<GameScreen />} />
          <Route path="battle-log" element={<BattleLogScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/cards/:id" element={<CardDetailModal />} />
        </Routes>
      )}
    </>
  );
}
