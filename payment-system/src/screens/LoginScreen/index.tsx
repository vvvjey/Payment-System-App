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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab } from "react-native-elements";
import { testApi } from "../../services/apiService";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.headerPart}>
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
          <Text style={styles.title}>Đăng nhập</Text>
        </View>
        <View style={styles.textboxLogin}>
          <TextboxLogin />
        </View>
        <Text style={styles.dksd}>
            Khi đăng nhập hoặc đăng ký, bạn đồng ý với{" "} {'\n'}
            <Text style={styles.link}>điều khoản sử dụng</Text> và{" "}
            <Text style={styles.link}>chính sách bảo mật</Text> của {'\n'}chúng tôi.
        </Text>
        <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
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
  headerContainer: {
    marginLeft: widthScale(37),
    marginTop: heightScale(10), 
  },
  iconBack: {
    width: widthScale(14),
    height: heightScale(11),
  },
  logoContainer: {
    alignSelf: "center", 
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
  textboxLogin: {
    // alignSelf: "center",
  },
  dksd: {
    fontSize: fontScale(16),
    color: "#929292", 
    marginLeft: widthScale(26)
  },
  link: {
    textDecorationLine: "underline",
    color: Colors.Black, 
  },
  button: {
    backgroundColor: Colors.MainColor,
    borderRadius: widthScale(10),
  },
  buttonText: {

  },
}
)