import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SvgQRCode from 'react-native-qrcode-svg';
import { getDataCreateOrderZalopay } from '../../services/apiService';
import { useNavigation } from '@react-navigation/native';
import {ScreenQRCodeZaloQRRouteProp,ScreenNavigationProp} from '../../navigation/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import { useRoute } from '@react-navigation/native';
import { BACKEND_URL } from '@env';

const WebviewZaloPayScreen = () => {
    const [urlZalopayQR, setUrlZalopayQR] = useState('');
    const [orderValue, setOrderValue] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes in seconds
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const navigation = useNavigation<ScreenNavigationProp>();
    const route = useRoute<ScreenQRCodeZaloQRRouteProp>();

    const amount = route.params.amount || 100000;
    async function saveQRCodeData(url: string, orderValue: string, startTime: number) {
        try {
            await AsyncStorage.setItem('qrUrl', url);
            await AsyncStorage.setItem('orderValue', orderValue);
            await AsyncStorage.setItem('startTime', startTime.toString());
        } catch (error) {
            console.error("Error saving QR code data", error);
        }
    }

    async function loadQRCodeData() {
        try {
            const qrUrl = await AsyncStorage.getItem('qrUrl');
            const orderValue = await AsyncStorage.getItem('orderValue');
            const storedStartTime = await AsyncStorage.getItem('startTime');

            if (qrUrl && orderValue && storedStartTime) {
                const elapsed = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
                const remainingTime = Math.max(120 - elapsed, 0); // 2 minutes
                setUrlZalopayQR(qrUrl);
                setOrderValue(orderValue);
                setTimeLeft(remainingTime);

                if (remainingTime > 0) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Error loading QR code data", error);
            return false;
        }
    }

    async function refreshQRCode() {
        try {
            const data = await getDataCreateOrderZalopay(amount);
            const originalUrl = data.data.data.order_url;
            const urlParams = new URLSearchParams(originalUrl.split('?')[1]);
            const extractedOrderValue = urlParams.get('order') || '';
            const modifiedUrl = `https://qcgateway.zalopay.vn/pay/v2/qr?order=${extractedOrderValue}`;

            setOrderValue(extractedOrderValue);
            setUrlZalopayQR(modifiedUrl);
            setTimeLeft(120); // Reset to 2 minutes

            await saveQRCodeData(modifiedUrl, extractedOrderValue, Date.now());
        } catch (error) {
            console.error("Error refreshing QR code:", error);
        }
    }

    useEffect(() => {
        async function initApi() {
            const isCached = await loadQRCodeData();
            if (!isCached) {
                await refreshQRCode();
            }
        }

        initApi();
    }, []);

    useEffect(() => {
        // Socket code to listen for transaction status updates
        // const socket = io("http://10.0.2.2:3002", {
        const socket = io(BACKEND_URL, {

            transports: ['websocket'],
            forceNew: true,
        });
        socket.on("connect", () => {
            console.log("Connected to server with ID:", socket.id);
            socket.emit("message", "Hello from React Native client");
        });

        socket.on("transactionStatus", (data) => {
            console.log("Received transaction status data:", data);
            if (data.status === "success") { // Check if transaction was successful
                setTransactionSuccess(true); // Set transaction success state
                setTimeLeft(0); // Reset the timer to 0 (since the transaction is complete)

                // Clear AsyncStorage after successful transaction
                AsyncStorage.removeItem('qrUrl');
                AsyncStorage.removeItem('orderValue');
                AsyncStorage.removeItem('startTime');
                let dataOrderStatus = {
                    userId:1,
                    walletId:1,
                    amount: amount
                }
                socket.emit("zalopay-order-status",dataOrderStatus);

                console.log("Sent ZaloPay order status:", dataOrderStatus);

            }
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        socket.on("connect_error", (err) => {
            console.log("Socket connection error:", err);
        });

        return () => {
            socket.disconnect();
        };
    }, []); // Only run once when the component is mounted

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    refreshQRCode();
                    return 120; // Restart with 2 minutes
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);
    const goBack = () =>{
        AsyncStorage.removeItem('qrUrl');
        AsyncStorage.removeItem('orderValue');
        AsyncStorage.removeItem('startTime');
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Thanh toán qua Zalopay</Text>
            </View>
            <View style={styles.contentContainer}>
                {transactionSuccess ? (
                    <Text style={styles.successText}>Giao dịch thành công!</Text>
                ) : (
                    urlZalopayQR ? (
                        <View style={styles.qrContainer}>
                            <SvgQRCode
                                value={urlZalopayQR}
                                size={180}
                            />
                            <Text style={styles.infoText}>Quét mã để thanh toán</Text>
                            <Text style={styles.timerText}>Thời gian còn lại: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</Text>
                        </View>
                    ) : (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#FFFFFF" />
                            <Text style={styles.loadingText}>Đang tải mã QR...</Text>
                        </View>
                    )
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0091FF',
        paddingHorizontal: 20,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 45,
        paddingHorizontal: 10,
        backgroundColor: '#0091FF',
        zIndex: 1,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginRight: 24,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    qrContainer: {
        width: '85%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
    },
    infoText: {
        marginTop: 15,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    timerText: {
        marginTop: 10,
        fontSize: 16,
        color: '#FF0000',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: 'white',
    },
    successText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default WebviewZaloPayScreen;

