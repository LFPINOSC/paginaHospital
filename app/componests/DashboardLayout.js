"use client";

import React from "react";
import Menu from "./menu";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
  Paper,
} from "@mui/material";

export default function DashboardLayout({ children, user, cerrarSesion }) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {/* Barra de navegación superior */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bienvenido al sistema, {user?.nombres}
          </Typography>
          <Button color="inherit" onClick={cerrarSesion}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Box sx={{ display: "flex", flex: 1, mt: 8 }}> {/* mt: Espacio para AppBar */}
        {/* Menú lateral */}
        <Box
          sx={{
            width: 250,
            flexShrink: 0,
            bgcolor: "background.paper",
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <Menu />
        </Box>

        {/* Contenido dinámico */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: 3,
            overflow: "auto",
            bgcolor: "#f8f9fa",
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
}
