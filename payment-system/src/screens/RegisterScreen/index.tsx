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
import TextboxRegister from "../../components/TextboxRegister";
import ButtonRegister from "../../components/ButtonRegister";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab } from "react-native-elements";
import { testApi } from "../../services/apiService";
import { registerHuong } from "../../services/apiService";
// import ve
// useEffect ( call thử bằng cách truyển thử data vào , r xem kết quả nhận , vào database)
const RegisterScreen = () => {
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
          <Text style={styles.title}>Đăng ký</Text>
        </View>
        <View>
          <TextboxRegister />
        </View>
        <View>
          <ButtonRegister />
        </View>
      </View>
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
}
)