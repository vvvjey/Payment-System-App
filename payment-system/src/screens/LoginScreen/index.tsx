import React, { Component, useEffect } from "react";
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
import TextboxLogin from "../../components/TextboxLogin";
import ButtonLogin from "../../components/ButtonLogin";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab } from "react-native-elements";
import { testApi } from "../../services/apiService";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.headerPart}>
      <View style={styles.logoContainer}>
        <ImageBackground
            resizeMode="contain"
            style={styles.logo}
            source={IMAGES.LogoNexPay}
          />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.titleLogin}>
          <Text style={styles.title}>Đăng nhập</Text>
        </View>
        <View>
          <TextboxLogin />
        </View>
        <Text style={styles.dksd}>
            Khi đăng nhập hoặc đăng ký, bạn đồng ý với{" "}
            <Text style={styles.link}>điều {'\n'} khoản sử dụng</Text> và{" "}
            <Text style={styles.link}>chính sách bảo mật</Text> của chúng tôi.
        </Text>
        <View>
          <ButtonLogin />
        </View>
        <View style={styles.loginTextBottomContainer}>
          <Text style={styles.loginTextBottom}>Chưa có tài khoản? </Text>
          <TouchableOpacity>
            <Text style={styles.buttonRegister}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    );
  };
export default LoginScreen;

const styles = StyleSheet.create({
  headerPart: {
    backgroundColor: Colors.White,
    paddingTop: heightScale(10),
  },
  logoContainer: {
    alignSelf: "center", 
    marginTop: heightScale(50)
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
  dksd: {
    fontWeight: "400",
    fontSize: fontScale(14),
    color: "#929292", 
    marginTop: heightScale(49),
  },
  link: {
    textDecorationLine: "underline",
    color: Colors.Black, 
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
  loginTextBottomContainer: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: heightScale(80), 
  },
  loginTextBottom: {
    color: "#7B7B7B"
  },
  buttonRegister: {
    color: Colors.MainColor,
  },
}
)