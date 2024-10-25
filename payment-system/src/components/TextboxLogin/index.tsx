import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { widthScale, heightScale, fontScale } from "../../utils/spacing"; // Adjust if you have these utilities
import { Colors } from "../../../assets/colors";

const TextboxLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
    <View style={styles.container}>
        <Text style={styles.text}>Số điện thoại</Text>
        <View style={styles.infoContainer}>
            <View style={styles.firstChild}>
                <View style={styles.countryCodeContainer}>
                    <Text style={styles.countryCode}>+84</Text>
                </View>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="712345678"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </View>
        </View>
        <Text style={styles.text}>Mật khẩu</Text>
        <View style={styles.infoContainer}>
            <View style={styles.firstChild}>
                <View style={styles.countryCodeContainer}>
                    <Text style={styles.countryCode}>+84</Text>
                </View>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="712345678"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </View>
        </View>
    </View>
    );
  };

export default TextboxLogin;

const styles = StyleSheet.create({
    container: {
        width: widthScale(390), 
    },
    text: {
        fontSize: fontScale(18),
        fontWeight: "500",
        marginLeft: widthScale(5),
        marginBottom: heightScale(-7),
        marginTop: heightScale(20)
    },
    infoContainer: {
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Colors.MainColor, 
        borderRadius: 10,
        marginTop: heightScale(22)

    },
    countryCodeContainer: {
      width: widthScale(60),  
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.MainColor, 
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    firstChild: {
        backgroundColor: Colors.MainColor,
        padding: heightScale(10)
    },
    countryCode: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: heightScale(18),
    },
    input: {
      flex: 1,  
      fontSize: heightScale(18),
      color: "#333", 
      paddingLeft: widthScale(10),
    },
  });
