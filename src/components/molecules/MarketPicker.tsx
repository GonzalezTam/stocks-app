import React from "react";
import { Box, FormControl, ToggleButtonGroup, Typography } from "@mui/material";
import ToggleButton from "../atoms/ToggleButton";
import { MarketType } from "../../types";

interface MarketPickerProps {
  market: MarketType;
  onChange: (event: React.MouseEvent<HTMLElement>, newMarket: MarketType) => void;
}
const MARKETS: readonly MarketType[] = ["NYSE", "NASDAQ", "BCBA"];

const MarketPicker: React.FC<MarketPickerProps> = ({
  market,
  onChange,
}) => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <FormControl component="fieldset" sx={{ mb: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Pick a market to filter the stocks
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={market}
        exclusive
        onChange={onChange}
        aria-label="market"
        sx={{ justifyContent: "center" }}
      >
        {MARKETS.map((market) => (
          <ToggleButton key={market} value={market} label={market} />
        ))}
      </ToggleButtonGroup>
    </FormControl>
  </Box>
);

export default MarketPicker;
