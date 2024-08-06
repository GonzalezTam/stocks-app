import React from 'react';
import { Container } from '@mui/material';
import StocksListView from '../components/organisms/StocksListView';
import Header from '../components/atoms/Header';

const TablePage: React.FC = () => {
  return (
    <Container sx={{ mt: 3, mb: 4 }}>
      <Header variant="h2" type="h1">
        STOCKS OVERVIEW
      </Header>
      <StocksListView />
    </Container>
  );
};

export default TablePage;
