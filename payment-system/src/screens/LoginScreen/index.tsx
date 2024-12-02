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
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tab } from "react-native-elements";
import { testApi } from "../../services/apiService";
import * as LocalAuthentication from 'expo-local-authentication';
import { loginAction } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { ScreenNavigationProp } from "../../navigation/type";
import { login } from "../../services/apiService";

const LoginScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state:RootState) => state.user); // assuming user is stored in state.user

  const handleLogin = async () => {
    try {
      const data = {
        phoneNumber,password
      }
      console.log('login')
      let checkStatus = await login(data);
      dispatch(loginAction(phoneNumber, password,navigation)); 

    } catch (error:any) {
      setErrorMessage("Sai mật khẩu hoặc số điện thoại không hợp lệ");
      console.error("Login error:", error);
    }
  };
  const handleLoginFaceID = async () => {
    try {
      console.log("3")
      // Check for biometric authentication availability
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      console.log("Has Hardware:", hasHardware);
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      console.log("Is Enrolled:", isEnrolled);

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Xác thực để tiếp tục",
          fallbackLabel: "Sử dụng mật khẩu",
        });

        if (result.success) {
          console.log("Biometric authentication successful");
          // Proceed to next screen or perform any post-login action
        } else {
          console.error("Biometric authentication failed");
        }
      } else {
        console.log("Biometric authentication not available");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const handleLoginFingerprint = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      console.log("Has Hardware:", hasHardware);

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      console.log("Is Enrolled:", isEnrolled);

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Xác thực để tiếp tục",
          fallbackLabel: "Sử dụng mật khẩu",
        });

        if (result.success) {
          console.log("Fingerprint authentication successful");
          // Proceed to next screen or perform any post-login action
        } else {
          console.error("Fingerprint authentication failed");
        }
      } else {
        console.log("Fingerprint authentication not available");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.headerPart}>
      <ScrollView>
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
            <View style={styles.FaceIDContainer}>
              <TouchableOpacity
                style={styles.loginFaceID}
                onPress={handleLoginFaceID}
              >
                <Image source={IMAGES.FaceID} style={styles.iconFaceID}></Image>
                <Text style={styles.textFaceID}>Đăng nhập bằng Face ID</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgetPwd}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.FingerPrintContainer}
              onPress={handleLoginFingerprint}
            >
              <Image
                source={IMAGES.FingerPrint}
                style={styles.iconFingerPrint}
              ></Image>
              <Text style={styles.textFaceID}>Đăng nhập bằng vân tay</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.dksd}>
            Khi đăng nhập hoặc đăng ký, bạn đồng ý với{" "}
            <Text style={styles.link}>điều {"\n"} khoản sử dụng</Text> và{" "}
            <Text style={styles.link}>chính sách bảo mật</Text> của chúng tôi.
          </Text>
          <View style={styles.errorMessageContainer}>
            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <View style={styles.loginTextBottomContainer}>
            <Text style={styles.loginTextBottom}>Chưa có tài khoản? </Text>
            <TouchableOpacity
              onPress={() => {
                // console.log("Button pressed");
                navigation.navigate("RegisterScreen"); 
                // navigation.navigate("LoginScreen", { screen: "RegisterScreen" })

              }}
            >
              <Text style={styles.buttonRegister}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  headerPart: {
    backgroundColor: Colors.White,
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
    marginLeft: widthScale(25),
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
    marginTop: heightScale(19),
  },
  buttonText: {
    color: Colors.White,
    fontSize: fontScale(17),
    fontWeight: "500",
  },
  loginTextBottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: heightScale(50),
  },
  loginTextBottom: {
    color: "#7B7B7B",
  },
  buttonRegister: {
    color: Colors.MainColor,
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
    width: widthScale(250),
  },
  pwdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.MainColor,
    borderRadius: widthScale(10),
    marginTop: heightScale(22),
    paddingVertical: heightScale(14),
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
  forgetPwd: {
    fontSize: fontScale(15),
    color: Colors.MainColor,
    alignSelf: "flex-end",
    marginRight: widthScale(15),
  },
  FaceIDContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: heightScale(7),
  },
  loginFaceID: {
    flexDirection: "row",
    alignItems: "center",
  },
  textFaceID: {
    fontSize: fontScale(14),
    fontWeight: "600",
  },
  FingerPrintContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: heightScale(12),
  },
  iconFaceID: {
    width: widthScale(20),
    height: heightScale(19),
    marginRight: widthScale(8),
    marginLeft: widthScale(5),
  },
  iconFingerPrint: {
    width: widthScale(17.25),
    height: heightScale(19.17),
    marginRight: widthScale(9),
    marginLeft: widthScale(5),
  },
  errorMessageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: fontScale(14),
  },
});
