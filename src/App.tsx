import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainTemplate from './templates/MainTemplate';
import TablePage from './pages/TablePage';
import StockPage from './pages/StockPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route element={<MainTemplate />}>
        <Route path="/" element={<TablePage />} />
        <Route path="/:market/:symbol" element={<StockPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
