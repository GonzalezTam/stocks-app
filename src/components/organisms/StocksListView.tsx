import React, { useState, useEffect } from "react";
import { useFetchStockList } from "../../hooks/useFetchStockList";
import { MarketType } from "../../types";
import { Box } from "@mui/material";
import Table from "../molecules/Table";
import MarketPicker from "../molecules/MarketPicker";
import SearchInput from "../atoms/SearchInput";

const StocksListView: React.FC = () => {
  const [market, setMarket] = useState<MarketType>("NYSE");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [symbolFilter, setSymbolFilter] = useState<string>("");
  const { data, loading, error } = useFetchStockList(market);

  const handleMarketChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMarket: MarketType | null
  ) => {
    if (newMarket !== null) setMarket(newMarket);
  }

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameFilter(event.target.value);
  };

  const handleSymbolFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSymbolFilter(event.target.value);
  };

  const filteredData = data?.filter(
    (stock) =>
      stock.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      stock.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
  );

  useEffect(() => {
    setNameFilter("");
    setSymbolFilter("");
  }, [market]);

  return (
    <Box mt={2}>
      <MarketPicker market={market} onChange={handleMarketChange} />
      <Box mb={2} display="flex" justifyContent="center" gap={1}>
        <SearchInput
          customStyles={{ backgroundColor: "#fff" }}
          label="Search by symbol"
          value={symbolFilter}
          helperText="e.g. MRK"
          onChange={handleSymbolFilterChange}
          disabled={loading}
        />
        <SearchInput
          customStyles={{ backgroundColor: "#fff" }}
          label="Search by name"
          value={nameFilter}
          helperText="e.g. Merck & Co Inc"
          onChange={handleNameFilterChange}
          disabled={loading}
        />
      </Box>
      <Table data={filteredData} loading={loading} error={error} />
    </Box>
  );
};

export default StocksListView;
