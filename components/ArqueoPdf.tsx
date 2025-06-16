import { useAuth } from "@/context/AuthProvider";
import { Arqueo } from "@/types/Arqueo";
import axios from "axios";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from "./ThemedText";
import Alertas from './ui/Alertas';


export function ArquePdf() {

    const { perfil } = useAuth();
    
    const servired = process.env.EXPO_PUBLIC_PDF_SERVIRED;
    const multired = process.env.EXPO_PUBLIC_PDF_MULTIRED;

    let url = "";

    if (perfil === "AUDITORIA-MULTIRED") {
        url = multired || "";
    } else {
        url = servired || "";
    }


    const [loading, setLoading] = useState(false);
    // const [imagen, setImagen] = useState(null); // This state is not used in the provided code

    const formatBase64Image = (data: string | undefined, type: 'jpeg' | 'png') => {
        if (!data || data.trim() === '') return '';
        // Add a more robust cleaning step for any hidden characters that might come from DB
        const cleanedData = data.replace(/[\n\r\s]/g, ''); // Remove newlines, carriage returns, spaces
        if (cleanedData.startsWith('data:image')) return cleanedData;
        return `data:image/${type};base64,${cleanedData}`;
    };


    const getHtml = (arqueos: Arqueo[]) => {
        return `
    <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1, h2 { text-align: center; color: #ed6060; }
                .section { margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 20px; }
                p { margin: 4px 0; }
                img { margin-top: 10px; }
            </style>
        </head>
        <body>
            <h1>Reporte de Arqueos</h1>
            ${arqueos.map(arqueo => `
                <div class="section">
                    <h2>Información General</h2>
                    <p><strong>ID:</strong> ${arqueo.id}</p>
                    <p><strong>Nombre:</strong> ${arqueo.nombres}</p>
                    <p><strong>Documento:</strong> ${arqueo.documento}</p>
                    <p><strong>Sucursal:</strong> ${arqueo.sucursal}</p>
                    <p><strong>Supervisor:</strong> ${arqueo.supervisor}</p>
                    <p><strong>Punto de Venta:</strong> ${arqueo.puntodeventa}</p>
                    <p><strong>Ubicación:</strong> Lat ${arqueo.latitud}, Lon ${arqueo.longitud}</p>

                    <h2>Ingresos</h2>
                    <p><strong>Venta Bruta:</strong> ${arqueo.ventabruta}</p>
                    <p><strong>Base Efectivo:</strong> ${arqueo.baseefectivo}</p>
                    <p><strong>Cartera:</strong> ${arqueo.cartera}</p>
                    <p><strong>Total Ingreso:</strong> ${arqueo.totalingreso}</p>

                    <h2>Egresos</h2>
                    <p><strong>Chances Abonado:</strong> ${arqueo.chancesabonado}</p>
                    <p><strong>Chances Preimpresos:</strong> ${arqueo.chancespreimpresos}</p>
                    <p><strong>Premios Pagados:</strong> ${arqueo.premiospagados}</p>
                    <p><strong>Efectivo Caja Fuerte:</strong> ${arqueo.efectivocajafuerte}</p>
                    <p><strong>Tirilla Recaudo:</strong> ${arqueo.tirillarecaudo}</p>
                    <p><strong>Total Egresos:</strong> ${arqueo.totalegresos}</p>

                    <h2>Resumen de Caja</h2>
                    <p><strong>Total Billetes:</strong> ${arqueo.totalbilletes || 0}</p>
                    <p><strong>Total Monedas:</strong> ${arqueo.totalmonedas || 0}</p>
                    <p><strong>Total Arqueo:</strong> ${arqueo.totalarqueo || 0}</p>
                    <p><strong>Sobrante/Faltante:</strong> ${arqueo.sobrantefaltante || 0}</p>

                    <h2>Dinero en Caja</h2>
                    <p><strong>Total Billetes Caja:</strong> ${arqueo.totalbilletescaja}</p>
                    <p><strong>Total Monedas Caja:</strong> ${arqueo.totalmonedascaja}</p>
                    <p><strong>Total Premios Caja:</strong> ${arqueo.totalpremioscaja}</p>
                    <p><strong>Total Caja:</strong> ${arqueo.total}</p>

                    <h2>Rollos</h2>
                    <p><strong>Rollos Bnet:</strong> ${arqueo.rollos_bnet}</p>
                    <p><strong>Rollos Físicos:</strong> ${arqueo.rollos_fisicos}</p>
                    <p><strong>Diferencia:</strong> ${arqueo.diferencia}</p>
                    
                    
                    ${arqueo.nombre_juego ? `
                        <h2>Raspas</h2>
                    <h2>Juego1</h2>
                    <p><strong>Nombre Juego:</strong> ${arqueo.nombre_juego}</p>
                    <p><strong>Cantidad BNET:</strong> ${arqueo.cantidad_bnet}</p>
                    <p><strong>Cantidad Fisicos:</strong> ${arqueo.cantidad_fisicos}</p>
                    <p><strong>Cantidad Faltante:</strong> ${arqueo.cantidad_faltante}</p>
                    <p><strong>Cantidad Tiquete:</strong> ${arqueo.cantidad_tiquete}</p>
                    <p><strong>Descargado:</strong> ${arqueo.descargado}</p>
                    ` : ''}
                    
                    ${arqueo.nombre_juego2 ? `
                    <h2>Juego2</h2>
                    <p><strong>Nombre Juego2:</strong> ${arqueo.nombre_juego2}</p>
                    <p><strong>Cantidad BNET2:</strong> ${arqueo.cantidad_bnet2}</p>
                    <p><strong>Cantidad Fisicos2:</strong> ${arqueo.cantidad_fisicos2}</p>
                    <p><strong>Cantidad Faltante2:</strong> ${arqueo.cantidad_faltante2}</p>
                    <p><strong>Cantidad Tiquete2:</strong> ${arqueo.cantidad_tiquete2}</p>
                    <p><strong>Descargado2:</strong> ${arqueo.descargado2}</p>
                    ` : ''}
                    
                    ${arqueo.nombre_juego3 ? `
                    <h2>Juego3</h2>
                    <p><strong>Nombre Juego3:</strong> ${arqueo.nombre_juego3}</p>
                    <p><strong>Cantidad BNET3:</strong> ${arqueo.cantidad_bnet3}</p>
                    <p><strong>Cantidad Fisicos3:</strong> ${arqueo.cantidad_fisicos3}</p>
                    <p><strong>Cantidad Faltante3:</strong> ${arqueo.cantidad_faltante3}</p>
                    <p><strong>Cantidad Tiquete3:</strong> ${arqueo.cantidad_tiquete3}</p>
                    <p><strong>Descargado3:</strong> ${arqueo.descargado3}</p>
                    ` : ''}
                    
                    ${arqueo.nombre_juego4 ? `
                    <h2>Juego4</h2>
                    <p><strong>Nombre Juego4:</strong> ${arqueo.nombre_juego4}</p>
                    <p><strong>Cantidad BNET4:</strong> ${arqueo.cantidad_bnet4}</p>
                    <p><strong>Cantidad Fisicos4:</strong> ${arqueo.cantidad_fisicos4}</p>
                    <p><strong>Cantidad Faltante4:</strong> ${arqueo.cantidad_faltante4}</p>
                    <p><strong>Cantidad Tiquete4:</strong> ${arqueo.cantidad_tiquete4}</p>
                    <p><strong>Descargado4:</strong> ${arqueo.descargado4}</p>
                    ` : ''}
                    
                    ${arqueo.nombre_juego5 ? `
                    <h2>Juego5</h2>
                    <p><strong>Nombre Juego5:</strong> ${arqueo.nombre_juego5}</p>
                    <p><strong>Cantidad BNET5:</strong> ${arqueo.cantidad_bnet5}</p>
                    <p><strong>Cantidad Fisicos5:</strong> ${arqueo.cantidad_fisicos5}</p>
                    <p><strong>Cantidad Faltante5:</strong> ${arqueo.cantidad_faltante5}</p>
                    <p><strong>Cantidad Tiquete5:</strong> ${arqueo.cantidad_tiquete5}</p>
                    <p><strong>Descargado5:</strong> ${arqueo.descargado5}</p>
                    ` : ''}

                    ${arqueo.nombre_juego6 ? `
                    <h2>Juego6</h2>
                    <p><strong>Nombre Juego6:</strong> ${arqueo.nombre_juego6}</p>
                    <p><strong>Cantidad BNET6:</strong> ${arqueo.cantidad_bnet6}</p>
                    <p><strong>Cantidad Fisicos6:</strong> ${arqueo.cantidad_fisicos6}</p>
                    <p><strong>Cantidad Faltante6:</strong> ${arqueo.cantidad_faltante6}</p>
                    <p><strong>Cantidad Tiquete6:</strong> ${arqueo.cantidad_tiquete6}</p>
                    <p><strong>Descargado6:</strong> ${arqueo.descargado6}</p>
                    ` : ''}
 
                    ${arqueo.nombre_juego7 ? `
                    <h2>Juego7</h2>
                    <p><strong>Nombre Juego7:</strong> ${arqueo.nombre_juego7}</p>
                    <p><strong>Cantidad BNET7:</strong> ${arqueo.cantidad_bnet7}</p>
                    <p><strong>Cantidad Fisicos7:</strong> ${arqueo.cantidad_fisicos7}</p>
                    <p><strong>Cantidad Faltante7:</strong> ${arqueo.cantidad_faltante7}</p>
                    <p><strong>Cantidad Tiquete7:</strong> ${arqueo.cantidad_tiquete7}</p>
                    <p><strong>Descargado7:</strong> ${arqueo.descargado7}</p>
                    ` : ''}

                    <h2>Verificacion del PDV</h2>
                    <p><strong>¿Tiene la puerta asegurada?:</strong> ${arqueo.requisito1}</p>
                    <p><strong>¿Elementos de aseo, sillas, computador, iluminación en buen estado?:</strong> ${arqueo.requisito2}</p>
                    <p><strong>¿Aviso de videovigilancia y cámaras?:</strong> ${arqueo.requisito3}</p>
                    <p><strong>¿Utiliza Superflex?:</strong> ${arqueo.requisito4}</p>
                    <p><strong>¿Tiene caja fuerte?:</strong> ${arqueo.requisito5}</p>
                    <p><strong>¿Tiene caja digital auxiliar? ¿Conoce las bases de efectivo asignadas para caja digital y principal?:</strong> ${arqueo.requisito6}</p>
                    <p><strong>¿Las recargas se hacen a través de la red propia de la Cía?:</strong> ${arqueo.requisito7}</p>
                    <p><strong>¿Cumple con los topes de efectivo establecidos en caja digital y principal?:</strong> ${arqueo.requisito8}</p>
                    <p><strong>¿Tiene los premios descargados? ¿Conoce los requisitos y montos máximos para pago de premios?:</strong> ${arqueo.requisito9}</p>
                    <p><strong>¿La lotería física tiene impreso el nombre de la Cía o de Servicios Transaccionales? (Reportar inmediato en caso negativo):</strong> ${arqueo.requisito10}</p>
                    <p><strong>¿Publicidad exhibida actualizada?:</strong> ${arqueo.requisito11}</p>
                    <p><strong>¿Aviso externo de "Vigilado y Controlado Mintic" y "Colaborador Autorizado"?:</strong> ${arqueo.requisito12}</p>
                    <p><strong>¿Afiche MINTIC SUPERGIROS (Contiene aviso de canales de comunicación, tarifario, condiciones del servicio, sticker tirilla electrónica CRC)?:</strong> ${arqueo.requisito13}</p>
                    <p><strong>¿Calendario de resultados Superastro diligenciado (tiene que tener los resultados)?:</strong> ${arqueo.requisito14}</p>
                    <p><strong>¿Presta servicio de Western Union? (Es obligatorio para cajero comerciales):</strong> ${arqueo.requisito15}</p>
                    <p><strong>¿Calendarios de acumulados (Baloto - Miloto - Colorloto)?:</strong> ${arqueo.requisito16}</p>
                    <p><strong>¿Tablero de resultados y acumulados actualizados?:</strong> ${arqueo.requisito17}</p>
                    <p><strong>¿Licencia de funcionamiento de Beneficencia del Valle con año actualizado?:</strong> ${arqueo.requisito18}</p>
                    <p><strong>¿Tiene equipos de Betplay y/o máquinas de ruta? (Si los tiene debe tener el aviso "Autorizado Coljuegos"):</strong> ${arqueo.requisito19}</p>
                    <p><strong>¿Tiene aviso con código QR para PQR?:</strong> ${arqueo.requisito20}</p>
                    <p><strong>¿Verificó el cableado?:</strong> ${arqueo.requisito21}</p>

                    <h2>Cajero y/o Colocador I:</h2>
                    <p><strong>¿Tiene prendas emblemáticas y presentación adecuada?:</strong> ${arqueo.requisito22}</p>
                    <p><strong>¿El usuario corresponde a la cédula del mismo?:</strong> ${arqueo.requisito23}</p>
                    <p><strong>¿Tiene usuario de giros? ¿Presta el servicio?:</strong> ${arqueo.requisito24}</p>
                    <p><strong>¿Tiene usuario de la ONJ (para Baloto, Miloto, Colorloto)?:</strong> ${arqueo.requisito25}</p>
                    <p><strong>¿Tiene usuario de SUPERFLEX?:</strong> ${arqueo.requisito26}</p>
                    <p><strong>¿Tiene usuario de CORREDOR EMPRESARIAL (Astro, Chance Millonario, Betplay)?:</strong> ${arqueo.requisito27}</p>
                    <p><strong>¿Está realizando recaudo en tesorería BNET a la compañía?:</strong> ${arqueo.requisito28}</p>
                    <p><strong>¿Está comercializando el portafolio completo?:</strong> ${arqueo.requisito29}</p>
                    <p><strong>¿Solicita el documento de identificación al cliente?:</strong> ${arqueo.requisito30}</p>
                    <p><strong>¿Conoce Supervoucher, funciona?:</strong> ${arqueo.requisito31}</p>
                    <p><strong>¿Conoce el procedimiento para remitentes y destinatarios menores de edad?:</strong> ${arqueo.requisito32}</p>
                    <p><strong>¿Conoce los reportes de operaciones en efectivo (R.O.E.), firmas, huellas (transacciones ≥ $10.000.000)?:</strong> ${arqueo.requisito33}</p>
                    <p><strong>¿El Supervisor Cial realiza las visitas?:</strong> ${arqueo.requisito34}</p>
                    <p><strong>¿Conoce los términos SARL, SARLAFT, SARO, operación inusual y operación sospechosa?:</strong> ${arqueo.requisito35}</p>

                    <p><strong>nombre observacion:</strong> ${arqueo.nombre_observacion || ''}</p>
                    ${arqueo.imagen_observacion ? `
                        <div>
                            <strong>Imagen Observación:</strong><br/>
                            <img src="${formatBase64Image(arqueo.imagen_observacion, 'png')}" width="200" />
                        </div>
                    ` : ''}

                    ${arqueo.firma_colocadora ? `
                        <div>
                            <strong>Firma Colocadora:</strong><br/>
                            <img src="${formatBase64Image(arqueo.firma_colocadora, 'png')}" width="200" />
                        </div>
                    ` : ''}

                    ${arqueo.firma_auditoria ? `
                        <div>
                            <strong>Firma Auditoría:</strong><br/>
                            <img src="${formatBase64Image(arqueo.firma_auditoria, 'png')}" width="200" />
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </body>
    </html>
    `;
    };


    const print = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            if (res.status === 200) {
                const arqueos = res.data as Arqueo[];
                await Print.printAsync({ html: getHtml(arqueos) });
                Alertas("PDF generado");
            } else {
                Alertas("Error al traer el último arqueo");
            }
        } catch (error: any) {
            console.error("Error en la petición:", error.response?.data || error.message);
            Alertas("Error al traer o imprimir el arqueo");
        } finally {
            setLoading(false);
        }
    };

    const printToFile = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            if (res.status === 200) {
                const arqueos = res.data as Arqueo[];
                const { uri } = await Print.printToFileAsync({ html: getHtml(arqueos) });
                console.log('File has been saved to:', uri);
                await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
                Alertas("PDF compartido");
            } else {
                Alertas("Error al traer el último arqueo");
            }
        } catch (error: any) {
            console.error("Error en la petición:", error.response?.data || error.message);
            Alertas("Error al traer o compartir el arqueo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <Pressable onPress={print} style={({ pressed }) => [
                styles.Button,
                { transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }] }
            ]}>
                <ThemedText style={styles.buttonText}>Generar PDF</ThemedText>
            </Pressable>
            <Pressable onPress={printToFile} style={({ pressed }) => [
                styles.Button,
                { transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }] }
            ]}>
                <ThemedText style={styles.buttonText}>Compartir PDF</ThemedText>
            </Pressable>

            {loading && (
                Alertas("Procesando PDF...")
            )}
        </>
    );
}

const styles = StyleSheet.create({
    Button: {
        borderRadius: 5,
        backgroundColor: '#ed6060',
        padding: 10,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        right: '10%'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});