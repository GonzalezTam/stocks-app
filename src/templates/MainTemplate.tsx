import React from "react";
import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainTemplate: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Stocks App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 2 }}>
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          bgcolor: (theme) => theme.palette.grey[100],
        }}
      >
        <Typography variant="body2" color="textSecondary">
          2024 - Coded by
          <a
            href="
            https://github.com/gonzalezTam"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "#000" }}
          >
            {" Agustin Tamburrino"}
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default MainTemplate;
