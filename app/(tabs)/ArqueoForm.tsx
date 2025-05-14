import { useAuth } from '@/auth/AuthProvider';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeInput } from '@/components/ThemeInput';
import { Camera, CameraView } from 'expo-camera';
import { Redirect, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ArqueoForm() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [Punto_venta, setPunto_venta] = useState('');
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    ip: '',
    nombre: '',
    cedula: '',
    sucursal: ''
  });


  // Solicitar permisos de cámara
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleLogin = async () => {
    router.replace({
      pathname: "/", // Cambia esto por la ruta real de tu login
    });
  }

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
        <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }} >
          <ThemedText type="title">Arqueo multiempres</ThemedText>
          <ThemedView style={styles.titleContainer}>


            <Pressable
              style={styles.Button}
              onPress={() => setShowScanner(!showScanner)}
            >
              <Text>{showScanner ? 'Cancelar escaneo' : 'Escanear QR'}</Text>
            </Pressable>

            <Pressable style={styles.Button} onPress={handleLogin}>
              <Text>Generar pdf</Text>
            </Pressable>

            <Pressable style={styles.Button} onPress={handleLogin}>
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
              </ThemedView>

              <ThemedView style={styles.formContainer}>
                <ThemedText type='subtitle'>Punto de venta</ThemedText>
                <ThemeInput
                  onChangeText={(text: string) => setPunto_venta(text)}
                  value={Punto_venta}
                  placeholder="ingresar Punto De Venta"
                />
              </ThemedView>

              <ThemedView style={styles.formContainer}>
                <ThemedText type='subtitle'>Categorizacion del punto</ThemedText>
                <ThemeInput
                  onChangeText={(text: string) => setPunto_venta(text)}
                  value={Punto_venta}
                  placeholder="ingresar Punto De Venta"
                />
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
  qr: {

  },
  formContainer: {
    alignItems: 'center',
    padding: 5,
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