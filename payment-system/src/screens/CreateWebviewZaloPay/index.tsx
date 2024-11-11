import React,{useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IMAGES from "../../../assets/images";
import { heightScale } from "../../utils/spacing";
import { Colors } from "../../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import {ScreenNavigationProp} from '../../navigation/type'

const CreateWebviewZaloPay: React.FC = () => {
    const [amount, setAmount] = useState<string>(''); // Store the amount

    const navigation = useNavigation<ScreenNavigationProp>();
    const abc = ()=>{
        console.log("hi");
    }
    const handleCreateQRCode = () => {
        console.log("ok",amount)
        if (amount) {
            // Navigate to WebviewZaloPayScreen and pass the 'amount' parameter
            navigation.navigate("WebviewZaloPayScreen", { amount });
        } else {
            alert("Vui lòng nhập số tiền.");
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source={IMAGES.zaloQrCodeImage}
                style={styles.backgroundImage}
            />
            <TextInput
                style={styles.inputMoney}
                placeholder="Nhập số tiền"
                keyboardType="numeric"
                value={amount} 
                onChangeText={setAmount} 
            />
            <TouchableOpacity style={styles.button} 
                onPress={handleCreateQRCode}
            >
                <Text style={styles.buttonText}>Tạo mã QR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    backgroundImage: {
        width: "90%",
        height: heightScale(500),
        alignSelf: "center",
        borderRadius: 20,  
        marginBottom: heightScale(20)  
    },
    button: {
        backgroundColor: Colors.MainColor,
        width: "90%",
        height: heightScale(55),
        marginTop: heightScale(30),  
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        alignSelf: "center",
        shadowColor: Colors.MainColor,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3 
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        textTransform: "uppercase"  
    },
    inputMoney: {
        marginTop: heightScale(20),
        height: heightScale(55),
        width: "90%",
        alignSelf: "center",
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "white",
        fontSize: 16,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,  
    }
});

export default CreateWebviewZaloPay;
