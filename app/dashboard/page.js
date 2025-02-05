"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import jwt from "jsonwebtoken";
import DashboardLayout from "../componests/DashboardLayout";
//import Personas from "../componests/Personas";
//import Examenes from "../componests/Examenes";
//import OrderForm from "../componests/OrdenForm";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // Tiempo restante de sesión
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Reaccionar cuando cambie el parámetro 'view' en la URL
    const viewParam = searchParams.get("view");
    if (viewParam) {
      setView(viewParam); // Actualizar el estado con la vista seleccionada
    }
  }, [searchParams]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.error("No se encontró ningún token.");
      router.push("/login");
    } else {
      try {
        const decoded = jwt.decode(storedToken);
        if (decoded.exp * 1000 < Date.now()) {
          console.error("El token ha expirado.");
          cerrarSesion();
          return;
        }
        setUser(decoded);
        // Calcular el tiempo hasta la expiración del token
        const timeUntilExpiration = decoded.exp * 1000 - Date.now();
        setTimeLeft(timeUntilExpiration); // Establecer tiempo restante al inicio

        // Configurar temporizador para cerrar sesión cuando expire el token
        const logoutTimer = setTimeout(() => {
          cerrarSesion();
        }, timeUntilExpiration);

        // Configurar un contador de tiempo que actualice cada segundo
        const intervalTimer = setInterval(() => {
          setTimeLeft((prevTimeLeft) => {
            if (prevTimeLeft <= 1000) {
              clearInterval(intervalTimer); // Detener el contador cuando se agote el tiempo
            }
            return prevTimeLeft - 1000; // Reducir el tiempo restante en un segundo
          });
        }, 1000);

        // Limpiar temporizadores al desmontar
        return () => {
          clearTimeout(logoutTimer);
          clearInterval(intervalTimer);
        };
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        cerrarSesion();
      }
    }
  }, [router]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const renderView = () => {
    /*switch (view) {
      case "personas":
        return <Personas />;
      case "examenes":
        return <Examenes />;
      case "ordenesform":
          return <OrderForm />;
      default:
        return <p>Bienvenido</p>;
    }*/
  };

  // Función para formatear el tiempo restante en formato de minutos y segundos
  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60000); // Minutos
    const seconds = Math.floor((time % 60000) / 1000); // Segundos
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <DashboardLayout user={user} cerrarSesion={cerrarSesion}>
      {renderView()}
      <div style={{ marginTop: "20px" }}>
        <h4>Tiempo restante de sesión: {formatTimeLeft(timeLeft)}</h4>
      </div>
    </DashboardLayout>
  );
}
