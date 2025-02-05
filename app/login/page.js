"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth`, data);
      const { token } = response.data.data;

      // Guarda el token en localStorage
      localStorage.setItem("token", token);

      // Redirige a la pantalla principal
      router.push("/dashboard");
    } catch (err) {
      setError("Credenciales inválidas. Por favor, intente de nuevo.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Inicio de Sesión
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Usuario"
            {...register("username", { required: "El valor es obligatorio" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            {...register("password", { required: "El valor es obligatorio" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ py: 1.5, mt: 2 }}
        >
          Ingresar
        </Button>
      </form>
    </Box>
  );
}
