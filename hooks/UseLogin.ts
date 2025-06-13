// hooks/UseLogin.ts
import Alertas from '@/components/ui/Alertas';
import { useAuth } from '@/context/AuthProvider';
import axios from 'axios';
import { useState } from 'react';

interface LoginResponse {
  perfil?: string;
}

export default function UseLogin({ Usuario, Contraseña }: { Usuario: string; Contraseña: string }) {
  const Url = process.env.EXPO_PUBLIC_LOGIN;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!Usuario || !Contraseña) {
      Alertas('Por favor complete todos los campos');
      return;
    }

    if (!Url) {
      setError('URL de inicio de sesión no configurada. Contacte a soporte.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post<LoginResponse>(Url, {
        login: Usuario,
        pass: Contraseña,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      });

      const perfilRaw = res.data?.perfil?.trim()?.toUpperCase();
      console.log('Respuesta del login:', res.data);

      if (res.status === 200 && (perfilRaw === 'AUDITORIA-MULTIRED' || perfilRaw === 'AUDITORIA-SERVIRED')) {
        await login(perfilRaw); // Usa la función login del AuthProvider
      } else {
        setError('Perfil no autorizado');
      }

    } catch (err) {
      console.error('Error en login:', err);
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogin, error };
}