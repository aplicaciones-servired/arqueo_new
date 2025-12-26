import Alertas from "@/components/ui/Alertas";
import axios from "axios";

export default function PostArqeuo(params: any) {
  const enviarArqueo = async (): Promise<boolean> => {
    const { perfil } = params;
    console.log("PostArqeuo", perfil);

    const MULTIEMPRESA = process.env.EXPO_PUBLIC_MULTIEMPRESA;

    let Url = MULTIEMPRESA || "";

    if (!params.ip || !params.nombre || !params.cedula || !params.sucursal) {
      Alertas("tienes que leer el QR antes de enviar");
      return false;
    }

    if (!params.firmaAuditoria || !params.firmaColocadora) {
      Alertas(" Debes firmar el arqueo antes de enviarlo");
      return false;
    }

    try {
      console.log("📤 Enviando petición POST a:", Url);
      const res = await axios.post(
        Url,
        {
          perfil: params.perfil,
          ip: params.ip,
          nombres: params.nombre,
          documento: params.cedula,
          sucursal: params.sucursal,
          supervisor: params.Supervisor,
          puntodeventa: params.punto_venta,
          latitud: params.latitude,
          longitud: params.longitude,
          ventabruta: params.Venta_bruta,
          baseefectivo: params.Base_efectivo,
          cartera: params.Cartera,
          totalingreso: params.Total_ingreso,
          chancesabonados: params.Chance_abonados,
          chancespreimpresos: params.Chance_impresos,
          premiospagados: params.Premios_pagados,
          efectivocajafuerte: params.Efectivo_cajafuerte,
          tirillarecaudo: params.Tirilla_recaudo,
          totalegresos: params.Total_egresos,
          totalbilletes: params.Total_billetes,
          totalmonedas: params.Total_monedas,
          totalarqueo: params.Total_arqueo,
          sobrantefaltante: params.Sobrante_Faltante,
          totalbilletescaja: params.Total_billetesCaja,
          totalmonedascaja: params.Total_monedasCaja,
          totalpremioscaja: params.Total_premiosCaja,
          total: params.Total_Caja,
          rollos_bnet: params.Rollos_bnet,
          rollos_fisicos: params.Rollos_fisicos,
          diferencia: params.Total_Rollos,
          nombre_juego: params.nombre_juego,
          cantidad_bnet: params.cantidad_bnet,
          cantidad_fisicos: params.cantidad_fisicos,
          cantidad_faltante: params.cantidad_faltante,
          cantidad_tiquete: params.cantidad_tiquete,
          descargado: params.descargado,
          nombre_juego2: params.nombre_juego2,
          cantidad_bnet2: params.cantidad_bnet2,
          cantidad_fisicos2: params.cantidad_fisicos2,
          cantidad_faltante2: params.cantidad_faltante2,
          cantidad_tiquete2: params.cantidad_tiquete2,
          descargado2: params.descargado2,
          nombre_juego3: params.nombre_juego3,
          cantidad_bnet3: params.cantidad_bnet3,
          cantidad_fisicos3: params.cantidad_fisicos3,
          cantidad_faltante3: params.cantidad_faltante3,
          cantidad_tiquete3: params.cantidad_tiquete3,
          descargado3: params.descargado3,
          nombre_juego4: params.nombre_juego4,
          cantidad_bnet4: params.cantidad_bnet4,
          cantidad_fisicos4: params.cantidad_fisicos4,
          cantidad_faltante4: params.cantidad_faltante4,
          cantidad_tiquete4: params.cantidad_tiquete4,
          descargado4: params.descargado4,
          nombre_juego5: params.nombre_juego5,
          cantidad_bnet5: params.cantidad_bnet5,
          cantidad_fisicos5: params.cantidad_fisicos5,
          cantidad_faltante5: params.cantidad_faltante5,
          cantidad_tiquete5: params.cantidad_tiquete5,
          descargado5: params.descargado5,
          nombre_juego6: params.nombre_juego6,
          cantidad_bnet6: params.cantidad_bnet6,
          cantidad_fisicos6: params.cantidad_fisicos6,
          cantidad_faltante6: params.cantidad_faltante6,
          cantidad_tiquete6: params.cantidad_tiquete6,
          descargado6: params.descargado6,
          nombre_juego7: params.nombre_juego7,
          cantidad_bnet7: params.cantidad_bnet7,
          cantidad_fisicos7: params.cantidad_fisicos7,
          cantidad_faltante7: params.cantidad_faltante7,
          cantidad_tiquete7: params.cantidad_tiquete7,
          descargado7: params.descargado7,
          totaldescargados: params.Cantidad_descargados,
          totalvalor: params.Total_descargados,
          requisito1: params.requisito1,
          requisito2: params.requisito2,
          requisito3: params.requisito3,
          requisito4: params.requisito4,
          requisito5: params.requisito5,
          requisito6: params.requisito6,
          requisito7: params.requisito7,
          requisito8: params.requisito8,
          requisito9: params.requisito9,
          requisito10: params.requisito10,
          requisito11: params.requisito11,
          requisito12: params.requisito12,
          requisito13: params.requisito13,
          requisito14: params.requisito14,
          requisito15: params.requisito15,
          requisito16: params.requisito16,
          requisito17: params.requisito17,
          requisito18: params.requisito18,
          requisito19: params.requisito19,
          requisito20: params.requisito20,
          requisito21: params.requisito21,
          requisito22: params.requisito22,
          requisito23: params.requisito23,
          requisito24: params.requisito24,
          requisito25: params.requisito25,
          requisito26: params.requisito26,
          requisito27: params.requisito27,
          requisito28: params.requisito28,
          requisito29: params.requisito29,
          requisito30: params.requisito30,
          requisito31: params.requisito31,
          requisito32: params.requisito32,
          requisito33: params.requisito33,
          requisito34: params.requisito34,
          requisito35: params.requisito35,
          observacion1: params.observacion1,
          observacion2: params.observacion2,
          observacion3: params.observacion3,
          observacion4: params.observacion4,
          observacion5: params.observacion5,
          observacion6: params.observacion6,
          observacion7: params.observacion7,
          observacion8: params.observacion8,
          observacion9: params.observacion9,
          observacion10: params.observacion10,
          observacion11: params.observacion11,
          observacion12: params.observacion12,
          observacion13: params.observacion13,
          observacion14: params.observacion14,
          observacion15: params.observacion15,
          observacion16: params.observacion16,
          observacion17: params.observacion17,
          observacion18: params.observacion18,
          observacion19: params.observacion19,
          observacion20: params.observacion20,
          observacion21: params.observacion21,
          observacion22: params.observacion22,
          observacion23: params.observacion23,
          observacion24: params.observacion24,
          observacion25: params.observacion25,
          observacion26: params.observacion26,
          observacion27: params.observacion27,
          observacion28: params.observacion28,
          observacion29: params.observacion29,
          observacion30: params.observacion30,
          observacion31: params.observacion31,
          observacion32: params.observacion32,
          observacion33: params.observacion33,
          observacion34: params.observacion34,
          observacion35: params.observacion35,
          imagen_observacion: params.imageBase64,
          nombre_observacion: params.Nombre_observacion,
          firma_auditoria: params.firmaAuditoria,
          firma_colocadora: params.firmaColocadora,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("✅ Respuesta recibida, status:", res.status);
      console.log("📦 Datos de respuesta:", res.data);

      let data = res.data;
      if (typeof data === "string") {
        try {
          // Extract JSON part if mixed with HTML/text
          const jsonMatch = data.match(/\{.*}/s);
          if (jsonMatch) {
            data = JSON.parse(jsonMatch[0]);
          } else {
            // Fallback: try parsing the whole string if no object found
            data = JSON.parse(data);
          }
        } catch (e) {
          console.log("Error parsing response data:", e);
        }
      }

      const responseData = data as { success?: string; error?: string };

      if (res.status === 200 && responseData.success) {
        Alertas(responseData.success); // ✅ Muestra el mensaje del backend
        return true;
      }
      return false;
    } catch (error: any) {
      const mensajeError =
        error.response?.data?.error || error.message || "Error desconocido";
      Alertas(mensajeError); // ✅ Muestra el mensaje exacto que venga del backend
      return false; // ← Retorna false en caso de excepción
    }
  };

  return { enviarArqueo };
}
