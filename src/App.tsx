import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Cemetery } from './pages/Cemetery';
import { DeathDetails } from './pages/DeathDetails';
import { Timeline } from './pages/Timeline';
import { Statistics } from './pages/Statistics';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cemetery" element={<Cemetery />} />
          <Route path="/deaths/:id" element={<DeathDetails />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
