import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SvgQRCode from 'react-native-qrcode-svg';
import { getDataCreateOrderZalopay, testApi } from '../../services/apiService';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebviewZaloPayScreen = () => {
    const [urlZalopayQR, setUrlZalopayQR] = useState('');
    const [orderValue, setOrderValue] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes in seconds
    const navigation = useNavigation();

    // Save QR code data along with the start time
    async function saveQRCodeData(url: string, orderValue: string, startTime: number) {
        try {
            await AsyncStorage.setItem('qrUrl', url);
            await AsyncStorage.setItem('orderValue', orderValue);
            await AsyncStorage.setItem('startTime', startTime.toString());
        } catch (error) {
            console.error("Error saving QR code data", error);
        }
    }

    // Load QR code data and calculate remaining time
    async function loadQRCodeData() {
        try {
            const qrUrl = await AsyncStorage.getItem('qrUrl');
            const orderValue = await AsyncStorage.getItem('orderValue');
            const storedStartTime = await AsyncStorage.getItem('startTime');

            if (qrUrl && orderValue && storedStartTime) {
                const elapsed = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
                const remainingTime = Math.max(600 - elapsed, 0); // 600 seconds = 10 minutes
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

    // Refresh QR code when the timer reaches zero
    async function refreshQRCode() {
        try {
            const data = await getDataCreateOrderZalopay(500000);
            const originalUrl = data.data.data.order_url;
            const urlParams = new URLSearchParams(originalUrl.split('?')[1]);
            const extractedOrderValue = urlParams.get('order') || '';
            const modifiedUrl = `https://qcgateway.zalopay.vn/pay/v2/qr?order=${extractedOrderValue}`;
    
            setOrderValue(extractedOrderValue);
            setUrlZalopayQR(modifiedUrl);
            setTimeLeft(600); // Reset timer to 10 minutes
    
            // Save new QR data and current time
            await saveQRCodeData(modifiedUrl, extractedOrderValue, Date.now());
        } catch (error) {
            console.error("Error refreshing QR code:", error);
        }
    }

    useEffect(() => {
        async function initApi() {
            // Load cached QR data if available
            const isCached = await loadQRCodeData();
            if (!isCached) {
                await refreshQRCode();
            }
        }

        initApi();
    }, []);

    useEffect(() => {
        // Start countdown timer
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    refreshQRCode(); // Refresh QR code when timer expires
                    return 600; // Reset countdown for the new QR code
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // Clean up on component unmount
    }, [timeLeft]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Thanh toán qua Zalopay</Text>
            </View>
            <View style={styles.contentContainer}>
                {urlZalopayQR ? (
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
        marginRight: 24, // Adjust space to center the text with the icon
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60, // Adds padding below header to avoid overlap
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
        color: '#FF0000', // Optional: use red color for countdown
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
});

export default WebviewZaloPayScreen;
