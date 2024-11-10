import React, { Component, useEffect, useState, useRef } from "react";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tab } from "react-native-elements";
import { testApi } from "../../services/apiService";
import { registerHuong } from "../../services/apiService";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../navigation/type";

const PaymentSuccess = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [inputMoneyQuantity, setInputMoney] = useState("");
  const [isSelected, setSelection] = useState(false);
  const handlePress = () => {
    setSelection(!isSelected);
  };
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <SafeAreaView style={styles.headerPart}>
      <View style={styles.bodyContainer}>
        <View style={styles.transactionInfor}>
          <View style={styles.transactionDetails1}>
            <Image
              source={IMAGES.iconSuccess}
              style={styles.iconSuccess}
            ></Image>
            <View style={styles.contentBelowIcon}>
              <Text style={styles.textTransactionSuccess}>
                Giao dịch thành công
              </Text>
              <Text style={styles.textMoneyAmount}>
                20.000.000<Text style={{ color: "black" }}>đ</Text>
              </Text>
              <Text style={styles.textNormal}>
                <Text style={{ color: "black" }}>
                  {" "}
                  Bạn đã nạp thành công 20.000.000
                  <Text style={{ color: "black" }}>đ</Text>
                </Text>{" "}
                vào Ví
                <Text style={{ color: Colors.DarkBlue }}>Nex</Text>
                <Text style={{ color: "#1EA9F4" }}>Pay</Text>
              </Text>
            </View>
          </View>
          <View style={styles.lineHorizontal} />
          <View style={styles.transactionDetails2}>
            <View style={styles.textInnerTransaction}>
              <Text style={styles.textBefore}>Dịch vụ/ Cửa hàng</Text>
              <Text style={styles.textAfter}>Nạp tiền vào ví</Text>
            </View>
            <View style={styles.textInnerTransaction}>
              <Text style={styles.textBefore}>Thời gian thanh toán</Text>
              <Text style={styles.textAfter}>getTime</Text>
            </View>
            <View style={styles.textInnerTransaction}>
              <Text style={styles.textBefore}>Chi tiết giao dịch</Text>
              <Text style={styles.textAfter}>idTransaction</Text>
            </View>
          </View>
        </View>

        {/* Cam kết bảo mật */}
        <View style={styles.camKetContainer}>
          <ImageBackground
            resizeMode="contain"
            style={styles.linhVat2}
            source={IMAGES.LinhVat2}
          />
          <Text style={styles.textCamKet}>
            <Text style={{ color: Colors.DarkBlue }}>Nex</Text>
            <Text style={{ color: "#1EA9F4" }}>Pay</Text>
            <Text>
              cam kết bảo vệ thông tin và tài sản bằng các tiêu chuẩn bảo mật
              cao nhất
            </Text>
          </Text>
          <View style={styles.iconCamKet}>
            <ImageBackground
              resizeMode="contain"
              style={styles.pciDss}
              source={IMAGES.PCIDSS}
            />
            <ImageBackground
              resizeMode="contain"
              style={styles.secure}
              source={IMAGES.SecureGlobalSign}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PaymentSuccess;

const styles = StyleSheet.create({
  headerPart: {
    backgroundColor: Colors.White,
    flex: 1,
  },

  bodyContainer: {
    paddingHorizontal: widthScale(18),
  },
  transactionInfor: {
    backgroundColor: "#DCF1FF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 2.5,
    shadowRadius: 4,
    elevation: 4,
    padding: widthScale(10),
    borderRadius: widthScale(10),
    marginVertical: heightScale(10),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: heightScale(14),
  },
  iconSuccess: {
    width: widthScale(90),
    height: heightScale(87.5),
    position: "absolute",
    zIndex: 1,
    top: heightScale(-50),
  },
  contentBelowIcon: {
    marginTop: heightScale(63),
    alignItems: "center",
    gap: heightScale(17),
  },
  transactionDetails1: {
    alignItems: "center",
  },
  textTransactionSuccess: {
    color: "#030878",
    fontSize: fontScale(18),
    fontWeight: "600",
  },
  textMoneyAmount: {
    fontSize: fontScale(24),
    fontWeight: "600",
  },
  textNormal: {
    fontSize: fontScale(18),
    fontWeight: "400",
    textAlign: "center",
  },
  textInnerTransaction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionDetails2: {
    gap: heightScale(16),
  },
  textBefore: {
    fontSize: fontScale(18),
    fontWeight: "600",
    color: "#A09CAB",
  },
  textAfter: {
    fontSize: fontScale(18),
    color: "#000",
    fontWeight: "600",
  },

  lineHorizontal: {
    width: widthScale(365),
    height: heightScale(1),
    backgroundColor: Colors.MainColor,
    alignSelf: "center",
  },
  // CAM KẾT BẢO MẬT
  camKetContainer: {
    backgroundColor: "#E1E4F0",
    width: "100%",
    height: heightScale(51),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: widthScale(10),
    paddingRight: widthScale(15),
    marginTop: heightScale(20),
  },
  linhVat2: {
    position: "absolute",
    zIndex: 2,
    width: widthScale(76),
    height: heightScale(67),
    left: 0,
    top: heightScale(-20),
  },
  textCamKet: {
    textAlign: "center",
    fontSize: fontScale(10),
    marginLeft: widthScale(70),
    marginTop: heightScale(5),
  },
  iconCamKet: {
    display: "flex",
    flexDirection: "row",
    marginTop: heightScale(-5),
  },
  pciDss: {
    width: widthScale(30),
    height: heightScale(25),
    marginRight: widthScale(3),
  },
  secure: {
    width: widthScale(26),
    height: heightScale(26),
  },
  // Button
});
