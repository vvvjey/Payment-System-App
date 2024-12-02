import React, { Component, useEffect, useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../assets/colors";
import { fontScale, heightScale, widthScale } from "../../utils/spacing";
import IMAGES from "../../../assets/images";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab } from "react-native-elements";
import { testApi } from "../../services/apiService";
import { register } from "../../services/apiService";
// import ve
// useEffect ( call thử bằng cách truyển thử data vào , r xem kết quả nhận , vào database)
const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const handleRegister = async () => {
      try {
          console.log("testapi")
          const requestData = {
            name, phoneNumber, password          
          };
          console.log("Request data:", requestData); 
          const response = await register(name, phoneNumber, password);
          console.log("Registration response:", response.data);
      } catch (error) {
          console.error("Registration error:", error);
      }
  };
  return (
    <SafeAreaView style={styles.headerPart}>
      <ScrollView>

      <View style={styles.headerContainer}>
          <ImageBackground resizeMode="contain" style={styles.iconBack} source={IMAGES.ArrowBack} />
        </View>
      <View style={styles.logoContainer}>
        <ImageBackground
            resizeMode="contain"
            style={styles.logo}
            source={IMAGES.LogoNexPay}
          />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.titleLogin}>
          <Text style={styles.title}>Đăng ký</Text>
        </View>
        {/* <View>
          <TextboxRegister />
        </View> */}
      <View>
        <Text style={styles.text}>Họ và tên</Text>
        <View style={styles.pwdContainer}>
            <View>
                <TextInput
                    style={styles.inputPwd}
                    placeholder="Nhập họ và tên"
                    value={name}
                    onChangeText={setName}
                />
            </View>
        </View>
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
        <Text style={styles.text}>Xác nhận mật khẩu</Text>
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
        
      </View>


        
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
    );
  };
export default RegisterScreen;

const styles = StyleSheet.create({
  headerPart: {
    backgroundColor: Colors.White,
    paddingTop: heightScale(10),
  },
  headerContainer: {
    marginLeft: widthScale(37),
    marginTop: heightScale(10), 
  },
  iconBack: {
    width: widthScale(19.2),
    height: heightScale(16),
  },
  logoContainer: {
    alignSelf: "center", 
    marginTop: heightScale(10)
  },
  logo: {
    width: widthScale(130),
    height: heightScale(132),
  },
  bodyContainer: {
    width: widthScale(390),
    alignSelf: "center",
  },
  titleLogin: {
    marginTop: heightScale(54),
    marginLeft: widthScale(25)
  },
  title: {
    fontSize: fontScale(25),
    fontWeight: "bold",
  },
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
}
)