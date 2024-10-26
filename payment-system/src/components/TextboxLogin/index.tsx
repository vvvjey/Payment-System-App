import React, { useState } from "react";
import {
    Button,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView,
  } from "react-native";
import IMAGES from "../../../assets/images";
import { widthScale, heightScale, fontScale } from "../../utils/spacing"; // Adjust if you have these utilities
import { Colors } from "../../../assets/colors";

const TextboxLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Số điện thoại</Text>
        <View style={styles.phoneContainer}>
            <View style={styles.firstChild}>
                <View style={styles.countryCodeContainer}>
                    <Text style={styles.countryCode}>+84</Text>
                </View>
            </View>
            <View>
                <TextInput
                    style={styles.inputPhone}
                    placeholder="712345678"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </View>
        </View>
        <Text style={styles.text}>Mật khẩu</Text>
        <View style={styles.pwdContainer}>
            <View>
                <TextInput
                    style={styles.inputPwd}
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={true}
                    value={password} 
                    onChangeText={setPassword} 
                />
            </View>
            <TouchableOpacity>
                <Image source={IMAGES.Eye} style={styles.eye}></Image>              
            </TouchableOpacity>
        </View>
        <TouchableOpacity>
            <Text style={styles.forsetPwd}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        
      </View>
    );
  };

export default TextboxLogin;

const styles = StyleSheet.create({
    container: {
        // width: widthScale(390), 
    },
    text: {
        fontSize: fontScale(18),
        fontWeight: "500",
        marginLeft: widthScale(5),
        marginBottom: heightScale(-7),
        marginTop: heightScale(20),

    },
    phoneContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Colors.MainColor, 
        borderRadius: 10,
        marginTop: heightScale(22),
        alignItems: "center",
    },
    countryCodeContainer: {
        width: widthScale(60),  
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.MainColor, 
    },
    firstChild: {
        backgroundColor: Colors.MainColor,
        paddingHorizontal: heightScale(20),
        paddingVertical: heightScale(14),
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
    },
    countryCode: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: heightScale(18),
    },
    inputPhone: {
        fontSize: heightScale(15),
        color: "#7B7B7B", 
        paddingLeft: widthScale(21),
        width: widthScale(250)
    },
    pwdContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: Colors.MainColor, 
        borderRadius: widthScale(10),
        marginTop: heightScale(22),
        paddingVertical: heightScale(14)
    },
    inputPwd: {
        color: "#333",
        paddingLeft: widthScale(20),
        fontSize: heightScale(15),
    },
    eye: {
        width: widthScale(24),
        height: heightScale(24),
        marginRight: widthScale(20),
    },
    forsetPwd: {
        fontSize: fontScale(15),
        color: Colors.MainColor,
        alignSelf: 'flex-end',
        marginRight: widthScale(15),
        marginTop: widthScale(10)
    },
  });
