import { useAuth } from '@/auth/AuthProvider';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeInput } from '@/components/ThemeInput';
import { Camera, CameraView } from 'expo-camera';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Caja_Rollos } from '../../components/Caja_Rollos';

export default function ArqueoForm() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [Punto_venta, setPunto_venta] = useState('');
  const [Categorizacion, setCategorizacion] = useState('');

  const [Venta_bruta, setVenta_bruta] = useState('');
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


  const { isLoggedIn } = useAuth();
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    ip: '',
    nombre: '',
    cedula: '',
    sucursal: ''
  });

  const { Total_monedasCaja, Total_billetesCaja, Total_premiosCaja, Total_Caja, Rollos_bnet, Rollos_fisicos, Total_Rollos,
    handleCaja, handleRollos, setRollos_bnet, setTotal_monedasCaja, setTotal_billetesCaja, setTotal_premiosCaja, setRollos_fisicos } = Caja_Rollos();

  // Solicitar permisos de cámara
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


  // Procesar datos del QR
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

  const handleCalcular = () => {
    if (!Venta_bruta) {
      Alert.alert('Error', 'Venta bruta se encuentra vacío');
      return;
    }
    if (!Base_efectivo) {
      Alert.alert('Error', 'Base efectivo se encuentra vacío');
      return;
    }
    if (!Cartera) {
      Alert.alert('Error', 'Cartera se encuentra vacío');
      return;
    }
    if (!Chance_abonados) {
      Alert.alert('Error', 'Chance abonados se encuentra vacío');
      return;
    }
    if (!Chance_impresos) {
      Alert.alert('Error', 'Chance impresos se encuentra vacío');
      return;
    }
    if (!Premios_pagados) {
      Alert.alert('Error', 'Premios pagados se encuentra vacío');
      return;
    }
    if (!Efectivo_cajafuerte) {
      Alert.alert('Error', 'Efectivo caja fuerte se encuentra vacío');
      return;
    }
    if (!Tirilla_recaudo) {
      Alert.alert('Error', 'Tirilla recaudo se encuentra vacío');
      return;
    }
    if (!Total_monedas) {
      Alert.alert('Error', 'Total monedas se encuentra vacío');
      return;
    }
    if (!Total_billetes) {
      Alert.alert('Error', 'Total billetes se encuentra vacío');
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
        <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }} >
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
                styles.Button, // Primero aplica todos los estilos base del botón
                {
                  transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                }
              ]}
            >
              <Text>Generar pdf</Text>
            </Pressable>

            <Pressable
              onPress={logout}
              style={({ pressed }) => [
                styles.Button, // Primero aplica todos los estilos base del botón
                {
                  transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                }
              ]}
            >
              <Text>Salir</Text>
            </Pressable>

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
                  onChangeText={(text: any) => setFormData({ ...formData, ip: text })}
                />
                <ThemeInput
                  placeholder="NOMBRE"
                  value={formData.nombre}
                  onChangeText={(text: any) => setFormData({ ...formData, nombre: text })}
                />
                <ThemeInput
                  placeholder="CEDULA"
                  value={formData.cedula}
                  onChangeText={(text: any) => setFormData({ ...formData, cedula: text })}
                />
                <ThemeInput
                  placeholder="SUCURSAL"
                  value={formData.sucursal}
                  onChangeText={(text: any) => setFormData({ ...formData, sucursal: text })}
                />

                <ThemedText type='subtitle'>Punto de venta</ThemedText>
                <ThemeInput
                  onChangeText={(text: string) => setPunto_venta(text)}
                  value={Punto_venta}
                  placeholder="ingresar Punto De Venta"
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
                    styles.Calcular, // Primero aplica todos los estilos base del botón
                    {
                      transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                    }
                  ]}
                >
                  <Text>Realizar Operaciones</Text>
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
                    styles.Calcular, // Primero aplica todos los estilos base del botón
                    {
                      transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                    }
                  ]}
                >
                  <Text>Operaciones Caja</Text>
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
                  <Text>Calcular Rollos</Text>
                </Pressable>

              </ThemedView>
            </>
          )}
        </ParallaxScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563eb', // azul fuerte de fondo
  },
  conten: {
    width: '92%',
    height: '95%',
    minHeight: 380,
    backgroundColor: '#fff', // blanco para el formulario
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
    elevation: 6, // sombra en Android
    shadowColor: '#000', // sombra en iOS
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
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  Button: {
    borderRadius: 5,
    backgroundColor: '#78a8f3',
    padding: 10,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    right: '10%'
  },
  Calcular: {
    borderRadius: 5,
    backgroundColor: '#78a8f3',
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
});