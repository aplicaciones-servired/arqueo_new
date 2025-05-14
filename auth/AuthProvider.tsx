// auth/AuthProvider.tsx
import { useRouter } from 'expo-router';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const login = () => {
    console.log("Ejecutando login - estableciendo isLoggedIn a true");
    setIsLoggedIn(true);
    router.replace("/(tabs)/ArqueoForm");
  };
  
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);