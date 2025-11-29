import { useState } from "react";

export const Raspas = () => {
  const [nombre_juego, setnombre_juego] = useState("");
  const [cantidad_bnet, setcantidad_bnet] = useState("");
  const [cantidad_fisicos, setcantidad_fisicos] = useState("");
  const [cantidad_faltante, setcantidad_faltante] = useState("");
  const [cantidad_tiquete, setcantidad_tiquete] = useState("");
  const [descargado, setdescargado] = useState("");

  const [nombre_juego2, setnombre_juego2] = useState("");
  const [cantidad_bnet2, setcantidad_bnet2] = useState("");
  const [cantidad_fisicos2, setcantidad_fisicos2] = useState("");
  const [cantidad_faltante2, setcantidad_faltante2] = useState("");
  const [cantidad_tiquete2, setcantidad_tiquete2] = useState("");
  const [descargado2, setdescargado2] = useState("");

  const [nombre_juego3, setnombre_juego3] = useState("");
  const [cantidad_bnet3, setcantidad_bnet3] = useState("");
  const [cantidad_fisicos3, setcantidad_fisicos3] = useState("");
  const [cantidad_faltante3, setcantidad_faltante3] = useState("");
  const [cantidad_tiquete3, setcantidad_tiquete3] = useState("");
  const [descargado3, setdescargado3] = useState("");

  const [nombre_juego4, setnombre_juego4] = useState("");
  const [cantidad_bnet4, setcantidad_bnet4] = useState("");
  const [cantidad_fisicos4, setcantidad_fisicos4] = useState("");
  const [cantidad_faltante4, setcantidad_faltante4] = useState("");
  const [cantidad_tiquete4, setcantidad_tiquete4] = useState("");
  const [descargado4, setdescargado4] = useState("");

  const [nombre_juego5, setnombre_juego5] = useState("");
  const [cantidad_bnet5, setcantidad_bnet5] = useState("");
  const [cantidad_fisicos5, setcantidad_fisicos5] = useState("");
  const [cantidad_faltante5, setcantidad_faltante5] = useState("");
  const [cantidad_tiquete5, setcantidad_tiquete5] = useState("");
  const [descargado5, setdescargado5] = useState("");

  const [nombre_juego6, setnombre_juego6] = useState("");
  const [cantidad_bnet6, setcantidad_bnet6] = useState("");
  const [cantidad_fisicos6, setcantidad_fisicos6] = useState("");
  const [cantidad_faltante6, setcantidad_faltante6] = useState("");
  const [cantidad_tiquete6, setcantidad_tiquete6] = useState("");
  const [descargado6, setdescargado6] = useState("");

  const [nombre_juego7, setnombre_juego7] = useState("");
  const [cantidad_bnet7, setcantidad_bnet7] = useState("");
  const [cantidad_fisicos7, setcantidad_fisicos7] = useState("");
  const [cantidad_faltante7, setcantidad_faltante7] = useState("");
  const [cantidad_tiquete7, setcantidad_tiquete7] = useState("");
  const [descargado7, setdescargado7] = useState("");

  const [Cantidad_descargados, setCantidad_descargados] = useState("");
  const [Total_descargados, setTotal_descargados] = useState("");

  const handleRaspas = () => {
    // Función helper para convertir seguro a número
    const toNumber = (value: string) => parseInt(value || "0") || 0;

    // Calculamos cada juego individualmente
    const totals = [
      toNumber(cantidad_faltante) * toNumber(cantidad_tiquete),
      toNumber(cantidad_faltante2) * toNumber(cantidad_tiquete2),
      toNumber(cantidad_faltante3) * toNumber(cantidad_tiquete3),
      toNumber(cantidad_faltante4) * toNumber(cantidad_tiquete4),
      toNumber(cantidad_faltante5) * toNumber(cantidad_tiquete5),
      toNumber(cantidad_faltante6) * toNumber(cantidad_tiquete6),
      toNumber(cantidad_faltante7) * toNumber(cantidad_tiquete7),
    ];

    // Actualizamos cada descargado
    setdescargado(totals[0].toString());
    setdescargado2(totals[1].toString());
    setdescargado3(totals[2].toString());
    setdescargado4(totals[3].toString());
    setdescargado5(totals[4].toString());
    setdescargado6(totals[5].toString());
    setdescargado7(totals[6].toString());

    // Calculamos cantidad descargados (suma de faltantes)
    const faltantes = [
      toNumber(cantidad_faltante),
      toNumber(cantidad_faltante2),
      toNumber(cantidad_faltante3),
      toNumber(cantidad_faltante4),
      toNumber(cantidad_faltante5),
      toNumber(cantidad_faltante6),
      toNumber(cantidad_faltante7),
    ];

    const cantidad_descargados = faltantes.reduce((sum, num) => sum + num, 0);
    setCantidad_descargados(cantidad_descargados.toString());

    // Calculamos total descargados (suma de todos los totals)
    const total_descargados = totals.reduce((sum, num) => sum + num, 0);
    setTotal_descargados(total_descargados.toString());
  };

  return {
    // Juego 1
    nombre_juego,
    setnombre_juego,
    cantidad_bnet,
    setcantidad_bnet,
    cantidad_fisicos,
    setcantidad_fisicos,
    cantidad_faltante,
    setcantidad_faltante,
    cantidad_tiquete,
    setcantidad_tiquete,
    descargado,
    setdescargado,

    // Juego 2
    nombre_juego2,
    setnombre_juego2,
    cantidad_bnet2,
    setcantidad_bnet2,
    cantidad_fisicos2,
    setcantidad_fisicos2,
    cantidad_faltante2,
    setcantidad_faltante2,
    cantidad_tiquete2,
    setcantidad_tiquete2,
    descargado2,
    setdescargado2,

    // Juego 3
    nombre_juego3,
    setnombre_juego3,
    cantidad_bnet3,
    setcantidad_bnet3,
    cantidad_fisicos3,
    setcantidad_fisicos3,
    cantidad_faltante3,
    setcantidad_faltante3,
    cantidad_tiquete3,
    setcantidad_tiquete3,
    descargado3,
    setdescargado3,

    // Juego 4
    nombre_juego4,
    setnombre_juego4,
    cantidad_bnet4,
    setcantidad_bnet4,
    cantidad_fisicos4,
    setcantidad_fisicos4,
    cantidad_faltante4,
    setcantidad_faltante4,
    cantidad_tiquete4,
    setcantidad_tiquete4,
    descargado4,
    setdescargado4,

    // Juego 5
    nombre_juego5,
    setnombre_juego5,
    cantidad_bnet5,
    setcantidad_bnet5,
    cantidad_fisicos5,
    setcantidad_fisicos5,
    cantidad_faltante5,
    setcantidad_faltante5,
    cantidad_tiquete5,
    setcantidad_tiquete5,
    descargado5,
    setdescargado5,

    // Juego 6
    nombre_juego6,
    setnombre_juego6,
    cantidad_bnet6,
    setcantidad_bnet6,
    cantidad_fisicos6,
    setcantidad_fisicos6,
    cantidad_faltante6,
    setcantidad_faltante6,
    cantidad_tiquete6,
    setcantidad_tiquete6,
    descargado6,
    setdescargado6,

    // Juego 7
    nombre_juego7,
    setnombre_juego7,
    cantidad_bnet7,
    setcantidad_bnet7,
    cantidad_fisicos7,
    setcantidad_fisicos7,
    cantidad_faltante7,
    setcantidad_faltante7,
    cantidad_tiquete7,
    setcantidad_tiquete7,
    descargado7,
    setdescargado7,

    // Totales
    Cantidad_descargados,
    setCantidad_descargados,
    Total_descargados,
    setTotal_descargados,

    // Función handler
    handleRaspas,
    resetRaspas: () => {
      setnombre_juego("");
      setcantidad_bnet("");
      setcantidad_fisicos("");
      setcantidad_faltante("");
      setcantidad_tiquete("");
      setdescargado("");
      setnombre_juego2("");
      setcantidad_bnet2("");
      setcantidad_fisicos2("");
      setcantidad_faltante2("");
      setcantidad_tiquete2("");
      setdescargado2("");
      setnombre_juego3("");
      setcantidad_bnet3("");
      setcantidad_fisicos3("");
      setcantidad_faltante3("");
      setcantidad_tiquete3("");
      setdescargado3("");
      setnombre_juego4("");
      setcantidad_bnet4("");
      setcantidad_fisicos4("");
      setcantidad_faltante4("");
      setcantidad_tiquete4("");
      setdescargado4("");
      setnombre_juego5("");
      setcantidad_bnet5("");
      setcantidad_fisicos5("");
      setcantidad_faltante5("");
      setcantidad_tiquete5("");
      setdescargado5("");
      setnombre_juego6("");
      setcantidad_bnet6("");
      setcantidad_fisicos6("");
      setcantidad_faltante6("");
      setcantidad_tiquete6("");
      setdescargado6("");
      setnombre_juego7("");
      setcantidad_bnet7("");
      setcantidad_fisicos7("");
      setcantidad_faltante7("");
      setcantidad_tiquete7("");
      setdescargado7("");
      setCantidad_descargados("");
      setTotal_descargados("");
    },
  };
};
