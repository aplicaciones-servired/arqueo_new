import { useState } from 'react';
import { Keyboard, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemeInput } from './ThemeInput';
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

    const Entrega_salidaComponent = () => {

        return (
            <>
                <ThemedText type='subtitle'>Entrega Efectivo</ThemedText>
                <ThemeInput
                    onChangeText={setVenta_bruta}
                    value={Venta_bruta}
                    placeholder="Venta Bruta"
                    keyboardType="decimal-pad"
                    onBlur={() => Keyboard.dismiss()}
                />

                <ThemeInput
                    onChangeText={setBase_efectivo}
                    value={Base_efectivo}
                    placeholder="Base Efectivo"
                    keyboardType="numeric"
                />

                <ThemeInput
                    onChangeText={setCartera}
                    value={Cartera}
                    placeholder="Cartera"
                    keyboardType="numeric"
                />
                <ThemeInput
                    value={Total_ingreso}
                    placeholder="Total Ingreso"
                />


                <ThemedText type='subtitle'>Salida efectivo</ThemedText>
                <ThemeInput
                    onChangeText={setChance_abonados}
                    value={Chance_abonados}
                    placeholder="Chance abonados"
                    keyboardType="numeric"
                />
                <ThemeInput
                    onChangeText={setChance_impresos}
                    value={Chance_impresos}
                    placeholder="Chance impresos"
                    keyboardType="numeric"
                />
                <ThemeInput
                    onChangeText={setPremios_pagados}
                    value={Premios_pagados}
                    placeholder="Premios pagados"
                    keyboardType="numeric"
                />
                <ThemeInput
                    onChangeText={setEfectivo_cajafuerte}
                    value={Efectivo_cajafuerte}
                    placeholder="Efectivo caja fuerte"
                    keyboardType="numeric"
                />
                <ThemeInput
                    onChangeText={setTirilla_recaudo}
                    value={Tirilla_recaudo}
                    placeholder="Tirilla recaudo"
                    keyboardType="numeric"
                />

                <ThemeInput
                    value={Total_egresos}
                    placeholder="Total Egresos"
                />
                <ThemedText type='subtitle'>Total Arqueo</ThemedText>
                <ThemeInput
                    onChangeText={setTotal_monedas}
                    value={Total_monedas}
                    placeholder="Total billetes"
                    keyboardType="numeric"
                />
                <ThemeInput
                    onChangeText={setTotal_billetes}
                    value={Total_billetes}
                    placeholder="Total monedas"
                    keyboardType="numeric"
                />
                <ThemeInput
                    value={Total_arqueo}
                    placeholder="Total arqueo"
                />

                <ThemeInput
                    value={Sobrante_Faltante}
                    placeholder="SOBRANTE - FALTANTE"
                />

                <Pressable
                    onPress={handleCalcular}
                    style={({ pressed }) => [
                        styles.Calcular, // Primero aplica todos los estilos base del botón
                        {
                            transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                        }
                    ]}
                >
                    <ThemedText>Realizar Operaciones</ThemedText>
                </Pressable>
            </>
        );
    };


    return {
        Entrega_salidaComponent,
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


const styles = StyleSheet.create({
    Calcular: {
        borderRadius: 5,
        backgroundColor: '#78a8f3',
        padding: 10,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});