import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Alertas from './Alertas';
import { ThemedText } from './ThemedText';
import { ThemeInput } from './ThemeInput';

export const Caja_Rollos = () => {
    const [Total_monedasCaja, setTotal_monedasCaja] = useState('')
    const [Total_billetesCaja, setTotal_billetesCaja] = useState('')
    const [Total_premiosCaja, setTotal_premiosCaja] = useState('')
    const [Total_Caja, setTotal_Caja] = useState('')

    const [Rollos_fisicos, setRollos_fisicos] = useState('')
    const [Rollos_bnet, setRollos_bnet] = useState('')
    const [Total_Rollos, setTotal_Rollos] = useState('')

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

        const total_caja = parseInt(Total_monedasCaja) + parseInt(Total_billetesCaja) + parseInt(Total_premiosCaja);
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

    const Caja_RollosComponent = () => {
        return (
            <>
                <ThemedText type='subtitle'>Caja Fuerte (Personal de turno de Venta)</ThemedText>
                <ThemeInput
                    onChangeText={setTotal_monedasCaja}
                    value={Total_monedasCaja}
                    placeholder="Total monedas Caja"
                    keyboardType="numeric"
                />
                <ThemeInput
                    onChangeText={setTotal_billetesCaja}
                    value={Total_billetesCaja}
                    placeholder="Total billetes Caja"
                    keyboardType="numeric"
                />
                <ThemeInput
                    onChangeText={setTotal_premiosCaja}
                    value={Total_premiosCaja}
                    placeholder="Total Premios Caja"
                    keyboardType="numeric"
                />
                <ThemeInput
                    value={Total_Caja}
                    placeholder="Total Caja Personal"
                />

                <Pressable
                    onPress={handleCaja}
                    style={({ pressed }) => [
                        styles.Calcular, // Primero aplica todos los estilos base del botón
                        {
                            transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                        }
                    ]}
                >
                    <ThemedText>Operaciones Caja</ThemedText>
                </Pressable>


                <ThemedText type='subtitle'>Inventario Rollos</ThemedText>
                <ThemeInput
                    onChangeText={setRollos_bnet}
                    value={Rollos_bnet}
                    placeholder="Rollos BNET"
                    keyboardType="numeric"
                />
                <ThemeInput
                    onChangeText={setRollos_fisicos}
                    value={Rollos_fisicos}
                    placeholder="Rollos Fisicos"
                    keyboardType="numeric"
                />
                <ThemeInput
                    value={Total_Rollos}
                    placeholder="Total Rollos"
                />

                <Pressable
                    onPress={handleRollos}
                    style={({ pressed }) => [
                        styles.Calcular, // Primero aplica todos los estilos base del botón
                        {
                            transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                        }
                    ]}
                >
                    <ThemedText>Calcular Rollos</ThemedText>
                </Pressable>
            </>)
    };

    return {
        handleCaja, handleRollos, Total_billetesCaja, Total_monedasCaja, Total_premiosCaja, Total_Caja, Rollos_bnet, Rollos_fisicos, Total_Rollos,
        setTotal_Caja, setTotal_monedasCaja, setTotal_billetesCaja, setTotal_premiosCaja, setRollos_bnet, setRollos_fisicos, Caja_RollosComponent
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