// auth/AuthProvider.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  perfil: string | null;
  setPerfil: Dispatch<SetStateAction<string | null>>;
  login: (perfil: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  perfil: null,
  setPerfil: () => { },
  login: async () => { },
  logout: async () => { },
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [perfil, setPerfil] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const clearSessionOnStartup = async () => {
      console.log("App reiniciada - limpiando sesión");
      await AsyncStorage.removeItem('userPerfil');
      await AsyncStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      setPerfil(null);
      router.replace('/'); // Redirige al login
      setLoading(false);
    };

    clearSessionOnStartup();
  }, []);

  // Cargar estado al iniciar
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const savedPerfil = await AsyncStorage.getItem('userPerfil');
        const savedIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        if (savedPerfil && savedIsLoggedIn === 'true') {
          setPerfil(savedPerfil);
          setIsLoggedIn(true);
          router.replace("/(tabs)/ArqueoForm");
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthState();
  }, []);

  // ...existing code...
  const login = async (perfil: string) => {
    try {
      await AsyncStorage.setItem('userPerfil', perfil);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setPerfil(perfil);
      setIsLoggedIn(true);
      console.log("Login exitoso, perfil:", perfil); // <-- Agrega este log
      router.replace("/(tabs)/ArqueoForm");
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  // ...existing code...

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userPerfil');
      await AsyncStorage.removeItem('isLoggedIn');
      setPerfil(null);
      setIsLoggedIn(false);
      router.replace("/");
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      perfil,
      setPerfil,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);