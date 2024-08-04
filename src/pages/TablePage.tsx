import React from "react";
import { Container } from "@mui/material";
import StocksListView from "../components/organisms/StocksListView";
import Header from "../components/atoms/Header";

const TablePage: React.FC = () => {
  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Header type="h1" title="STOCKS OVERVIEW" />
      <StocksListView />
    </Container>
  );
};

export default TablePage;
