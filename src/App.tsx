import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import IndexPage from './pages';
import DebugPage from './pages/debug';
import MiAuthPage from './pages/miauth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/debug" element={<DebugPage />} />
        <Route path="/miauth" element={<MiAuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
