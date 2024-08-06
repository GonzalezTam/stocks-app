import React, { useState } from 'react';
import { SearchModeType, SearchIntervalType } from '../../types';
import { SearchModeEnum, IntervalEnum } from '../../enums';
import { Box, FormControl, Button, SelectChangeEvent } from '@mui/material';
import SelectInput from '../atoms/SelectInput';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface DateAndIntervalSelectorProps {
  onIntervalChange: (interval: SearchIntervalType) => void;
  onSearchClick: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
  onModeChange: (mode: SearchModeType) => void;
  isLoading: boolean;
}

const DateAndIntervalSelector: React.FC<DateAndIntervalSelectorProps> = ({
  onIntervalChange,
  onModeChange,
  onSearchClick,
  isLoading,
}) => {
  const [mode, setMode] = useState<SearchModeType>(SearchModeEnum.REAL_TIME);
  const [interval, setInterval] = useState<string>(IntervalEnum.MIN_15);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleModeChange = (event: SelectChangeEvent<string>) => {
    const selectedMode = event.target.value as SearchModeType;
    if (selectedMode === SearchModeEnum.REAL_TIME) {
      setStartDate(null);
      setEndDate(null);
    } else {
      setStartDate(dayjs().subtract(1, 'day'));
      setEndDate(dayjs());
    }
    setMode(selectedMode);
    onModeChange(selectedMode);
  };

  const handleIntervalChange = (event: SelectChangeEvent<string>) => {
    const selectedInterval = event.target.value as SearchIntervalType;
    setInterval(selectedInterval);
    onIntervalChange(selectedInterval);
  };

  const handleSearchClick = () => {
    if (inValidDateSelection(startDate, endDate)) return;
    onSearchClick(startDate, endDate);
  };

  const inValidDateSelection = (
    startDate: Dayjs | null,
    endDate: Dayjs | null,
  ) => {
    if (!startDate || !endDate) return true;
    if (!startDate.isValid() || !endDate.isValid()) return true;
    if (startDate.isAfter(endDate)) return true;
    return false;
  };

  return (
    <Box
      sx={{
        marginTop: { xs: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: { xs: 'block', sm: 'flex' },
          alignItems: 'center',
          marginLeft: { xs: 0, sm: 5 },
        }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          sx={(theme) => ({
            marginBottom: { xs: 2, sm: 0 },
            marginRight: { sm: 2 },
            minWidth: '120px',
            backgroundColor: theme.palette.common.white,
          })}
        >
          <SelectInput
            label="Mode"
            value={mode}
            onChange={handleModeChange}
            options={Object.values(SearchModeEnum)}
          />
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          sx={(theme) => ({
            minWidth: 100,
            backgroundColor: theme.palette.common.white,
          })}
        >
          <SelectInput
            label="Interval"
            value={interval}
            onChange={handleIntervalChange}
            options={Object.values(IntervalEnum)}
          />
        </FormControl>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          alignItems="center"
        >
          <DateTimePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            maxDateTime={endDate || undefined}
            disabled={mode === SearchModeEnum.REAL_TIME}
            sx={(theme) => ({
              width: { xs: '100%', sm: 'auto' },
              backgroundColor:
                mode === SearchModeEnum.REAL_TIME
                  ? theme.palette.grey[100]
                  : theme.palette.common.white,
            })}
          />
          <DateTimePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            minDateTime={startDate || undefined}
            disabled={mode === SearchModeEnum.REAL_TIME}
            sx={(theme) => ({
              width: { xs: '100%', sm: 'auto' },
              backgroundColor:
                mode === SearchModeEnum.REAL_TIME
                  ? theme.palette.grey[100]
                  : theme.palette.common.white,
            })}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginLeft: { xs: 0, sm: 2 } }}
          disabled={
            inValidDateSelection(startDate, endDate) ||
            mode === SearchModeEnum.REAL_TIME ||
            isLoading
          }
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </LocalizationProvider>
    </Box>
  );
};

export default DateAndIntervalSelector;
