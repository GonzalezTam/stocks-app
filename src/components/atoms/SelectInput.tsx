import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface SelectControlProps {
  label: string;
  value: string;
  options: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
}

const SelectControl: React.FC<SelectControlProps> = ({
  label,
  value,
  options,
  onChange,
}) => (
  <FormControl variant="outlined" fullWidth sx={{ minWidth: 120 }}>
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={onChange} label={label}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectControl;
