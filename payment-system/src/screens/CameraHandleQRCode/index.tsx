import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Camera from 'react-native-camera';
import CryptoJS from 'crypto-js';
import { View } from 'react-native';

const secretKey = 'qrcode-hoang-tu';

const CameraHandleQRCode:React.FC = () => {
    const navigation = useNavigation();

    const handleQRCodeScanned = ({ data }: { data: string }) => {
        const { encryptedData } = JSON.parse(data);

        // Giải mã dữ liệu đã quét
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        // Lấy walletId từ dữ liệu đã giải mã
        const { walletId } = decryptedData;
        console.log("wallet id ", walletId)
        // Điều hướng đến màn hình chuyển tiền và gửi dữ liệu đã quét
        // navigation.navigate('TransferMoney', { receiverWalletId: walletId, amount: 120 }); // Số tiền có thể thay đổi tùy theo logic của bạn
    };

    return (
        <View>
            {/* <Camera
                onBarCodeRead={handleQRCodeScanned}
                style={{ flex: 1 }}
            /> */}
        </View>
    );
};

export default CameraHandleQRCode;
