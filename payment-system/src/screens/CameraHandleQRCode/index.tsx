import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner, BarCodeScanningResult } from 'expo-barcode-scanner';
import CryptoJS from 'crypto-js';

const secretKey = 'qrcode-hoang-tu';

export default function CameraHandleQRCode() {
  const [permission, requestPermission] = BarCodeScanner.usePermissions();
  const [scanned, setScanned] = useState(false);

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

  const handleBarCodeScanned = ({ data }: BarCodeScanningResult) => {
    setScanned(true);
    try {
      // Decrypt the scanned data
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      console.log('Decrypted data:', decryptedData);

      Alert.alert('QR Code scanned!', `Decrypted data: ${decryptedData}`);
    } catch (error) {
      console.error('Error decrypting QR code data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {permission?.granted ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
      ) : (
        <Text>No access to camera</Text>
      )}
      {scanned && (
        <Text onPress={() => setScanned(false)} style={styles.rescanText}>
          Tap to scan again
        </Text>
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
  rescanText: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    padding: 20,
  },
});
