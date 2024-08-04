import React from "react";
import { Typography, Paper, Box } from "@mui/material";

interface StockDetailProps {
  stock: { symbol: string; data: any[] };
}

const StockDetail: React.FC<StockDetailProps> = ({ stock }) => {
  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          {stock.symbol}
        </Typography>
        <Typography variant="body1">
          {/* Renderiza aquí los detalles del stock */}
          Histórico:
        </Typography>
        {stock.data.map((item, index) => (
          <Box key={index} mt={2}>
            <Typography variant="body2">
              {item.date}: {item.close}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default StockDetail;
