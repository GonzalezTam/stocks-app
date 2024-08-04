import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TablePage from "./pages/TablePage";
import StockPage from "./pages/StockPage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TablePage />} />
      <Route path="/stock/:symbol" element={<StockPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
