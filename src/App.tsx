import React, { useEffect, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import BasicLayout from './layout/BasicLayout';
import IndexPage from './pages';
import DebugPage from './pages/debug';
import MiAuthPage from './pages/miauth';
import { useBackgroundTask } from './hooks/useBackgroundTask';
import SettingsPage from './pages/settings';
import ZenLayout from './layout/ZenLayout';
import { useAppSelector } from './store';

function App() {
  useBackgroundTask();

  const {layoutType} = useAppSelector(state => state.screen);

  const CurrentLayout = useMemo(() => {
    switch (layoutType) {
    case 'basic': return BasicLayout;
    case 'zen': return ZenLayout;
    default: return BasicLayout;
    }
  }, [layoutType]);

  return (
    <BrowserRouter>
      <CurrentLayout>
        <Routes>
          <Route path="/" element={<IndexPage />}/>
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/miauth" element={<MiAuthPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </CurrentLayout>
    </BrowserRouter>
  );
}

export default App;
