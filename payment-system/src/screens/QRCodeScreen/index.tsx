import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import CryptoJS from "crypto-js";
import { ScreenQRCodeRouteProp } from "../../navigation/type";
import { RootState } from "../../redux/store";

const secretKey = 'qrcode-hoang-tu';
const iv = 'your-iv-string-16chars';  // IV phải là 16 ký tự
import { useSelector, useDispatch } from "react-redux";

export const QRCodeScreen: React.FC = () => {
    const route = useRoute<ScreenQRCodeRouteProp>();
    const { userId } = route.params;
    const amount = 10000;
    const [encryptedData, setEncryptedData] = useState<string>('');
    const user = useSelector((state:RootState) => state.user); 

    const dataToEncrypt = JSON.stringify({
        receiverId:userId,
        amount
    });

    useEffect(() => {
        // Encrypt the data
        const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
        setEncryptedData(encrypted);
        console.log("Encrypted dataa sample:", encrypted); // Log encrypted data
    }, []);

    useEffect(() => {
        if (encryptedData) {
            // Decrypt the data
            const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to string
            console.log("Decrypted data:", decryptedData); // Should log original data
        }
    }, [encryptedData]); // Run when encryptedData changes

    return (
        <View style={styles.container}>
            <View style={styles.qrContainer}>
                <QRCode
                    value={encryptedData || "No data"} // Fallback text when no data is available
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
