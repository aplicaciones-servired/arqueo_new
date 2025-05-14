import { useAuth } from "@/auth/AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

export default function UseLogin(props: { Usuario: any; Contraseña: any }) {
  
  const { Usuario, Contraseña } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, loading]);

  const handleLogin = async () => {
    if (!Usuario || !Contraseña) {
      Alert.alert("Por favor complete todos los campos");
      return;
    }

    setLoading(true);

    let url = "";
    if (Platform.OS === "android") {
      url = `http://ganeyumbo.ddns.net/clientes/login/login_new.php`;
    } else {
      url = `http://172.20.1.92/clientes/login/login_new.php`;
    }

    axios
      .post(
        url,
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
      )
      .then((res) => {
        console.log("Respuesta del login:", res.data);
        if (res.status === 200) {
          setIsLoggedIn(true)
          login()
        } else {
          setError("Error en la respuesta del servidor");
        }
      })
      .catch((error) => {
        setError("Error al iniciar sesión");
      })
      .then(() => {
        setLoading(false);
      });
  };

  return { loading, handleLogin, error };
}
function login() {
  throw new Error("Function not implemented.");
}
