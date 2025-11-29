import { useState } from "react";
import Alertas from "./ui/Alertas";

export const Caja_Rollos = () => {
  const [Total_monedasCaja, setTotal_monedasCaja] = useState("");
  const [Total_billetesCaja, setTotal_billetesCaja] = useState("");
  const [Total_premiosCaja, setTotal_premiosCaja] = useState("");
  const [Total_Caja, setTotal_Caja] = useState("");

  const [Rollos_fisicos, setRollos_fisicos] = useState("");
  const [Rollos_bnet, setRollos_bnet] = useState("");
  const [Total_Rollos, setTotal_Rollos] = useState("");

  const handleCaja = () => {
    if (!Total_monedasCaja) {
      Alertas("Total Monedas Caja se encuentra vacío");
      return;
    }
    if (!Total_billetesCaja) {
      Alertas("Total Billetes Caja se encuentra vacío");
      return;
    }
    if (!Total_premiosCaja) {
      Alertas("Total Premios Caja se encuentra vacío");
      return;
    }

    const total_caja =
      parseInt(Total_monedasCaja) +
      parseInt(Total_billetesCaja) +
      parseInt(Total_premiosCaja);
    setTotal_Caja(total_caja.toString());
  };

  const handleRollos = () => {
    if (!Rollos_bnet) {
      Alertas("Rollos bnet Caja se encuentra vacío");
      return;
    }
    if (!Rollos_fisicos) {
      Alertas("Rollos fisicos se encuentra vacío");
      return;
    }

    const total_rollos = parseInt(Rollos_bnet) - parseInt(Rollos_fisicos);
    setTotal_Rollos(`DIFERENCIA ${total_rollos}`.toString());
  };

  return {
    handleCaja,
    handleRollos,
    Total_billetesCaja,
    Total_monedasCaja,
    Total_premiosCaja,
    Total_Caja,
    Rollos_bnet,
    Rollos_fisicos,
    Total_Rollos,
    setTotal_Caja,
    setTotal_monedasCaja,
    setTotal_billetesCaja,
    setTotal_premiosCaja,
    setRollos_bnet,
    setRollos_fisicos,
    resetCajaRollos: () => {
      setTotal_monedasCaja("");
      setTotal_billetesCaja("");
      setTotal_premiosCaja("");
      setTotal_Caja("");
      setRollos_fisicos("");
      setRollos_bnet("");
      setTotal_Rollos("");
    },
  };
};
