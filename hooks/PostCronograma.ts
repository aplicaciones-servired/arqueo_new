import Alertas from "@/components/ui/Alertas";
import axios from "axios";

export default function PostCronograma(params: any) {
  const enviarCronograma = async () => {
    const { perfil } = params;
    console.log("PostCronograma", perfil);
    console.log("first", params.id);
    console.log("second", params.estado);
    console.log("third", params.imagen);

    try {
      if (!params.id || !params.estado || !params.perfil) {
        Alertas("campos vacios");
        return false;
      }
      const Url = process.env.EXPO_PUBLIC_CRONOGRAMA_UPDATE || "";
      const res = await axios.post(
        Url,
        {
          id: params.id,
          estado: params.estado,
          imagen: params.imagen,
          perfil: params.perfil,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "http://ganeyumbo.ddns.net"
          },
        }
      );
      const data = res.data as { success?: string; error?: string };
      if (res.status === 200 && data.success) {
        Alertas(data.success);
        return true;
      }
      Alertas(data.error || "Error");
      return false;
    } catch (error: any) {
      console.error("PostCronograma - full error:", error);
      const mensajeError =
        error.response?.data?.error ||
        error.response?.data ||
        error.message ||
        "Error desconocido";
      Alertas(mensajeError);
      return false;
    }
  };
  return { enviarCronograma };
}
