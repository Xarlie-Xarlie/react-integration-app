import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/dashboard';
import Repository from '../pages/Repository/repository';

const routes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/repository" element={<Repository />} />
    </Routes>
  </BrowserRouter>
);

export default routes;
