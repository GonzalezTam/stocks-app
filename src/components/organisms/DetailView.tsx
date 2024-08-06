import React, { useState, useEffect } from 'react';
import { MarketType, SearchModeType } from '../../types';
import { IntervalEnum, SearchModeEnum } from '../../enums';
import { useFetchStockDetail } from '../../hooks/useFetchStockDetail';
import { intervalToMs } from '../../utils/time';
import { Box, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import Chart from '../molecules/Chart';
import DateAndIntervalSelector from '../molecules/DateAndIntervalSelector';
import dayjs, { Dayjs } from 'dayjs';

interface StockDetailViewProps {
  symbol: string;
  market: MarketType;
}

const StockDetailView: React.FC<StockDetailViewProps> = ({
  symbol,
  market,
}) => {
  const [intervalState, setIntervalState] = useState<string>(
    IntervalEnum.MIN_15,
  );
  const [currentMode, setCurrentMode] = useState<SearchModeType>(
    SearchModeEnum.REAL_TIME,
  );
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().subtract(1, 'day'),
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const { data, error, loading, refetch } = useFetchStockDetail(
    symbol,
    market,
    intervalState,
    startDate,
    endDate,
  );

  const handleIntervalChange = (interval: string) => setIntervalState(interval);

  const handleSearchClick = (
    startDate: Dayjs | null,
    endDate: Dayjs | null,
  ) => {
    if (currentMode === SearchModeEnum.HISTORICAL) {
      setStartDate(startDate);
      setEndDate(endDate);
    }
  };

  const handleModeChange = (mode: SearchModeType) => {
    if (mode === SearchModeEnum.REAL_TIME) {
      setStartDate(dayjs().subtract(1, 'day'));
      setEndDate(dayjs());
    }
    setCurrentMode(mode);
  };

  useEffect(() => {
    if (currentMode === SearchModeEnum.REAL_TIME) {
      const interval = setInterval(() => {
        refetch();
      }, intervalToMs(intervalState));

      return () => clearInterval(interval);
    }
  }, [currentMode, intervalState, refetch]);

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
        }}
      >
        <ErrorIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      <DateAndIntervalSelector
        onIntervalChange={handleIntervalChange}
        onModeChange={handleModeChange}
        onSearchClick={handleSearchClick}
        isLoading={loading}
      />
      <Chart isLoading={loading} stock={data?.meta} values={data?.values} />
    </Box>
  );
};

export default StockDetailView;
