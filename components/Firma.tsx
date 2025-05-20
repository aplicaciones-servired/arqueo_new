import ArqueoForm from '@/app/(tabs)/ArqueoForm';
import { Canvas, Path, Skia, useCanvasRef } from '@shopify/react-native-skia';
import React, { useCallback, useRef, useState } from 'react';
import { Button, PanResponder, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

type SkiaPath = ReturnType<typeof Skia.Path.Make>;

export function Firma() {
    // Estados separados para cada firma
    const [auditoriaPaths, setAuditoriaPaths] = useState<SkiaPath[]>([]);
    const [colocadorPaths, setColocadorPaths] = useState<SkiaPath[]>([]);
    const [firmaAuditoria, setfirmaAuditoria] = useState<string | null>(null);
    const [firmaColocador, setfirmaColocador] = useState<string | null>(null);

    const canvasRefAuditoria = useCanvasRef();
    const canvasRefColocador = useCanvasRef();

    const auditoriaPath = useRef<SkiaPath>(Skia.Path.Make());
    const colocadorPath = useRef<SkiaPath>(Skia.Path.Make());

    const isDrawingAuditoria = useRef(false);
    const isDrawingColocador = useRef(false);

    // Optimización: Usar useCallback para memoizar la función
    const captureAndConvert = useCallback(async (canvasRef: React.RefObject<any>, paths: SkiaPath[]) => {
        if (!canvasRef.current || paths.length === 0) return null;

        const image = canvasRef.current.makeImageSnapshot();
        if (!image) return null;

        const bytes = image.encodeToBytes();
        const base64 = `data:image/png;base64,${bytes.toString('base64')}`;
        return base64;
    }, []);

    // Optimización: Solo convertir cuando se termina de dibujar
    const handleSaveSignatures = useCallback(async () => {
        const firmaAud = await captureAndConvert(canvasRefAuditoria, auditoriaPaths);
        const firmaCol = await captureAndConvert(canvasRefColocador, colocadorPaths);

        setfirmaAuditoria(firmaAud);
        setfirmaColocador(firmaCol);

        ArqueoForm({
            firmaAuditoria,
            firmaColocador
        });

    }, [auditoriaPaths, colocadorPaths, captureAndConvert]);

    // Manejadores optimizados con useCallback
    const panResponderAuditoria = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
            isDrawingAuditoria.current = true;
            const newPath = Skia.Path.Make();
            newPath.moveTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
            auditoriaPath.current = newPath;
            setAuditoriaPaths([...auditoriaPaths, newPath]);
        },
        onPanResponderMove: (e) => {
            if (!isDrawingAuditoria.current) return;
            auditoriaPath.current.lineTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
            setAuditoriaPaths([...auditoriaPaths.slice(0, -1), auditoriaPath.current.copy()]);
        },
        onPanResponderRelease: () => {
            isDrawingAuditoria.current = false;
            handleSaveSignatures(); // Solo convertir al soltar el dedo
        },
    });

    const panResponderColocador = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
            isDrawingColocador.current = true;
            const newPath = Skia.Path.Make();
            newPath.moveTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
            colocadorPath.current = newPath;
            setColocadorPaths([...colocadorPaths, newPath]);
        },
        onPanResponderMove: (e) => {
            if (!isDrawingColocador.current) return;
            colocadorPath.current.lineTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
            setColocadorPaths([...colocadorPaths.slice(0, -1), colocadorPath.current.copy()]);
        },
        onPanResponderRelease: () => {
            isDrawingColocador.current = false;
            handleSaveSignatures(); // Solo convertir al soltar el dedo
        },
    });

    const clearAll = useCallback(() => {
        setAuditoriaPaths([]);
        setColocadorPaths([]);
        setfirmaAuditoria(null);
        setfirmaColocador(null);
        auditoriaPath.current = Skia.Path.Make();
        colocadorPath.current = Skia.Path.Make();
    }, []);

    return (
        <View style={styles.container}>
            <ThemedText type='subtitle'>Firma Arqueo</ThemedText>

            <ThemedText type='subtitle'>Firma Auditoria</ThemedText>
            <View style={styles.canvas} {...panResponderAuditoria.panHandlers}>
                <Canvas ref={canvasRefAuditoria} style={{ flex: 1 }}>
                    {auditoriaPaths.map((path, index) => (
                        <Path
                            key={`auditoria-${index}`}
                            path={path}
                            color="black"
                            style="stroke"
                            strokeWidth={4}
                            strokeJoin="round"
                            strokeCap="round"
                        />
                    ))}
                </Canvas>
            </View>

            <ThemedText type='subtitle'>Firma Colocador</ThemedText>
            <View style={styles.canvas} {...panResponderColocador.panHandlers}>
                <Canvas ref={canvasRefColocador} style={{ flex: 1 }}>
                    {colocadorPaths.map((path, index) => (
                        <Path
                            key={`colocador-${index}`}
                            path={path}
                            color="black"
                            style="stroke"
                            strokeWidth={4}
                            strokeJoin="round"
                            strokeCap="round"
                        />
                    ))}
                </Canvas>
            </View>

            <Button title="Limpiar ambas firmas" onPress={clearAll} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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