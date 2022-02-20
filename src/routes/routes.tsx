import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/dashboard';
import Repository from '../pages/Repository/repository';

export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/repository/:authorName/:repositoryName"
          element={<Repository />}
        />
      </Routes>
    </BrowserRouter>
  );
}
