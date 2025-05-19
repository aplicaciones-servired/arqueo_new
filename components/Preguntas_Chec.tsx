import { useState } from 'react';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from './ThemedText';

export const usePreguntasChec = () => {
    const [Pregunta1, setPregunta1] = useState('NO CUMPLE');

    const PreguntasChecComponent = () => {
        const colorScheme = useColorScheme();

        return (
            <>
                <ThemedText type='subtitle'>Verificacion del punto de venta</ThemedText>
                <ThemedText type='subtitle'> Tiene la puerta asegurada ?</ThemedText>
                <View
                    style={[
                        styles.cont,
                        {
                            borderColor: colorScheme === 'light' ? 'black' : 'white',
                        },
                    ]}
                >
                    <Pressable
                        onPress={() => setPregunta1(Pregunta1 === 'CUMPLE' ? 'NO CUMPLE' : 'CUMPLE')}
                        style={[
                            styles.checkbox,
                            {
                                width: 150,
                                height: 60,
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: colorScheme === 'light' ? 'black' : 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Pregunta1 === 'CUMPLE' ? '#b0f0a3' : '#f7a3a3',
                            },
                        ]}
                    >
                        <ThemedText style={{ fontSize: 24 }}>
                            {Pregunta1 === 'CUMPLE' ? '✅' : '❌'}
                        </ThemedText>
                    </Pressable>
                    <ThemedText type='subtitle'>{Pregunta1}</ThemedText>
                </View>
            </>
        );
    };

    return { Pregunta1, PreguntasChecComponent };
};

const styles = StyleSheet.create({
    checkbox: {
        margin: 10,
    },
    cont: {
        width: '92%',
        minHeight: 80,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
    }
});