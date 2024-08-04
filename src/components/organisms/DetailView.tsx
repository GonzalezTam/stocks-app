import React from "react";
import Detail from "../molecules/Detail";
import { useFetchStockDetail } from "../../hooks/useFetchStockDetail";
import { CircularProgress, Box } from "@mui/material";

interface StockDetailViewProps {
  symbol: string;
}

const StockDetailView: React.FC<StockDetailViewProps> = ({ symbol }) => {
  const { data, loading } = useFetchStockDetail(symbol);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box mt={2}>
      <Detail stock={{ symbol, data }} />
    </Box>
  );
};

export default StockDetailView;
