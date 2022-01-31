import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { KeepAlive } from 'react-keep-alive';

import BasicLayout from './layout/BasicLayout';
import IndexPage from './pages';
import DebugPage from './pages/debug';
import MiAuthPage from './pages/miauth';
import { useBackgroundTask } from './hooks/useBackgroundTask';

function App() {
  useBackgroundTask();

  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          <Route path="/" element={<IndexPage />}/>
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/miauth" element={<MiAuthPage />} />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
}

export default App;
