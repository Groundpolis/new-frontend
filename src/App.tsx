import React, { useMemo } from 'react';
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
import NotificationsPage from './pages/notifications';
import ManagePage from './pages/manage';

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
          <Route path="/notifications" element={<NotificationsPage />}/>
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/miauth" element={<MiAuthPage />} />
        </Routes>
      </CurrentLayout>
    </BrowserRouter>
  );
}

export default App;
