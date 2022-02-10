import { Stream } from 'misskey-js';
import React, { createContext, useEffect, useMemo } from 'react';
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom';
import { BREAKPOINT_LAPTOP, BREAKPOINT_SM, BREAKPOINT_TB } from './const';
import { useBackgroundTask } from './hooks/useBackgroundTask';
import BasicLayout from './layout/BasicLayout';
import ZenLayout from './layout/ZenLayout';
import IndexPage from './pages';
import DebugPage from './pages/debug';
import FeedbackPage from './pages/feedback';
import ManagePage from './pages/manage';
import MiAuthPage from './pages/miauth';
import NotePage from './pages/note';
import NotificationsPage from './pages/notifications';
import SettingsPage from './pages/settings';
import { useAppDispatch, useAppSelector } from './store';
import { setLaptop, setMobile, setTablet } from './store/screen';

export const StreamingContext = createContext<Stream | null>(null);

function App() {
  const stream = useBackgroundTask();

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
    dispatch(setLaptop(qLaptop.matches));
    qTablet.addEventListener('change', syncTablet);
    qMobile.addEventListener('change', syncMobile);
    qLaptop.addEventListener('change', syncLaptop);
		
    return () => {
      qTablet.removeEventListener('change', syncTablet);
      qMobile.removeEventListener('change', syncMobile);
      qLaptop.removeEventListener('change', syncLaptop);
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
    <StreamingContext.Provider value={stream}>
      <BrowserRouter>
        <CurrentLayout>
          <Routes>
            <Route path="/" element={<IndexPage />}/>
            <Route path="/notes/:noteId" element={<NotePage />}/>
            <Route path="/notifications" element={<NotificationsPage />}/>
            <Route path="/debug" element={<DebugPage />} />
            <Route path="/manage" element={<ManagePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/miauth" element={<MiAuthPage />} />
          </Routes>
        </CurrentLayout>
      </BrowserRouter>
    </StreamingContext.Provider>
  );
}

export default App;
