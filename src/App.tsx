import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import './style.scss';

import IndexPage from './pages/IndexPage';
import DebugPage from './pages/DebugPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/debug" element={<DebugPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
