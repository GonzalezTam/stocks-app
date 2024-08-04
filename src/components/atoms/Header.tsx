import React from "react";
import { Box, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Header: React.FC<HeaderProps> = ({ title, type }) => {
  return (
    <Box mb={2} textAlign="center">
      <Typography variant="h2" component={type}>
        {title}
      </Typography>
    </Box>
  );
};

export default Header;