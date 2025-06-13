import { Canvas, Path, Skia, useCanvasRef } from '@shopify/react-native-skia';
import { Buffer } from 'buffer'; // Asegúrate de instalar 'buffer' si usas Expo: npm install buffer
import React, { useCallback, useRef, useState } from 'react';
import { Button, PanResponder, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

type SkiaPath = ReturnType<typeof Skia.Path.Make>;

interface FirmaProps {
  setFirmaAuditoria: (firma: string) => void;
  setFirmaColocadora: (firma: string) => void;
}

export default function Firma({ setFirmaAuditoria, setFirmaColocadora }: FirmaProps) {
  // Estados separados para cada firma
  const [auditoriaPaths, setAuditoriaPaths] = useState<SkiaPath[]>([]);
  const [colocadorPaths, setColocadorPaths] = useState<SkiaPath[]>([]);

  const canvasRefAuditoria = useCanvasRef();
  const canvasRefColocador = useCanvasRef();

  const auditoriaPath = useRef<SkiaPath>(Skia.Path.Make());
  const colocadorPath = useRef<SkiaPath>(Skia.Path.Make());

  const isDrawingAuditoria = useRef(false);
  const isDrawingColocador = useRef(false);

  // Convierte el snapshot a base64 igual que en Android
  const captureAndConvert = useCallback(
    async (canvasRef: React.RefObject<any>, paths: SkiaPath[]) => {
      if (!canvasRef.current || paths.length === 0) return null;

      const image = canvasRef.current.makeImageSnapshot();
      if (!image) return null;

      // Comprimir a JPEG calidad 0.3 (igual que la imagen de galería)
      const bytes = image.encodeToBytes(); // PNG por defecto
      const base64 = Buffer.from(bytes).toString('base64');
      return base64;
    },
    []
  );

  // Solo convertir cuando se termina de dibujar
  const handleSaveSignatures = useCallback(
    async (auditoriaPathsArg: SkiaPath[], colocadorPathsArg: SkiaPath[]) => {
      const firmaAud = await captureAndConvert(canvasRefAuditoria, auditoriaPathsArg);
      const firmaCol = await captureAndConvert(canvasRefColocador, colocadorPathsArg);

      setFirmaAuditoria(firmaAud ?? '');
      setFirmaColocadora(firmaCol ?? '');
    },
    [captureAndConvert, setFirmaAuditoria, setFirmaColocadora, canvasRefAuditoria, canvasRefColocador]
  );

  // Manejadores optimizados con useCallback
  const panResponderAuditoria = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      isDrawingAuditoria.current = true;
      const newPath = Skia.Path.Make();
      newPath.moveTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
      auditoriaPath.current = newPath;
      setAuditoriaPaths((prev) => {
        const updated = [...prev, newPath];
        return updated;
      });
    },
    onPanResponderMove: (e) => {
      if (!isDrawingAuditoria.current) return;
      auditoriaPath.current.lineTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
      setAuditoriaPaths((prev) => {
        const updated = [...prev.slice(0, -1), auditoriaPath.current.copy()];
        return updated;
      });
    },
    onPanResponderRelease: async () => {
      isDrawingAuditoria.current = false;
      await handleSaveSignatures(auditoriaPaths, colocadorPaths);
    },
  });

  const panResponderColocador = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      isDrawingColocador.current = true;
      const newPath = Skia.Path.Make();
      newPath.moveTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
      colocadorPath.current = newPath;
      setColocadorPaths((prev) => {
        const updated = [...prev, newPath];
        return updated;
      });
    },
    onPanResponderMove: (e) => {
      if (!isDrawingColocador.current) return;
      colocadorPath.current.lineTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
      setColocadorPaths((prev) => {
        const updated = [...prev.slice(0, -1), colocadorPath.current.copy()];
        return updated;
      });
    },
    onPanResponderRelease: async () => {
      isDrawingColocador.current = false;
      await handleSaveSignatures(auditoriaPaths, colocadorPaths);
    },
  });

  const clearAll = useCallback(() => {
    setAuditoriaPaths([]);
    setColocadorPaths([]);
    setFirmaAuditoria('');
    setFirmaColocadora('');
    auditoriaPath.current = Skia.Path.Make();
    colocadorPath.current = Skia.Path.Make();
  }, [setFirmaAuditoria, setFirmaColocadora]);

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Firma Arqueo</ThemedText>

      <ThemedText type="subtitle">Firma Auditoria</ThemedText>
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

      <ThemedText type="subtitle">Firma Colocador</ThemedText>
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
    gap: 10,
  },
  canvas: {
    height: 200,
    width: 400,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'white',
    marginVertical: 10,
  },
});