import { useImagePicker } from "@/components/ImagePickerComponent";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthProvider";
import PostCronograma from "@/hooks/PostCronograma";
import { Cono } from "@/types/Cronograma";
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Redirect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Modal, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Row, Table } from 'react-native-table-component';
import Alertas from '../../components/ui/Alertas';

const ESTADOS = ['', 'Realizado', 'Cerrado'];

export default function Cronograma() {
    const { image, pickImage, imageBase64, resetImagePicker } = useImagePicker();
    const { isLoggedIn, perfil } = useAuth();
    const [data, setData] = useState<Cono[]>([]);
    const cronogramaUrl = process.env.EXPO_PUBLIC_CRONOGRAMA;
    const theme = useColorScheme();
    const [selectedRecord, setSelectedRecord] = useState<Cono | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [prueba, setPrueba] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    // Redirect si no está logueado
    if (!isLoggedIn) {
        console.log("Usuario no autenticado - Redirigiendo a login");
        return <Redirect href="/" />;
    }

    // === FUNCIÓN REUTILIZABLE PARA TRAER DATOS ===
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fetchData = useCallback(async () => {
        if (!cronogramaUrl) {
            Alertas("URL del cronograma no está definida.");
            return;
        }

        try {
            const res = await axios.post(
                cronogramaUrl,
                perfil,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Origin: "http://ganeyumbo.ddns.net",
                    },
                }
            );

            if (res.status === 200) {
                setData(res.data as Cono[]);
                Alertas("Información cargada correctamente");
            } else {
                Alertas("Error al traer información");
            }
        } catch (error: any) {
            console.error("Error en la petición:", error.response?.data || error.message);
            Alertas("Error al traer o compartir el arqueo");
        } finally {
            setRefreshing(false); // 👈 importante
        }
    }, [cronogramaUrl, perfil]);

    // Ejecuta la primera carga
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Pull-to-refresh
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
    }, [fetchData]);

    const fecha = new Date().toISOString().split("T")[0];
    const tableHead = ["Día", "Punto de Venta", "Estado"];

    const renderButton = (item: Cono) => {
        const isDisabled = item.estado?.trim() === "Cerrado" || item.estado?.trim() === "Realizado";

        return (
            <TouchableOpacity
                onPress={() => {
                    if (!isDisabled) {  // Solo se ejecuta si NO está deshabilitado
                        setSelectedRecord(item);
                        setPrueba(item.estado?.trim());
                        setModalVisible(true);
                    }
                }}
                disabled={isDisabled} // Deshabilita el botón
                style={[
                    styles.actionButton,
                    isDisabled && { backgroundColor: "#ccc" } // opcional: darle estilo de "bloqueado"
                ]}
            >
                <ThemedText style={styles.btnText}>
                    {isDisabled ? "visitado" : "Ver"}
                </ThemedText>s
            </TouchableOpacity>
        );
    };


    const modalBackgroundColors: Record<string, string> = {
        light: "#ffffff",
        dark: "#1e1e1e",
    };

    const { enviarCronograma } = PostCronograma({
        id: selectedRecord?.id,
        estado: prueba,
        imagen: imageBase64,
        perfil
    });

    const handleEnviarCronograma = async () => {
        try {
            const envioExitoso = await enviarCronograma();
            if (envioExitoso) {
                resetImagePicker(); // Limpia el selector de imágenes
            }
        } catch (error) {
            console.error("Error inesperado:", error);
            Alertas("Ocurrió un error inesperado");
        }
    };

    return (
        <SafeAreaView>
            <ThemedView>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
                        <Row
                            data={[...tableHead, "Acción"]}
                            style={styles.head}
                            textStyle={[
                                styles.text,
                                theme === "dark" ? styles.textDark : styles.textLight
                            ]}
                        />
                        {data
                            .filter(item => item.dia === fecha)
                            .map((item, index) => (
                                <Row
                                    key={index}
                                    data={[
                                        item.dia,
                                        item.puntodeventa,
                                        item.estado,
                                        renderButton(item)
                                    ]}
                                    style={styles.row}
                                    textStyle={[
                                        styles.text,
                                        theme === "dark" ? styles.textDark : styles.textLight
                                    ]}
                                />
                            ))}
                    </Table>
                </ScrollView>

                {/* Modal de Detalles */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={[
                            styles.modalView,
                            { backgroundColor: modalBackgroundColors[theme ?? "light"], borderColor: modalBackgroundColors[theme ?? "black"], borderWidth: 1 }
                        ]}>
                            {selectedRecord && (
                                <>
                                    <ThemedText type="title">Detalles del Registro</ThemedText>
                                    <ThemedText type="defaultSemiBold">ID: {selectedRecord.id}</ThemedText>
                                    <ThemedText type="defaultSemiBold">Día: {selectedRecord.dia}</ThemedText>
                                    <ThemedText type="defaultSemiBold">Empresa: {selectedRecord.empresa}</ThemedText>
                                    <ThemedText type="defaultSemiBold">Punto de Venta: {selectedRecord.puntodeventa}</ThemedText>

                                    <View style={{ alignItems: "center", marginVertical: 15 }}>
                                        <ThemedText style={{ marginBottom: 8, fontWeight: "bold", fontSize: 16 }}>
                                            Estado
                                        </ThemedText>
                                        <Picker
                                            selectedValue={prueba}
                                            onValueChange={(itemValue) => setPrueba(itemValue)}
                                            style={{
                                                color: theme === "dark" ? "#fff" : "#000",
                                                width: 200,
                                                height: 50,
                                                backgroundColor: theme === "dark" ? "#333" : "#eee",
                                                borderRadius: 50,
                                            }}
                                            dropdownIconColor={theme === "dark" ? "#fff" : "#000"}
                                        >
                                            {ESTADOS.map((estado) => (
                                                <Picker.Item key={estado} label={estado} value={estado} />
                                            ))}
                                        </Picker>
                                    </View>

                                    {prueba === "Cerrado" && (
                                        <>
                                            {image ? (
                                                <>
                                                    <Image
                                                        source={{ uri: image }}
                                                        style={{ width: 300, height: 200, backgroundColor: theme === "dark" ? "#333" : "#eee" }}
                                                        resizeMode="contain"
                                                    />
                                                    <TouchableOpacity
                                                        style={styles.changeButton}
                                                        onPress={pickImage}
                                                    >
                                                        <ThemedText>Cambiar imagen</ThemedText>
                                                    </TouchableOpacity>
                                                </>
                                            ) : (
                                                <TouchableOpacity
                                                    style={styles.placeholder}
                                                    onPress={pickImage}
                                                >
                                                    <ThemedText>+ Seleccionar imagen</ThemedText>
                                                </TouchableOpacity>
                                            )}
                                        </>
                                    )}

                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            setModalVisible(false);
                                            handleEnviarCronograma();
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Enviar</Text>
                                    </Pressable>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    head: { height: 40 },
    row: { height: 40 },
    text: { textAlign: 'center' },
    textLight: { color: "#000" },
    textDark: { color: "#fff" },
    btnText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    placeholder: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 20,
    },
    changeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#78a8f3',
        borderRadius: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    actionButton: {
        backgroundColor: "#78a8f3",
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    scrollView: {
        flexGrow: 1,
        padding: 10,
    },
});
