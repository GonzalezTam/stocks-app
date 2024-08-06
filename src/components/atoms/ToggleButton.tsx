import React from 'react';
import { ToggleButton as MUIToggleButton } from '@mui/material';

interface ToggleButtonProps {
  value: string;
  label: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, label }) => (
  <MUIToggleButton value={value} size="small">
    {label}
  </MUIToggleButton>
);

export default ToggleButton;
