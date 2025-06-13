import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import Alertas from './ui/Alertas';


export const Entrega_salida = () => {
    const [Venta_bruta, setVenta_bruta] = useState('')
    const [Base_efectivo, setBase_efectivo] = useState('');
    const [Cartera, setCartera] = useState('');
    const [Total_ingreso, setTotal_ingreso] = useState('')

    const [Chance_abonados, setChance_abonados] = useState('')
    const [Chance_impresos, setChance_impresos] = useState('')
    const [Premios_pagados, setPremios_pagados] = useState('')
    const [Efectivo_cajafuerte, setEfectivo_cajafuerte] = useState('')
    const [Tirilla_recaudo, setTirilla_recaudo] = useState('')
    const [Total_egresos, setTotal_egresos] = useState('')

    const [Total_monedas, setTotal_monedas] = useState('')
    const [Total_billetes, setTotal_billetes] = useState('')
    const [Total_arqueo, setTotal_arqueo] = useState('')
    const [Sobrante_Faltante, setSobrante_Faltante] = useState('')

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                Keyboard.dismiss();
            }
        );

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleCalcular = () => {
        if (!Venta_bruta) {
            Alertas("Venta bruta se encuentra vacío");
            return;
        }
        if (!Base_efectivo) {
            Alertas("Base efectivo se encuentra vacío");
            return;
        }
        if (!Cartera) {
            Alertas("Cartera se encuentra vacío");
            return;
        }
        if (!Chance_abonados) {
            Alertas("Chance abonados se encuentra vacío");
            return;
        }
        if (!Chance_impresos) {
            Alertas("Chance impresos se encuentra vacío");
            return;
        }
        if (!Premios_pagados) {
            Alertas("Premios pagados se encuentra vacío");
            return;
        }
        if (!Efectivo_cajafuerte) {
            Alertas("Efectivo caja fuerte se encuentra vacío");
            return;
        }
        if (!Tirilla_recaudo) {
            Alertas("Tirilla recaudo se encuentra vacío");
            return;
        }
        if (!Total_monedas) {
            Alertas("Total monedas se encuentra vacío");
            return;
        }
        if (!Total_billetes) {
            Alertas("Total billetes se encuentra vacío");
            return;
        }

        const total_ingresos = parseInt(Venta_bruta) + parseInt(Base_efectivo) + parseInt(Cartera);
        setTotal_ingreso(total_ingresos.toString());

        const total_egresos = parseInt(Chance_abonados) + parseInt(Chance_impresos) + parseInt(Premios_pagados) +
            parseInt(Efectivo_cajafuerte) + parseInt(Tirilla_recaudo);
        setTotal_egresos(total_egresos.toString());

        const total_arqueo = parseInt(Total_monedas) + parseInt(Total_billetes);
        setTotal_arqueo(total_arqueo.toString());

        const faltate_sobrante = total_ingresos - total_arqueo;
        if (faltate_sobrante > 0) {
            setSobrante_Faltante(`SOBRANTE ${faltate_sobrante}`);
        } else {
            setSobrante_Faltante(`FALTANTE ${Math.abs(faltate_sobrante)}`);
        }

    }

   

    return {
        // Estados de ingresos
        Venta_bruta, setVenta_bruta,
        Base_efectivo, setBase_efectivo,
        Cartera, setCartera,
        Total_ingreso, setTotal_ingreso,

        // Estados de egresos
        Chance_abonados, setChance_abonados,
        
        Chance_impresos, setChance_impresos,
        Premios_pagados, setPremios_pagados,
        Efectivo_cajafuerte, setEfectivo_cajafuerte,
        Tirilla_recaudo, setTirilla_recaudo,
        Total_egresos, setTotal_egresos,

        // Estados de arqueo
        Total_monedas, setTotal_monedas,
        Total_billetes, setTotal_billetes,
        Total_arqueo, setTotal_arqueo,
        Sobrante_Faltante, setSobrante_Faltante,

        // Funciones
        handleCalcular
    };

};