import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CameraHandleQRCode() {
  const [facing, setFacing] = useState<"back" | "front">('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        const { status } = await requestPermission();
        if (status === 'granted') {
          console.log('Camera access granted');
        } else {
          console.log('Camera access denied');
        }
      }
    })();
  }, [permission, requestPermission]);

  return (
    <View style={styles.container}>
      {permission?.granted ? (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
        />
      ) : (
        <Text>No access to camera</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
