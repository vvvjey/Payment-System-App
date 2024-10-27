import React, { useState } from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import IMAGES from "../../../assets/images";
import { widthScale, heightScale, fontScale } from "../../utils/spacing";
import { Colors } from "../../../assets/colors";
import { registerHuong,testApi } from "../../services/apiService";

const ButtonRegister = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            console.log("testapi")
            const requestData = {
                email: "hihia@gmail.com",  // Kiểm tra giá trị này
                password: "123"          // Kiểm tra giá trị này
            };
            console.log("Request data:", requestData); // In ra dữ liệu
            const response = await registerHuong(requestData);
                // const response = await testApi();
            
            console.log("Registration response:", response.data);
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
    );
};

export default ButtonRegister;

const styles = StyleSheet.create({
    // Your existing styles here...
    button: {
        backgroundColor: Colors.MainColor,
        borderRadius: widthScale(10),
        height: heightScale(55),
        justifyContent: "center",
        alignItems: "center",
        marginTop: heightScale(19)
      },
      buttonText: {
        color: Colors.White,
        fontSize: fontScale(17),
        fontWeight: "500"
      },
});
