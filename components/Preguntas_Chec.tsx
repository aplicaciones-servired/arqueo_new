import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export const usePreguntasChec = () => {
    // Estado para todas las preguntas
    const [preguntas, setPreguntas] = useState([
        { id: 1, texto: 'Tiene la puerta asegurada?', estado: 'NO CUMPLE' },
        { id: 2, texto: 'Elementos de aseo, sillas, computador, iluminacion en buen estado?', estado: 'NO CUMPLE' },
        { id: 3, texto: 'Aviso de videovigilancia y camaras?', estado: 'NO CUMPLE' },
        { id: 4, texto: 'Utiliza Superflex?', estado: 'NO CUMPLE' },
        { id: 5, texto: 'Tiene caja fuerte?', estado: 'NO CUMPLE' },
        { id: 6, texto: 'Tiene caja digital auxiliar? Conoce las bases de efectivo asignadas para caja digital y principal?', estado: 'NO CUMPLE' },
        { id: 7, texto: 'Las recargas se hacen a través la Red propia de la Cia?', estado: 'NO CUMPLE' },
        { id: 8, texto: 'Cumple con los topes de efectivo establecidos en caja digital y principal?', estado: 'NO CUMPLE' },
        { id: 9, texto: 'Tiene los premios descargados? Conoce los requisitos y montos máximos para pago de premios?', estado: 'NO CUMPLE' },
        { id: 10, texto: 'La lotería física tiene impreso el nombre de la Cia o de Servicios Transaccionales. Reportar inmediato en caso negativo.', estado: 'NO CUMPLE' },
        { id: 11, texto: 'Publicidad exhibida actualizada?', estado: 'NO CUMPLE' },
        { id: 12, texto: 'Aviso externo de "Vigilado y Controlado Mintic" y "Colaborador Autorizado"?', estado: 'NO CUMPLE' },
        { id: 13, texto: 'Afiche MINTIC SUPERGIROS (contiene aviso de canales de comunicación, o tarifario condiciones del servicio, sticker tirilla electronica CRC)?', estado: 'NO CUMPLE' },
        { id: 14, texto: 'Calendario resultados Superastro diligenciado (tiene que tener los resultados)', estado: 'NO CUMPLE' },
        { id: 15, texto: 'Presta servicio de Western Union (es obligatorio para cajeros ciales)', estado: 'NO CUMPLE' },
        { id: 16, texto: 'Calendarios de acumulados (Baloto-Miloto-Colorloto)', estado: 'NO CUMPLE' },
        { id: 17, texto: 'Tablero de resultados y acumulados actualizados', estado: 'NO CUMPLE' },
        { id: 18, texto: 'Licencia de funcionamiento de Beneficencia del Valle con año actualizado', estado: 'NO CUMPLE' },
        { id: 19, texto: 'Tiene equipos de Betplay y/o maquinas de ruta? Si los tiene debe tener el aviso "Autoriza Coljuegos"', estado: 'NO CUMPLE' },
        { id: 20, texto: 'Tiene aviso codigo QR para PQR?', estado: 'NO CUMPLE' },
        { id: 21, texto: 'Verificar el cableado', estado: 'NO CUMPLE' },
        { id: 22, texto: 'Tiene prendas emblematicas y presentación adecuada?', estado: 'NO CUMPLE' },
        { id: 23, texto: 'El usuario corresponde a la cedula del mismo?', estado: 'NO CUMPLE' },
        { id: 24, texto: 'Tiene usuario de giros? Presta el servicio?', estado: 'NO CUMPLE' },
        { id: 25, texto: 'Tiene usuario de la ONJ (para Baloto, Miloto, Colorloto)', estado: 'NO CUMPLE' },
        { id: 26, texto: 'Tiene usuario de SUPERFLEX', estado: 'NO CUMPLE' },
        { id: 27, texto: 'Tiene usuario de CORREDOR EMPRESARIAL (astro, chance millonario, Betplay)', estado: 'NO CUMPLE' },
        { id: 28, texto: 'Esta realizando recaudo en tesoreria BNET a la compañera?', estado: 'NO CUMPLE' },
        { id: 29, texto: 'Esta comercializando el portafolio completo?', estado: 'NO CUMPLE' },
        { id: 30, texto: 'Solicita el documento de identificación al cliente?', estado: 'NO CUMPLE' },
        { id: 31, texto: 'Conoce Supervoucher, funciona?', estado: 'NO CUMPLE' },
        { id: 32, texto: 'Conoce el procedimiento para remitentes y destinatarios menores de edad?', estado: 'NO CUMPLE' },
        { id: 33, texto: 'Conoce los reportes de operaciones en efectivo (R.O.E) firmas, huellas. (Transacciones >=$10.000.000)?', estado: 'NO CUMPLE' },
        { id: 34, texto: 'El Supervisor Cial realiza las visitas?', estado: 'NO CUMPLE' },
        { id: 35, texto: 'Conoce los terminos SARL, SARLAFT, SARO, operación inusual y operación sospechosa', estado: 'NO CUMPLE' },
    ]);


    // Función optimizada con useCallback para mejor rendimiento
    const togglePregunta = useCallback((id: number) => {
        setPreguntas(prev => {
            const newPreguntas = [...prev];
            const index = newPreguntas.findIndex(p => p.id === id);
            if (index !== -1) {
                newPreguntas[index] = {
                    ...newPreguntas[index],
                    estado: newPreguntas[index].estado === 'CUMPLE' ? 'NO CUMPLE' : 'CUMPLE'
                };
            }
            return newPreguntas;
        });
    }, []);

    // Componente que renderiza todas las preguntas
    const PreguntasChecComponent = () => {
        const colorScheme = useColorScheme();

        return (
            <>
                <ThemedText type='title' style={styles.titulo}>
                    Verificación del punto de venta
                </ThemedText>

                {preguntas.map((pregunta) => (
                    <ThemedView key={pregunta.id} style={styles.preguntaContainer}>
                        <ThemedText type='subtitle' style={styles.textoPregunta}>
                            {pregunta.id}. {pregunta.texto}
                        </ThemedText>
                        <ThemedView
                            style={[
                                styles.cont,
                                {
                                    borderColor: colorScheme === 'light' ? 'black' : 'white',
                                },
                            ]}
                        >
                            <Pressable
                                onPress={() => togglePregunta(pregunta.id)}
                                style={[
                                    styles.checkbox,
                                    {
                                        borderColor: colorScheme === 'light' ? 'black' : 'white',
                                        backgroundColor: pregunta.estado === 'CUMPLE' ? '#b0f0a3' : '#f7a3a3',
                                    },
                                ]}
                            >
                                <ThemedText style={styles.emoji}>
                                    {pregunta.estado === 'CUMPLE' ? '✅' : '❌'}
                                </ThemedText>
                            </Pressable>
                            <ThemedText type='subtitle' style={styles.textoEstado}>
                                {pregunta.estado}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                ))}
            </>
        );
    };

    // Función para obtener los estados actuales
    const obtenerEstados = useCallback(() => {
        return preguntas.reduce((acc, pregunta) => {
            acc[`Pregunta${pregunta.id}`] = pregunta.estado;
            return acc;
        }, {} as Record<string, string>);
    }, [preguntas]);

    return {
        estadosPreguntas: obtenerEstados(),
        PreguntasChecComponent
    };
};

const styles = StyleSheet.create({
    titulo: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 22,
        fontWeight: 'bold',
    },
    preguntaContainer: {
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoPregunta: {
        marginBottom: 8,
        textAlign: 'center',
    },
    cont: {
        width: '100%',
        minHeight: 80,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    checkbox: {
        width: 150,
        height: 60,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    emoji: {
        fontSize: 28,
    },
    textoEstado: {
        marginTop: 5,
        fontWeight: 'bold',
    },
});