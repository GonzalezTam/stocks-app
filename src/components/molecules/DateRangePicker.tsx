import React from 'react';
import { Box } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface DateRangePickerProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
  disabled: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  disabled,
}) => (
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
        onChange={onStartDateChange}
        maxDateTime={endDate || undefined}
        disabled={disabled}
        sx={(theme) => ({
          width: { xs: '100%', sm: 'auto' },
          backgroundColor: disabled
            ? theme.palette.grey[100]
            : theme.palette.common.white,
        })}
      />
      <DateTimePicker
        label="End Date"
        value={endDate}
        onChange={onEndDateChange}
        minDateTime={startDate || undefined}
        disabled={disabled}
        sx={(theme) => ({
          width: { xs: '100%', sm: 'auto' },
          backgroundColor: disabled
            ? theme.palette.grey[100]
            : theme.palette.common.white,
        })}
      />
    </Box>
  </LocalizationProvider>
);

export default DateRangePicker;
