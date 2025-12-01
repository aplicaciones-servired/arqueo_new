import { useCallback, useEffect, useState } from "react";

interface FirmaProps {
  requisito: (firma: string) => void;
}

export const usePreguntasChec = ({ requisito }: FirmaProps) => {
  // Estado para todas las preguntas con campo de observación
  const [preguntas, setPreguntas] = useState([
    {
      id: 1,
      texto: "Tiene la puerta asegurada?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 2,
      texto:
        "Elementos de aseo, sillas, computador, iluminacion en buen estado?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 3,
      texto: "Aviso de videovigilancia y camaras?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 4,
      texto: "Utiliza Superflex?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 5,
      texto: "Tiene caja fuerte?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 6,
      texto:
        "Tiene caja digital auxiliar? Conoce las bases de efectivo asignadas para caja digital y principal?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 7,
      texto: "Las recargas se hacen a través la Red propia de la Cia?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 8,
      texto:
        "Cumple con los topes de efectivo establecidos en caja digital y principal?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 9,
      texto:
        "Tiene los premios descargados? Conoce los requisitos y montos máximos para pago de premios?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 10,
      texto:
        "La lotería física tiene impreso el nombre de la Cia o de Servicios Transaccionales. Reportar inmediato en caso negativo.",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 11,
      texto: "Publicidad exhibida actualizada?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 12,
      texto:
        'Aviso externo de "Vigilado y Controlado Mintic" y "Colaborador Autorizado"?',
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 13,
      texto:
        "Afiche MINTIC SUPERGIROS (contiene aviso de canales de comunicación, o tarifario condiciones del servicio, sticker tirilla electronica CRC)?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 14,
      texto:
        "Calendario resultados Superastro diligenciado (tiene que tener los resultados)",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 15,
      texto:
        "Presta servicio de Western Union (es obligatorio para cajeros ciales)",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 16,
      texto: "Calendarios de acumulados (Baloto-Miloto-Colorloto)",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 17,
      texto: "Tablero de resultados y acumulados actualizados",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 18,
      texto:
        "Licencia de funcionamiento de Beneficencia del Valle con año actualizado",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 19,
      texto:
        'Tiene equipos de Betplay y/o maquinas de ruta? Si los tiene debe tener el aviso "Autoriza Coljuegos"',
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 20,
      texto: "Tiene aviso codigo QR para PQR?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 21,
      texto: "Verificar el cableado",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 22,
      texto: "Tiene prendas emblematicas y presentación adecuada?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 23,
      texto: "El usuario corresponde a la cedula del mismo?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 24,
      texto: "Tiene usuario de giros? Presta el servicio?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 25,
      texto: "Tiene usuario de la ONJ (para Baloto, Miloto, Colorloto)",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 26,
      texto: "Tiene usuario de SUPERFLEX",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 27,
      texto:
        "Tiene usuario de CORREDOR EMPRESARIAL (astro, chance millonario, Betplay)",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 28,
      texto: "Esta realizando recaudo en tesoreria BNET a la compañera?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 29,
      texto: "Esta comercializando el portafolio completo?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 30,
      texto: "Solicita el documento de identificación al cliente?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 31,
      texto: "Conoce Supervoucher, funciona?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 32,
      texto:
        "Conoce el procedimiento para remitentes y destinatarios menores de edad?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 33,
      texto:
        "Conoce los reportes de operaciones en efectivo (R.O.E) firmas, huellas. (Transacciones >=$10.000.000)?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 34,
      texto: "El Supervisor Cial realiza las visitas?",
      estado: "NO CUMPLE",
      observacion: "",
    },
    {
      id: 35,
      texto:
        "Conoce los terminos SARL, SARLAFT, SARO, operación inusual y operación sospechosa",
      estado: "NO CUMPLE",
      observacion: "",
    },
  ]);

  // Función optimizada con useCallback para mejor rendimiento
  const togglePregunta = useCallback((id: number) => {
    setPreguntas((prev) => {
      const newPreguntas = prev.map((p) =>
        p.id === id
          ? { ...p, estado: p.estado === "CUMPLE" ? "NO CUMPLE" : "CUMPLE" }
          : p
      );
      return newPreguntas;
    });
  }, []);

  // Función para actualizar la observación de una pregunta
  const updateObservacion = useCallback((id: number, observacion: string) => {
    setPreguntas((prev) => {
      const newPreguntas = prev.map((p) =>
        p.id === id ? { ...p, observacion } : p
      );
      return newPreguntas;
    });
  }, []);

  useEffect(() => {
    // Enviar tanto estados como observaciones
    const estados = preguntas.reduce((acc: Record<string, string>, p) => {
      acc[`requisito${p.id}`] = p.estado;
      acc[`observacion${p.id}`] = p.observacion;
      return acc;
    }, {});
    requisito(JSON.stringify(estados));
  }, [preguntas, requisito]);

  return {
    preguntas,
    togglePregunta,
    updateObservacion,
    resetObservacion: () => {
      setPreguntas((prev) => {
        const newPreguntas = prev.map((p) => ({ ...p, observacion: "" }));
        return newPreguntas;
      });
    },
  };
};
