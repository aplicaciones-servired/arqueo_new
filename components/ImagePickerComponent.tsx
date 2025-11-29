import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import Alertas from './ui/Alertas';

export const useImagePicker = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [Nombre_observacion, setNombre_observacion] = useState('');

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alertas("Se necesitan permisos para acceder a la galería");
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1, // Calidad máxima al seleccionar, luego comprimimos
                base64: false, // No necesitamos el base64 aquí
            });

            if (!result.canceled && result.assets.length > 0) {
                const selectedImage = result.assets[0];
                setImage(selectedImage.uri);

                // Comprimir a JPEG calidad 0.3 (equivalente a 30%)
                const manipResult = await ImageManipulator.manipulateAsync(
                    selectedImage.uri,
                    [],
                    { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG, base64: true }
                );

                // Guardar solo el base64 puro, sin prefijo
                setImageBase64(manipResult.base64 ?? null);
            }
        } catch (error) {
            console.error("Error en pickImage:", error);
            alert("Ocurrió un error al seleccionar la imagen");
        }
    };

    const resetImagePicker = () => {
        setImage(null);
        setImageBase64(null);
        setNombre_observacion('');
    };

    return {
        image,
        imageBase64, // base64 puro, sin prefijo
        pickImage,
        Nombre_observacion,
        setNombre_observacion,
        setImage, 
        resetImagePicker
    };
};