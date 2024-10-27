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
import { loginHuong } from "../../services/apiService";

const ButtonLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const response = await loginHuong({ phoneNumber, password });
            console.log("Registration response:", response.data);
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
    );
};

export default ButtonLogin;

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
