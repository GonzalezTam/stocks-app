import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TablePage from "./pages/TablePage";
import StockPage from "./pages/StockPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/stock/:id" element={<StockPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
