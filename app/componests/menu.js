"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";

export default function Menu() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(`/dashboard?view=${path}`);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        width: 250, 
        p: 3, 
        borderRadius: 2, 
        backgroundColor: "#f5f5f5" 
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Menú
      </Typography>
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => handleNavigation("personas")}
        >
          Personas
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => handleNavigation("examenes")}
        >
          Exámenes
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("ordenesform")}
        >
          Ingresar Órdenes
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("ordeneslist")}
        >
          Listar Órdenes
        </Button>
      </Stack>
    </Paper>
  );
}
