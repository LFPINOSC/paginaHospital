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
          onClick={() => handleNavigation("estadoCivil")}
        >
          Estado civil
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => handleNavigation("generos")}
        >
          Sexo
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
          color="secondary"
          fullWidth
          onClick={() => handleNavigation("medicamentos")}
        >
          Exámenes
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("consultorios")}
        >
          Consultorios
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("especialidades")}
        >
          Medicos
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("medicos")}
        >
          Medicos
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("turnos")}
        >
          Turnos
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("facturar")}
        >
          Facturar
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("atencion")}
        >
          Atencion
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("ordenDeExamenes")}
        >
          Orden de examens
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("recetaMedica")}
        >
          Receta medica
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleNavigation("tratamiento")}
        >
          Tratamiento
        </Button>
      </Stack>
    </Paper>
  );
}
