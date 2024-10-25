import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { ScreenQRCodeRouteProp } from "../../navigation/type";
import CryptoJS from 'crypto-js';
import { useRoute } from '@react-navigation/native';
const secretKey = 'qrcode-hoang-tu';
 const QRCodeScreen: React.FC = () => {
    const route = useRoute<ScreenQRCodeRouteProp>();
    const { walletId } = route.params; 
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify({ walletId }), secretKey).toString();

    const qrData = JSON.stringify({
        encryptedData,
    });

    return (
        <View style={styles.container}>
            <View style={styles.qrContainer}>
                <QRCode
                    value={qrData}
                    size={250}
                />
            </View>
            <Text style={styles.name}>Hoang tu</Text>
            <Text style={styles.amount}>Số tiền: 120 VND</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    qrContainer: {
        backgroundColor: '#fff', 
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        alignItems: 'center', 
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    amount: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
});
export default QRCodeScreen;
