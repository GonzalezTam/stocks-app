import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MarketType, StockInterface } from '../types';
import { Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/atoms/Header';
import CustomLink from '../components/atoms/CustomLink';
import StockDetailView from '../components/organisms/DetailView';

const validMarkets: MarketType[] = ['NYSE', 'NASDAQ', 'BCBA'];

const StockPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { market, symbol } = useParams<{ market: string; symbol: string }>();
  const stock = location.state?.stock as StockInterface;

  useEffect(() => {
    if (!market || !validMarkets.includes(market.toUpperCase() as MarketType))
      navigate('/404');
  }, [market, navigate]);

  return (
    <Container sx={{ mt: 3, mb: 4 }}>
      <Header
        variant="h4"
        type="h2"
        customStyles={{ display: 'flex', alignItems: 'center' }}
      >
        <CustomLink
          to="/"
          customStyles={{ marginRight: '1rem', display: 'flex' }}
        >
          <ArrowBackIcon />
        </CustomLink>
        <Typography
          variant="body1"
          fontSize={20}
          fontWeight={500}
          noWrap
          overflow={'auto'}
          sx={{ textOverflow: 'unset' }}
        >
          {stock ? (
            <Typography
              variant="body1"
              fontSize={20}
              fontWeight={400}
              noWrap
              overflow={'auto'}
              sx={{ textOverflow: 'unset' }}
            >
              <strong>{stock?.symbol}</strong> - {stock?.name} -{' '}
              {stock?.currency}
            </Typography>
          ) : (
            <Typography
              variant="body1"
              fontSize={20}
              fontWeight={500}
              noWrap
              overflow={'auto'}
              sx={{ textOverflow: 'unset' }}
            >
              {symbol?.toUpperCase()}
            </Typography>
          )}
        </Typography>
      </Header>
      <StockDetailView
        market={market as MarketType}
        symbol={symbol as string}
      />
    </Container>
  );
};

export default StockPage;
