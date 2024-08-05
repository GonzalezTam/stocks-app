import React from "react";
import { Container } from "@mui/material";
import StocksListView from "../components/organisms/StocksListView";
import Header from "../components/atoms/Header";

const TablePage: React.FC = () => {
  return (
    <Container sx={{ mt: 3, mb: 3 }}>
      <Header type="h1" title="STOCKS OVERVIEW" />
      <StocksListView />
    </Container>
  );
};

export default TablePage;
