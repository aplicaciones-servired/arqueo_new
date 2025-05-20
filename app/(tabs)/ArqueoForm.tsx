import { useAuth } from '@/auth/AuthProvider';
import { Firma } from '@/components/Firma';
import { useImagePicker } from '@/components/ImagePickerComponent';
import { useLocationComponent } from '@/components/Location';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { usePreguntasChec } from '@/components/Preguntas_Chec';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeInput } from '@/components/ThemeInput';
import { Camera, CameraView } from 'expo-camera';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Caja_Rollos } from '../../components/Caja_Rollos';
import { Entrega_salida } from '../../components/Entrega_Salidaefectivo';
import { Raspas } from '../../components/Raspas';

export default function ArqueoForm(props: { firmaAuditoria: any; firmaColocador: any }) {
  const { firmaAuditoria, firmaColocador } = props;
  console.log('first', firmaAuditoria);
  console.log('second', firmaColocador);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [Punto_venta, setPunto_venta] = useState('');
  const [Categorizacion, setCategorizacion] = useState('');


  const { isLoggedIn } = useAuth();
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    ip: '',
    nombre: '',
    cedula: '',
    sucursal: ''
  });
  const { Entrega_salidaComponent } = Entrega_salida();

  const { PreguntasChecComponent } = usePreguntasChec();

  const { Caja_RollosComponent } = Caja_Rollos();

  const { RaspasComponent } = Raspas();

  const { ImageComponent } = useImagePicker();

  const { latitude, longitude } = useLocationComponent();

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

                <Entrega_salidaComponent />

                <Caja_RollosComponent />

                <RaspasComponent />

                <PreguntasChecComponent />

                <ImageComponent />

                <Firma />

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
    backgroundColor: '#2563eb', // azul fuerte de fondo
    borderRadius: 16,

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
});