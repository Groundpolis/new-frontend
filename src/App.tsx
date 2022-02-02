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
import { useAppDispatch, useAppSelector } from './store';
import NotificationsPage from './pages/notifications';
import ManagePage from './pages/manage';
import { BREAKPOINT_LAPTOP, BREAKPOINT_SM, BREAKPOINT_TB } from './const';
import { setLaptop, setMobile, setTablet } from './store/screen';

function App() {
  useBackgroundTask();

  const dispatch = useAppDispatch();
  const {layoutType} = useAppSelector(state => state.screen);

  useEffect(() => {
    const qTablet = window.matchMedia(`(max-width: ${BREAKPOINT_TB})`);
    const qMobile = window.matchMedia(`(max-width: ${BREAKPOINT_SM})`);
    const qLaptop = window.matchMedia(`(max-width: ${BREAKPOINT_LAPTOP})`);
    const syncMobile = (ev: MediaQueryListEvent) => dispatch(setMobile(ev.matches));
    const syncTablet = (ev: MediaQueryListEvent) => dispatch(setTablet(ev.matches));
    const syncLaptop = (ev: MediaQueryListEvent) => dispatch(setLaptop(ev.matches));
    dispatch(setMobile(qMobile.matches));
    dispatch(setTablet(qTablet.matches));
    dispatch(setLaptop(qTablet.matches));
    qTablet.addListener(syncTablet);
    qMobile.addListener(syncMobile);
    qLaptop.addListener(syncLaptop);
		
    return () => {
      qTablet.removeListener(syncTablet);
      qMobile.removeListener(syncMobile);
      qLaptop.removeListener(syncLaptop);
    };
  }, []);

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
