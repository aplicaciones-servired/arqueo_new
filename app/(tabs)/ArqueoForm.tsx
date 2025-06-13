
import { ArquePdf } from '@/components/ArqueoPdf';
import Firma from '@/components/Firma';
import { useImagePicker } from '@/components/ImagePickerComponent';
import { limpiarFormulario } from '@/components/LimpiarArqueo';
import { useLocationComponent } from '@/components/Location';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { usePreguntasChec } from '@/components/Preguntas_Chec';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeInput } from '@/components/ThemeInput';
import { useAuth } from '@/context/AuthProvider';
import PostArqeuo from '@/hooks/PostArqeuo';
import { Camera, CameraView } from 'expo-camera';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Caja_Rollos } from '../../components/Caja_Rollos';
import { Entrega_salida } from '../../components/Entrega_Salidaefectivo';
import { Raspas } from '../../components/Raspas';


export default function ArqueoForm() {

  const { perfil } = useAuth();
  console.log('pdf', perfil)

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [Punto_venta, setPunto_venta] = useState('');
  const [Categorizacion, setCategorizacion] = useState('');
  const [firmaAuditoria, setFirmaAuditoria] = useState<string>('');
  const [firmaColocadora, setFirmaColocadora] = useState<string>('');
  const [Supervisor, setSupervisor] = useState<any>(null);
  const [requisito, setrequisito] = useState<string>('');
  const [latitude, setlatitude] = useState<number | undefined>(undefined);
  const [longitude, setlongitude] = useState<number | undefined>(undefined);

  const { isLoggedIn } = useAuth();
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    ip: '',
    nombre: '',
    cedula: '',
    sucursal: ''
  });

  const colorScheme = useColorScheme();

  const {
    Venta_bruta, setVenta_bruta,
    Base_efectivo, setBase_efectivo,
    Cartera, setCartera,
    Chance_abonados, setChance_abonados,
    Chance_impresos, setChance_impresos,
    Premios_pagados, setPremios_pagados,
    Efectivo_cajafuerte, setEfectivo_cajafuerte,
    Tirilla_recaudo, setTirilla_recaudo,
    Total_monedas, setTotal_monedas,
    Total_billetes, setTotal_billetes,
    Total_egresos,
    Total_ingreso,
    Total_arqueo,
    Sobrante_Faltante,
    handleCalcular } = Entrega_salida();

  const { handleCaja, handleRollos, Total_billetesCaja, Total_monedasCaja,
    Total_premiosCaja, Total_Caja, Rollos_bnet, Rollos_fisicos, Total_Rollos,
    setTotal_monedasCaja, setTotal_billetesCaja, setTotal_premiosCaja,
    setRollos_bnet, setRollos_fisicos } = Caja_Rollos();

  const { nombre_juego, setnombre_juego,
    cantidad_bnet, setcantidad_bnet,
    cantidad_fisicos, setcantidad_fisicos,
    cantidad_faltante, setcantidad_faltante,
    cantidad_tiquete, setcantidad_tiquete,
    descargado, setdescargado,
    nombre_juego2, setnombre_juego2,
    cantidad_bnet2, setcantidad_bnet2,
    cantidad_fisicos2, setcantidad_fisicos2,
    cantidad_faltante2, setcantidad_faltante2,
    cantidad_tiquete2, setcantidad_tiquete2,
    descargado2, setdescargado2,
    nombre_juego3, setnombre_juego3,
    cantidad_bnet3, setcantidad_bnet3,
    cantidad_fisicos3, setcantidad_fisicos3,
    cantidad_faltante3, setcantidad_faltante3,
    cantidad_tiquete3, setcantidad_tiquete3,
    descargado3, setdescargado3,
    nombre_juego4, setnombre_juego4,
    cantidad_bnet4, setcantidad_bnet4,
    cantidad_fisicos4, setcantidad_fisicos4,
    cantidad_faltante4, setcantidad_faltante4,
    cantidad_tiquete4, setcantidad_tiquete4,
    descargado4, setdescargado4,
    nombre_juego5, setnombre_juego5,
    cantidad_bnet5, setcantidad_bnet5,
    cantidad_fisicos5, setcantidad_fisicos5,
    cantidad_faltante5, setcantidad_faltante5,
    cantidad_tiquete5, setcantidad_tiquete5,
    descargado5, setdescargado5,
    nombre_juego6, setnombre_juego6,
    cantidad_bnet6, setcantidad_bnet6,
    cantidad_fisicos6, setcantidad_fisicos6,
    cantidad_faltante6, setcantidad_faltante6,
    cantidad_tiquete6, setcantidad_tiquete6,
    descargado6, setdescargado6,
    nombre_juego7, setnombre_juego7,
    cantidad_bnet7, setcantidad_bnet7,
    cantidad_fisicos7, setcantidad_fisicos7,
    cantidad_faltante7, setcantidad_faltante7,
    cantidad_tiquete7, setcantidad_tiquete7,
    descargado7, setdescargado7,
    Cantidad_descargados,
    Total_descargados,
    handleRaspas } = Raspas();

  const { preguntas, togglePregunta } = usePreguntasChec({ requisito: setrequisito });
  const requisitosObj = requisito ? JSON.parse(requisito) : {};


  const { image, pickImage, Nombre_observacion, setNombre_observacion, imageBase64, setImage } = useImagePicker();

  useLocationComponent({ setlatitude: setlatitude, setlongitude: setlongitude });
  console.log('first', latitude)
  console.log('first', longitude)

  const { enviarArqueo } = PostArqeuo({
    ip: formData.ip,
    nombre: formData.nombre,
    cedula: formData.cedula,
    sucursal: formData.sucursal,
    punto_venta: Punto_venta,
    Venta_bruta: Venta_bruta,
    Base_efectivo: Base_efectivo,
    Cartera: Cartera,
    Total_ingreso: Total_ingreso,
    Chance_abonados: Chance_abonados,
    Chance_impresos: Chance_impresos,
    Premios_pagados: Premios_pagados,
    Efectivo_cajafuerte: Efectivo_cajafuerte,
    Tirilla_recaudo: Tirilla_recaudo,
    Total_egresos: Total_egresos,
    Total_monedas: Total_monedas,
    Total_billetes: Total_billetes,
    Total_arqueo: Total_arqueo,
    Sobrante_Faltante: Sobrante_Faltante,
    Total_billetesCaja: Total_billetesCaja,
    Total_monedasCaja: Total_monedasCaja,
    Total_premiosCaja: Total_premiosCaja,
    Total_Caja: Total_Caja,
    Rollos_bnet: Rollos_bnet,
    Rollos_fisicos: Rollos_fisicos,
    Total_Rollos: Total_Rollos,
    nombre_juego: nombre_juego,
    cantidad_bnet: cantidad_bnet,
    cantidad_fisicos: cantidad_fisicos,
    cantidad_faltante: cantidad_faltante,
    cantidad_tiquete: cantidad_tiquete,
    descargado: descargado,
    nombre_juego2: nombre_juego2,
    cantidad_bnet2: cantidad_bnet2,
    cantidad_fisicos2: cantidad_fisicos2,
    cantidad_faltante2: cantidad_faltante2,
    cantidad_tiquete2: cantidad_tiquete2,
    descargado2: descargado2,
    nombre_juego3: nombre_juego3,
    cantidad_bnet3: cantidad_bnet3,
    cantidad_fisicos3: cantidad_fisicos3,
    cantidad_faltante3: cantidad_faltante3,
    cantidad_tiquete3: cantidad_tiquete3,
    descargado3: descargado3,
    nombre_juego4: nombre_juego4,
    cantidad_bnet4: cantidad_bnet4,
    cantidad_fisicos4: cantidad_fisicos4,
    cantidad_faltante4: cantidad_faltante4,
    cantidad_tiquete4: cantidad_tiquete4,
    descargado4: descargado4,
    nombre_juego5: nombre_juego5,
    cantidad_bnet5: cantidad_bnet5,
    cantidad_fisicos5: cantidad_fisicos5,
    cantidad_faltante5: cantidad_faltante5,
    cantidad_tiquete5: cantidad_tiquete5,
    descargado5: descargado5,
    nombre_juego6: nombre_juego6,
    cantidad_bnet6: cantidad_bnet6,
    cantidad_fisicos6: cantidad_fisicos6,
    cantidad_faltante6: cantidad_faltante6,
    cantidad_tiquete6: cantidad_tiquete6,
    descargado6: descargado6,
    nombre_juego7: nombre_juego7,
    cantidad_bnet7: cantidad_bnet7,
    cantidad_fisicos7: cantidad_fisicos7,
    cantidad_faltante7: cantidad_faltante7,
    cantidad_tiquete7: cantidad_tiquete7,
    descargado7: descargado7,
    Cantidad_descargados: Cantidad_descargados,
    Total_descargados: Total_descargados,
    imageBase64: imageBase64,
    Nombre_observacion: Nombre_observacion,
    firmaAuditoria,
    firmaColocadora,
    Supervisor,
    ...requisitosObj,
    latitude,
    longitude
  });


  const handleEnviarArqueo = async () => {
    await enviarArqueo();
    limpiarFormulario({
      setPunto_venta,
      setCategorizacion,
      setSupervisor,
      setrequisito,
      setlatitude,
      setlongitude,

      setVenta_bruta,
      setBase_efectivo,
      setCartera,
      setChance_abonados,
      setChance_impresos,
      setPremios_pagados,
      setEfectivo_cajafuerte,
      setTirilla_recaudo,
      setTotal_monedas,
      setTotal_billetes,
      setTotal_monedasCaja,
      setTotal_billetesCaja,
      setTotal_premiosCaja,
      setRollos_bnet,
      setRollos_fisicos,

      setnombre_juego,
      setcantidad_bnet,
      setcantidad_fisicos,
      setcantidad_faltante,
      setcantidad_tiquete,
      setdescargado,

      setnombre_juego2,
      setcantidad_bnet2,
      setcantidad_fisicos2,
      setcantidad_faltante2,
      setcantidad_tiquete2,
      setdescargado2,

      setnombre_juego3,
      setcantidad_bnet3,
      setcantidad_fisicos3,
      setcantidad_faltante3,
      setcantidad_tiquete3,
      setdescargado3,

      setnombre_juego4,
      setcantidad_bnet4,
      setcantidad_fisicos4,
      setcantidad_faltante4,
      setcantidad_tiquete4,
      setdescargado4,

      setnombre_juego5,
      setcantidad_bnet5,
      setcantidad_fisicos5,
      setcantidad_faltante5,
      setcantidad_tiquete5,
      setdescargado5,

      setnombre_juego6,
      setcantidad_bnet6,
      setcantidad_fisicos6,
      setcantidad_faltante6,
      setcantidad_tiquete6,
      setdescargado6,

      setnombre_juego7,
      setcantidad_bnet7,
      setcantidad_fisicos7,
      setcantidad_faltante7,
      setcantidad_tiquete7,
      setdescargado7,
      setImage,
      ssetFormData: function (data: { ip: string; nombre: string; cedula: string; sucursal: string; }): void {
        throw new Error('Function not implemented.');
      }
    });
  };



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  if (!isLoggedIn) {
    console.log("Usuario no autenticado - Redirigiendo a login");
    return <Redirect href="/" />;
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    const parts = data.split('&');
    if (parts.length === 4) {
      setFormData({
        ip: parts[0],
        nombre: parts[1],
        cedula: parts[2],
        sucursal: parts[3]
      });
    }
    setShowScanner(false);
  };


  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Solicitando permiso para la cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>Se necesita permiso para acceder a la cámara</ThemedText>
        <Pressable
          style={styles.permissionButton}
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
        >
          <ThemedText>Conceder permiso</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conten}>
        <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
          <ThemedText type="title">Arqueo multiempres</ThemedText>
          <ThemedView style={styles.titleContainer}>
            <Pressable
              onPress={() => setShowScanner(!showScanner)}
              style={({ pressed }) => [
                styles.Button, // Primero aplica todos los estilos base del botón
                {
                  transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                }
              ]}
            >
              <Text>{showScanner ? 'Cancelar escaneo' : 'Escanear QR'}</Text>
            </Pressable>

            <Pressable
              onPress={logout}
              style={({ pressed }) => [
                styles.Button,
                {
                  transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                }
              ]}
            >
              <Text>Salir</Text>
            </Pressable>

            <ArquePdf />

          </ThemedView>

          {showScanner ? (
            <View style={styles.cameraContainer}>
              <CameraView
                style={styles.camera}
                facing="back"
                onBarcodeScanned={handleBarCodeScanned}
                barcodeScannerSettings={{
                  barcodeTypes: ['qr'],
                }}
              >
                <View style={styles.scannerOverlay}>
                  <Text style={styles.scannerText}>Enfoca el código QR</Text>
                </View>
              </CameraView>
            </View>
          ) : (
            <>
              <ThemedView style={styles.formContainer}>
                <ThemeInput
                  placeholder="IP"
                  value={formData.ip}
                />
                <ThemeInput
                  placeholder="NOMBRE"
                  value={formData.nombre}
                />
                <ThemeInput
                  placeholder="CEDULA"
                  value={formData.cedula}
                />
                <ThemeInput
                  placeholder="SUCURSAL"
                  value={formData.sucursal}
                />

                <ThemedText type='subtitle'>Punto de venta</ThemedText>
                <ThemeInput
                  onChangeText={(text: string) => setPunto_venta(text)}
                  value={Punto_venta}
                  placeholder="ingresar Punto De Venta"
                />

                <ThemedText type='subtitle'>Supervisor</ThemedText>
                <ThemeInput
                  onChangeText={(text: string) => setSupervisor(text)}
                  value={Supervisor}
                  placeholder="ingresar Supervisor"
                />

                <ThemedText type='subtitle'>Categorizacion del punto</ThemedText>
                <ThemeInput
                  onChangeText={(text: string) => setCategorizacion(text)}
                  value={Categorizacion}
                  placeholder="Categorizacion"
                />

                <ThemedText type='subtitle'>Entrega Efectivo</ThemedText>
                <ThemeInput
                  onChangeText={setVenta_bruta}
                  value={Venta_bruta}
                  placeholder="Venta Bruta"
                  keyboardType="numeric"
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
                    styles.Calcular,
                    {
                      transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                    }
                  ]}
                >
                  <ThemedText>Realizar Operaciones</ThemedText>
                </Pressable>

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
                    styles.Calcular,
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
                    styles.Calcular,
                    {
                      transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                    }
                  ]}
                >
                  <ThemedText>Calcular Rollos</ThemedText>
                </Pressable>

                {/* Juego 1 */}
                <ThemedText type='subtitle'>Inventario Raspas 1</ThemedText>
                <ThemeInput
                  onChangeText={setnombre_juego}
                  value={nombre_juego}
                  placeholder="Juego 1"
                />
                <ThemeInput
                  onChangeText={setcantidad_bnet}
                  value={cantidad_bnet}
                  placeholder="Cantidad BNET"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_fisicos}
                  value={cantidad_fisicos}
                  placeholder="Cantidad Fisicos"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_faltante}
                  value={cantidad_faltante}
                  placeholder="Cantidad Faltantes"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_tiquete}
                  value={cantidad_tiquete}
                  placeholder="Valor Tiquete"
                  keyboardType="numeric"
                />
                <ThemeInput
                  value={descargado}
                  placeholder="Total Rollos"
                />

                {/* Juego 2 */}
                <ThemedText type='subtitle'>Inventario Raspas 2</ThemedText>
                <ThemeInput
                  onChangeText={setnombre_juego2}
                  value={nombre_juego2}
                  placeholder="Juego 2"
                />
                <ThemeInput
                  onChangeText={setcantidad_bnet2}
                  value={cantidad_bnet2}
                  placeholder="Cantidad BNET"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_fisicos2}
                  value={cantidad_fisicos2}
                  placeholder="Cantidad Fisicos"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_faltante2}
                  value={cantidad_faltante2}
                  placeholder="Cantidad Faltantes"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_tiquete2}
                  value={cantidad_tiquete2}
                  placeholder="Valor Tiquete"
                  keyboardType="numeric"
                />
                <ThemeInput
                  value={descargado2}
                  placeholder="Total Rollos"
                />

                {/* Juego 3 */}
                <ThemedText type='subtitle'>Inventario Raspas 3</ThemedText>
                <ThemeInput
                  onChangeText={setnombre_juego3}
                  value={nombre_juego3}
                  placeholder="Juego 3"
                />
                <ThemeInput
                  onChangeText={setcantidad_bnet3}
                  value={cantidad_bnet3}
                  placeholder="Cantidad BNET"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_fisicos3}
                  value={cantidad_fisicos3}
                  placeholder="Cantidad Fisicos"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_faltante3}
                  value={cantidad_faltante3}
                  placeholder="Cantidad Faltantes"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_tiquete3}
                  value={cantidad_tiquete3}
                  placeholder="Valor Tiquete"
                  keyboardType="numeric"
                />
                <ThemeInput
                  value={descargado3}
                  placeholder="Total Rollos"
                />

                {/* Juego 4 */}
                <ThemedText type='subtitle'>Inventario Raspas 4</ThemedText>
                <ThemeInput
                  onChangeText={setnombre_juego4}
                  value={nombre_juego4}
                  placeholder="Juego 4"
                />
                <ThemeInput
                  onChangeText={setcantidad_bnet4}
                  value={cantidad_bnet4}
                  placeholder="Cantidad BNET"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_fisicos4}
                  value={cantidad_fisicos4}
                  placeholder="Cantidad Fisicos"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_faltante4}
                  value={cantidad_faltante4}
                  placeholder="Cantidad Faltantes"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_tiquete4}
                  value={cantidad_tiquete4}
                  placeholder="Valor Tiquete"
                  keyboardType="numeric"
                />
                <ThemeInput
                  value={descargado4}
                  placeholder="Total Rollos"
                />

                {/* Juego 5 */}
                <ThemedText type='subtitle'>Inventario Raspas 5</ThemedText>
                <ThemeInput
                  onChangeText={setnombre_juego5}
                  value={nombre_juego5}
                  placeholder="Juego 5"
                />
                <ThemeInput
                  onChangeText={setcantidad_bnet5}
                  value={cantidad_bnet5}
                  placeholder="Cantidad BNET"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_fisicos5}
                  value={cantidad_fisicos5}
                  placeholder="Cantidad Fisicos"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_faltante5}
                  value={cantidad_faltante5}
                  placeholder="Cantidad Faltantes"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_tiquete5}
                  value={cantidad_tiquete5}
                  placeholder="Valor Tiquete"
                  keyboardType="numeric"
                />
                <ThemeInput
                  value={descargado5}
                  placeholder="Total Rollos"
                />

                {/* Juego 6 */}
                <ThemedText type='subtitle'>Inventario Raspas 6</ThemedText>
                <ThemeInput
                  onChangeText={setnombre_juego6}
                  value={nombre_juego6}
                  placeholder="Juego 6"
                />
                <ThemeInput
                  onChangeText={setcantidad_bnet6}
                  value={cantidad_bnet6}
                  placeholder="Cantidad BNET"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_fisicos6}
                  value={cantidad_fisicos6}
                  placeholder="Cantidad Fisicos"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_faltante6}
                  value={cantidad_faltante6}
                  placeholder="Cantidad Faltantes"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_tiquete6}
                  value={cantidad_tiquete6}
                  placeholder="Valor Tiquete"
                  keyboardType="numeric"
                />
                <ThemeInput
                  value={descargado6}
                  placeholder="Total Rollos"
                />

                {/* Juego 7 */}
                <ThemedText type='subtitle'>Inventario Raspas 7</ThemedText>
                <ThemeInput
                  onChangeText={setnombre_juego7}
                  value={nombre_juego7}
                  placeholder="Juego 7"
                />
                <ThemeInput
                  onChangeText={setcantidad_bnet7}
                  value={cantidad_bnet7}
                  placeholder="Cantidad BNET"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_fisicos7}
                  value={cantidad_fisicos7}
                  placeholder="Cantidad Fisicos"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_faltante7}
                  value={cantidad_faltante7}
                  placeholder="Cantidad Faltantes"
                  keyboardType="numeric"
                />
                <ThemeInput
                  onChangeText={setcantidad_tiquete7}
                  value={cantidad_tiquete7}
                  placeholder="Valor Tiquete"
                  keyboardType="numeric"
                />
                <ThemeInput
                  value={descargado7}
                  placeholder="Total Rollos"
                />

                <ThemedText type='subtitle'>Total raspas Raspas</ThemedText>
                <ThemeInput
                  value={Cantidad_descargados}
                  placeholder="Total Cantidad escargados"
                />

                <ThemeInput
                  value={Total_descargados}
                  placeholder="Total Total descargados"
                />

                <Pressable
                  onPress={handleRaspas}
                  style={({ pressed }) => [
                    styles.Calcular,
                    {
                      transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                    }
                  ]}
                >
                  <ThemedText>Calcular Raspas</ThemedText>
                </Pressable>

                <ThemedText type='title'>
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

                <ThemedText type='subtitle'>Imagen observación</ThemedText>

                {image ? (
                  <>
                    <Image
                      source={{ uri: image }}
                      style={styles.image}
                      resizeMode="contain"
                      onError={(e) => console.log('Error al cargar imagen:', e.nativeEvent.error)}
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

                <ThemedText type='subtitle'>Observación</ThemedText>
                <ThemeInput
                  onChangeText={setNombre_observacion}
                  value={Nombre_observacion}
                  placeholder='Nombre de la observación'
                />

                <Firma
                  setFirmaAuditoria={setFirmaAuditoria}
                  setFirmaColocadora={setFirmaColocadora}
                />

                <Pressable
                  onPress={handleEnviarArqueo}
                  style={({ pressed }) => [
                    styles.ButtonEn,
                    {
                      transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                    }
                  ]}
                >
                  <Text>Enviar Arqueos</Text>
                </Pressable>

              </ThemedView>

            </>
          )}
          <View style={styles.locationRow}>
            <ThemedText>{latitude}</ThemedText>
            <ThemedText>{longitude}</ThemedText>
          </View>
        </ParallaxScrollView>
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563eb',
    borderRadius: 16,

  },
  conten: {
    width: '92%',
    height: '95%',
    minHeight: 380,
    backgroundColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  permissionButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#78a8f3',
    borderRadius: 5

  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'flex-end',
  },
  Button: {
    borderRadius: 5,
    backgroundColor: '#78a8f3',
    padding: 13,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    right: '10%'
  },
  ButtonEn: {
    borderRadius: 5,
    backgroundColor: '#f6de58',
    padding: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },

  cameraContainer: {
    height: 400,
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scannerText: {
    color: 'white',
    fontSize: 18,
    marginTop: 300,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 8,
  },

  Calcular: {
    borderRadius: 5,
    backgroundColor: '#78a8f3',
    padding: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
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
  placeholder: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 20
  },
  image: {
    width: '200%',
    maxWidth: 300,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0'
  },

  changeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#78a8f3',
    borderRadius: 5,
  },

  imagecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10
  },
  canvas: {
    height: 200,
    width: 400,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'white',
    marginVertical: 10
  },
});