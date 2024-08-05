import React from "react";
import DetailView from "../components/organisms/DetailView";
import { useParams } from "react-router-dom";

const StockPage: React.FC = () => {
  const { market, symbol } = useParams<{ market: string; symbol: string }>();

  return (
    <div>
      <h1>Stock Detail {market}</h1>
      {symbol && <DetailView symbol={symbol} />}
      {!symbol && <p>Invalid stock</p>}
    </div>
  );
};

export default StockPage;
