// hooks/UseLogin.ts
import Alertas from "@/components/ui/Alertas";
import { useAuth } from "@/context/AuthProvider";
import axios from "axios";
import { useState } from "react";

interface LoginResponse {
  perfil?: string;
}

export default function UseLogin({
  Usuario,
  Contraseña,
  onLog,
}: {
  Usuario: string;
  Contraseña: string;
  onLog?: (msg: string) => void;
}) {

  const apiUrl = process.env.EXPO_PUBLIC_LOGIN;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!Usuario || !Contraseña) {
      Alertas("Por favor complete todos los campos");
      onLog && onLog("Campos vacíos");
      return;
    }

    if (!apiUrl) {
      setError("URL de inicio de sesión no configurada. Contacte a soporte.");
      onLog && onLog("URL no configurada");
      return;
    }
    onLog && onLog("url: " + apiUrl);
    setLoading(true);
    try {
      const res = await axios.post<LoginResponse>(
        apiUrl,
        {
          login: Usuario,
          pass: Contraseña,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const perfilRaw = res.data?.perfil?.trim()?.toUpperCase();
      onLog && onLog("Respuesta del login: " + JSON.stringify(res.data));

      if (
        res.status === 200 &&
        (perfilRaw === "AUDITORIA-MULTIRED" ||
          perfilRaw === "AUDITORIA-SERVIRED")
      ) {
        await login(perfilRaw);
        onLog && onLog("Login exitoso, perfil: " + perfilRaw);
      } else {
        setError("Perfil no autorizado");
        onLog && onLog("Perfil no autorizado: " + perfilRaw);
      }
    } catch (err: any) {
      console.error("Error en login:", err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      onLog &&
        onLog("Error en login: " + (err?.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogin, error };
}
