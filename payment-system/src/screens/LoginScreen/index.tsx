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
      <View style={styles.title}>
        <Text>Đăng nhập</Text>
      </View>
      <View style={styles.textboxLogin}>
        <TextboxLogin />
      </View>
    </SafeAreaView>
    );
  };
export default LoginScreen;

const styles = StyleSheet.create({
  headerPart: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: heightScale(10),
  },
  headerContainer: {
    
  },
  iconBack: {
    width: widthScale(14),
    height: heightScale(11),
    marginLeft: widthScale(37),
    marginTop: heightScale(10), 
  },
  logoContainer: {
    flex: 1,               
    alignSelf: "center", 
  },
  logo: {
    width: widthScale(130),
    height: heightScale(132),
  },
  title: {

  },
  textboxLogin: {
    alignSelf: "center",
  },
}
)