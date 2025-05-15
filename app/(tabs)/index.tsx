import { ThemeInput } from '@/components/ThemeInput';
import UseLogin from '@/hooks/UseLogin';
import { useState } from 'react';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  const [Usuario, setUsuario] = useState('')
  const [Contraseña, setContraseña] = useState('')

  const { loading, handleLogin, error } = UseLogin({
    Usuario,
    Contraseña
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.conten}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Arqueo multiempres</Text>
        <Image
          source={require('../../assets/images/logogane.webp')}
          style={{
            width: 300,
            height: 100,
            resizeMode: 'contain',
            marginTop: 20
          }} />

        <Text style={styles.Text} >Usuario</Text>
        <ThemeInput
          style={styles.input}
          onChangeText={text => setUsuario(text)}
          value={Usuario}
          placeholder="ingresar usuario"
        />
        <Text style={styles.Text} >Contraseña</Text>
        <ThemeInput
          style={styles.input}
          onChangeText={text => setContraseña(text)}
          value={Contraseña}
          placeholder="ingresar contraseña"
          secureTextEntry={true}
        />

        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.Button, // Primero aplica todos los estilos base del botón
            {
              transform: pressed ? [{ scale: 0.90 }] : [{ scale: 1 }],
            }
          ]}
        >
          <Text> Iniciar sesion</Text>
        </Pressable>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
      {loading && <Text style={styles.success}> {loading ? 'Cargando...' : 'Iniciar sesión'}</Text>}

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '147%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conten: {
    width: '90%',
    minHeight: 380,
    backgroundColor: '#c7e0fa', // azul más notorio
    borderWidth: 2,
    borderColor: '#2563eb', // azul fuerte para el borde
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    alignSelf: 'center',
    paddingVertical: 24,
    paddingHorizontal: 10,
    elevation: 4, // sombra en Android
    shadowColor: '#000', // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    width: '60%',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: 'black'
  },
  Text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20
  },
  Button: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#78a8f3',
    padding: 10,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f8d7da',
  },
  success: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#d4edda',
  }
});

