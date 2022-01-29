import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import BasicLayout from './layout/BasicLayout';

import IndexPage from './pages';
import DebugPage from './pages/debug';
import MiAuthPage from './pages/miauth';

function App() {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/miauth" element={<MiAuthPage />} />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
}

export default App;
