import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MarketType } from "../types";
import { Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../components/atoms/Header";
import CustomLink from "../components/atoms/CustomLink";
import StockDetailView from "../components/organisms/DetailView";

const validMarkets: MarketType[] = ["NYSE", "NASDAQ", "BCBA"];

const StockPage: React.FC = () => {
  const { market, symbol } = useParams<{ market: string; symbol: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!market || !validMarkets.includes(market as MarketType))
      navigate("/404");
  }, [market, navigate]);

  return (
    <Container sx={{ mt: 3, mb: 4 }}>
      <Header
        variant="h4"
        type="h2"
        customStyles={{ display: "flex", alignItems: "center" }}
      >
        <CustomLink
          to="/"
          customStyles={{ marginRight: "1rem", display: "flex" }}
        >
          <ArrowBackIcon />
        </CustomLink>
        {market} - {symbol}
      </Header>
      <StockDetailView
        market={market as MarketType}
        symbol={symbol as string}
      />
    </Container>
  );
};

export default StockPage;
