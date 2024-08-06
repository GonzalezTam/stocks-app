import React, { useState } from "react";
import { SearchModeType, SearchIntervalType } from "../../types";
import {
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface DateAndIntervalSelectorProps {
  onIntervalChange: (interval: SearchIntervalType) => void;
  onSearchClick: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
  onModeChange: (mode: SearchModeType) => void;
  isLoading: boolean;
}

const SEARCH_MODES: SearchModeType[] = ["real-time", "historical"];
const INTERVALS: SearchIntervalType[] = ["1min", "5min", "15min"];

const DateAndIntervalSelector: React.FC<DateAndIntervalSelectorProps> = ({
  onIntervalChange,
  //onDateRangeChange,
  onModeChange,
  onSearchClick,
  isLoading,
}) => {
  const [mode, setMode] = useState<SearchModeType>("real-time");
  const [interval, setInterval] = useState<string>("5min");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleModeChange = (event: SelectChangeEvent<string>) => {
    const selectedMode = event.target.value as SearchModeType;
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
    endDate: Dayjs | null
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
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          alignItems: "center",
          marginLeft: { xs: 0, sm: 5 },
        }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          sx={(theme) => ({
            marginBottom: { xs: 2, sm: 0 },
            marginRight: { sm: 2 },
            minWidth: "120px",
            backgroundColor: theme.palette.common.white,
          })}
        >
          <InputLabel>Mode</InputLabel>
          <Select value={mode} onChange={handleModeChange} label="Mode">
            {SEARCH_MODES.map((mode) => (
              <MenuItem key={mode} value={mode}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          sx={(theme) => ({
            minWidth: 100,
            backgroundColor: theme.palette.common.white,
          })}
        >
          <InputLabel>Interval</InputLabel>
          <Select
            value={interval}
            onChange={handleIntervalChange}
            label="Interval"
          >
            {INTERVALS.map((interval) => (
              <MenuItem key={interval} value={interval}>
                {interval}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          alignItems="center"
        >
          <DateTimePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            maxDateTime={endDate || undefined}
            disabled={mode === "real-time"}
            sx={(theme) => ({
              width: { xs: "100%", sm: "auto" },
              backgroundColor:
                mode === "real-time"
                  ? theme.palette.grey[100]
                  : theme.palette.common.white,
            })}
          />
          <DateTimePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            minDateTime={startDate || undefined}
            disabled={mode === "real-time"}
            sx={(theme) => ({
              width: { xs: "100%", sm: "auto" },
              backgroundColor:
                mode === "real-time"
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
          disabled={inValidDateSelection(startDate, endDate) || isLoading}
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </LocalizationProvider>
    </Box>
  );
};

export default DateAndIntervalSelector;
