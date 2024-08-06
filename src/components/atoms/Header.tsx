import React from 'react';
import { Box, Typography } from '@mui/material';
import { TypographyType, TypographyVariantType } from '../../types';

interface HeaderProps {
  children: React.ReactNode;
  variant: TypographyVariantType;
  type: TypographyType;
  customStyles?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({
  children,
  variant,
  type,
  customStyles,
}) => {
  return (
    <Box mb={2} textAlign="center">
      <Typography variant={variant} component={type} sx={customStyles}>
        {children}
      </Typography>
    </Box>
  );
};

export default Header;
