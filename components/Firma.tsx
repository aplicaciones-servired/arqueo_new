import { Canvas, Path, Skia, useCanvasRef } from '@shopify/react-native-skia';
import { Buffer } from 'buffer';
import React, { useCallback, useState } from 'react';
import { Button, LayoutRectangle, PanResponder, StyleSheet, View } from 'react-native';
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

  // Referencias para las dimensiones de cada canvas
  const [auditoriaLayout, setAuditoriaLayout] = useState<LayoutRectangle | null>(null);
  const [colocadorLayout, setColocadorLayout] = useState<LayoutRectangle | null>(null);

  const canvasRefAuditoria = useCanvasRef();
  const canvasRefColocador = useCanvasRef();

  // Estados para controlar si estamos dibujando
  const [isDrawingAuditoria, setIsDrawingAuditoria] = useState(false);
  const [isDrawingColocador, setIsDrawingColocador] = useState(false);

  // Función para verificar si el punto está dentro del canvas
  const isPointInsideCanvas = useCallback(
    (x: number, y: number, layout: LayoutRectangle | null) => {
      if (!layout) return false;
      return (
        x >= 0 &&
        x <= layout.width &&
        y >= 0 &&
        y <= layout.height
      );
    },
    []
  );

  // Convierte el snapshot a base64
  const captureAndConvert = useCallback(
    async (canvasRef: React.RefObject<any>, paths: SkiaPath[]) => {
      if (!canvasRef.current || paths.length === 0) return null;

      const image = canvasRef.current.makeImageSnapshot();
      if (!image) return null;

      const bytes = image.encodeToBytes();
      const base64 = Buffer.from(bytes).toString('base64');
      return base64;
    },
    []
  );

  // Guardar firmas
  const handleSaveSignatures = useCallback(
    async (auditoriaPathsArg: SkiaPath[], colocadorPathsArg: SkiaPath[]) => {
      const firmaAud = auditoriaPathsArg.length > 0
        ? await captureAndConvert(canvasRefAuditoria, auditoriaPathsArg)
        : '';

      const firmaCol = colocadorPathsArg.length > 0
        ? await captureAndConvert(canvasRefColocador, colocadorPathsArg)
        : '';

      setFirmaAuditoria(firmaAud ?? '');
      setFirmaColocadora(firmaCol ?? '');
    },
    [captureAndConvert, setFirmaAuditoria, setFirmaColocadora, canvasRefAuditoria, canvasRefColocador]
  );

  // Manejador para cuando se sale del área
  const handleStopDrawing = useCallback(
    (isAuditoria: boolean) => {
      if (isAuditoria) {
        setIsDrawingAuditoria(false);
      } else {
        setIsDrawingColocador(false);
      }
      
      // Guardar después de un breve delay
      setTimeout(() => {
        handleSaveSignatures(auditoriaPaths, colocadorPaths);
      }, 50);
    },
    [auditoriaPaths, colocadorPaths, handleSaveSignatures]
  );

  // PanResponder para Auditoria
  const panResponderAuditoria = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      const x = e.nativeEvent.locationX;
      const y = e.nativeEvent.locationY;
      
      // Verificar que el punto inicial esté dentro del canvas
      if (isPointInsideCanvas(x, y, auditoriaLayout)) {
        setIsDrawingAuditoria(true);
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        setAuditoriaPaths(prev => [...prev, newPath]);
      }
    },
    onPanResponderMove: (e) => {
      if (!isDrawingAuditoria) return;
      
      const x = e.nativeEvent.locationX;
      const y = e.nativeEvent.locationY;
      
      // Si el punto está fuera del canvas, detener el dibujo
      if (!isPointInsideCanvas(x, y, auditoriaLayout)) {
        handleStopDrawing(true);
        return;
      }
      
      // Actualizar el último path
      setAuditoriaPaths(prev => {
        if (prev.length === 0) return prev;
        
        const lastPath = prev[prev.length - 1];
        const updatedPath = lastPath.copy();
        updatedPath.lineTo(x, y);
        
        const newPaths = [...prev];
        newPaths[newPaths.length - 1] = updatedPath;
        return newPaths;
      });
    },
    onPanResponderRelease: () => {
      if (isDrawingAuditoria) {
        handleStopDrawing(true);
      }
    },
    // Este método se llama cuando el dedo sale del área del responder
    onPanResponderTerminate: () => {
      if (isDrawingAuditoria) {
        handleStopDrawing(true);
      }
    },
    // Este método se llama cuando otro responder toma el control
    onPanResponderTerminationRequest: () => true,
  });

  // PanResponder para Colocador
  const panResponderColocador = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      const x = e.nativeEvent.locationX;
      const y = e.nativeEvent.locationY;
      
      if (isPointInsideCanvas(x, y, colocadorLayout)) {
        setIsDrawingColocador(true);
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        setColocadorPaths(prev => [...prev, newPath]);
      }
    },
    onPanResponderMove: (e) => {
      if (!isDrawingColocador) return;
      
      const x = e.nativeEvent.locationX;
      const y = e.nativeEvent.locationY;
      
      if (!isPointInsideCanvas(x, y, colocadorLayout)) {
        handleStopDrawing(false);
        return;
      }
      
      setColocadorPaths(prev => {
        if (prev.length === 0) return prev;
        
        const lastPath = prev[prev.length - 1];
        const updatedPath = lastPath.copy();
        updatedPath.lineTo(x, y);
        
        const newPaths = [...prev];
        newPaths[newPaths.length - 1] = updatedPath;
        return newPaths;
      });
    },
    onPanResponderRelease: () => {
      if (isDrawingColocador) {
        handleStopDrawing(false);
      }
    },
    onPanResponderTerminate: () => {
      if (isDrawingColocador) {
        handleStopDrawing(false);
      }
    },
    onPanResponderTerminationRequest: () => true,
  });

  // Limpiar firmas
  const clearAll = useCallback(() => {
    setAuditoriaPaths([]);
    setColocadorPaths([]);
    setIsDrawingAuditoria(false);
    setIsDrawingColocador(false);
    setFirmaAuditoria('');
    setFirmaColocadora('');
  }, [setFirmaAuditoria, setFirmaColocadora]);

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Firma Arqueo</ThemedText>

      <ThemedText type="subtitle">Firma Auditoria</ThemedText>
      <View 
        style={styles.canvas}
        onLayout={(event) => setAuditoriaLayout(event.nativeEvent.layout)}
        {...panResponderAuditoria.panHandlers}
      >
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
      <View 
        style={styles.canvas}
        onLayout={(event) => setColocadorLayout(event.nativeEvent.layout)}
        {...panResponderColocador.panHandlers}
      >
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
    height: 250,
    width: 400,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'white',
    marginVertical: 10,
    overflow: 'hidden', // Importante para contener el contenido
  },
});