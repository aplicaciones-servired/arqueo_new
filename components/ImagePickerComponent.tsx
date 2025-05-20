import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeInput } from './ThemeInput';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export const useImagePicker = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [Nombre_observacion, setNombre_observacion] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: undefined,
            quality: 1,
            base64: true, // Habilitar la opción base64
        });

        if (!result.canceled && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setImage(selectedImage.uri);

            // Opción 1: Usar el base64 que viene directamente de ImagePicker (más rápido)
            if (selectedImage.base64) {
                setImageBase64(`data:image/jpeg;base64,${selectedImage.base64}`);
            }
            // Opción 2: Leer el archivo y convertirlo (si base64 no está disponible)
            else {
                try {
                    const base64 = await FileSystem.readAsStringAsync(selectedImage.uri, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                    setImageBase64(`data:image/jpeg;base64,${base64}`);
                } catch (error) {
                    console.error('Error al convertir imagen a base64:', error);
                }
            }
        }
    };

    const ImageComponent = () => (
        <ThemedView style={styles.container}>
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
        </ThemedView>
    );

    return {
        image,
        imageBase64, // Ahora también devuelve la imagen en base64
        pickImage,
        ImageComponent,
        Nombre_observacion,
        setNombre_observacion
    };
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
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
        backgroundColor: '#f0f0f0' // Fondo para visualizar mejor
    },

    changeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#78a8f3',
        borderRadius: 5,
    }
});