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
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tab } from "react-native-elements";
import { testApi } from "../../services/apiService";
import { registerHuong } from "../../services/apiService";

const DepositWithdraw = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [inputMoneyQuantity, setInputMoney] = useState("");
  return (
    <SafeAreaView style={styles.headerPart}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={[
            styles.buttonDeposit,
            {
              backgroundColor:
                activeTab === "deposit" ? Colors.MainColor : "transparent",
            },
          ]}
          onPress={() => setActiveTab("deposit")}
        >
          <Text
            style={[
              styles.buttonText,
              { color: activeTab === "deposit" ? "white" : "black" },
            ]}
          >
            Nạp tiền
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={[
            styles.buttonDeposit,
            {
              backgroundColor:
                activeTab === "withdraw" ? Colors.MainColor : "transparent",
            },
          ]}
          onPress={() => setActiveTab("withdraw")}
        >
          <Text
            style={[
              styles.buttonText,
              { color: activeTab === "deposit" ? "black" : "white" },
            ]}
          >
            Rút tiền
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.textDeposit}>Nạp tiền vào</Text>
        <View style={styles.inputMoneyContainer}>
          <TextInput
            style={styles.inputMoneyQuantity}
            placeholder="Số tiền cần nạp"
            keyboardType="phone-pad"
            value={inputMoneyQuantity}
            onChangeText={setInputMoney}
          />
        </View>
        <Text style={styles.textDeposit}>Từ nguồn tiền</Text>
        <View style={styles.MoneyRespository}>
          <View style={styles.contentInnerResposity}> 
            <Image source={IMAGES.BIDV} style={styles.bidvIcon}></Image>
            <View style={styles.textInnerRespository}>
                <Text style={styles.textBIDV}>BIDV</Text>
                <Text style={styles.texFreeDeposit}>Miễn phí nạp tiền</Text>
            </View>
          </View>

          <View style={[styles.contentInnerResposity, { marginBottom: 0 }]}> 
            <Image source={IMAGES.BankRespository} style={styles.bankIcon}></Image>
            <View style={styles.textInnerRespository}>
                <Text style={styles.textBIDV}>Thêm ngân hàng</Text>
                <Text style={styles.texFreeDeposit}>Liên kết ngân hàng hoặc mở tài khoản mới</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DepositWithdraw;

const styles = StyleSheet.create({
  headerPart: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: heightScale(-49),
    paddingHorizontal: widthScale(18),
    paddingVertical: widthScale(6),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: "white",
  },
  buttonDeposit: {
    backgroundColor: Colors.MainColor,
    paddingVertical: widthScale(6),
    paddingHorizontal: widthScale(51.5),
    borderRadius: widthScale(10),
  },
  buttonText: {
    fontWeight: "700",
    fontSize: fontScale(18),
  },
  line: {
    width: widthScale(1),
    height: heightScale(25),
    backgroundColor: "gray",
    alignSelf: "center",
  },
  bodyContainer: {
    paddingHorizontal: widthScale(18),
    paddingVertical: heightScale(10),
  },
  textDeposit: {
    fontSize: fontScale(20),
    color: "black",
    fontWeight: "600",
  },
  inputMoneyContainer: {
    backgroundColor: "#DCF1FF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 2.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    borderRadius: widthScale(10),
    marginVertical: heightScale(10),
  },
  inputMoneyQuantity: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#1EA9F4",
    paddingHorizontal: widthScale(11),
    paddingVertical: heightScale(8),
    borderRadius: 10,
  },
  MoneyRespository: {
    backgroundColor: "#DCF1FF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 2.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    borderRadius: widthScale(10),
    marginVertical: heightScale(10),
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-around'
  },
  contentInnerResposity: {
    paddingVertical: heightScale(12),
    paddingHorizontal: widthScale(15),
    backgroundColor: Colors.LightBlue,
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    borderRadius: widthScale(10),
    marginBottom: heightScale(10)
  },
  bidvIcon: {
    width: widthScale(36),
    height: heightScale(12),
    marginRight: widthScale(16)
  },
  textInnerRespository: {
    display: 'flex',
    flexDirection: "column"
  },
  textBIDV: {
    fontSize: fontScale(18),
    fontWeight: 'bold',
  },
  texFreeDeposit: {
    fontSize: fontScale(12)
  },
  bankIcon:{
    width: widthScale(28),
    height: heightScale(28),
    marginRight: widthScale(23)
  }
});
