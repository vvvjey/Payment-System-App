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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tab } from "react-native-elements";
import { testApi } from "../../services/apiService";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../navigation/type";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

const DepositWithdraw = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [inputMoneyQuantity, setInputMoney] = useState("");
  // BIDV selected
  const [isBIDVSelected, setBIDVSelection] = useState(false);
  const handleBIDVPress = () => {
    setBIDVSelection(!isBIDVSelected);
  };
  const user = useSelector((state:RootState) => state.user); // assuming user is stored in state.user
  useEffect(()=>{
    console.log('userrrr',user);
  },[]);  
  // Add bank selected
  const [isAddBankSelected, setAddBankSelection] = useState(false);
  const handleAddBankPress = () => {
    setAddBankSelection(!isAddBankSelected);
  };

  // PostPaid selected
  const [isPostPaidSelected, setPostPaidSelection] = useState(false);
  const handlePostPaidPress = () => {
    setPostPaidSelection(!isPostPaidSelected);
  };
  const navigation = useNavigation<ScreenNavigationProp>();
  const [isChecked, setChecked] = useState(false);

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
          <TouchableOpacity
            onPress={handleBIDVPress}
            style={[
              styles.contentInnerResposity,
              { marginBottom: 0 },
              {
                backgroundColor: isBIDVSelected ? Colors.LightBlue : "#FFFFFF",
              },
            ]}
          >
            <Image
              source={IMAGES.BIDV}
              style={styles.bidvIcon}
              resizeMode="contain"
            ></Image>
            <View style={styles.textInnerRespository}>
              <Text style={styles.textBIDV}>BIDV</Text>
              <Text style={styles.texFreeDeposit}>Miễn phí nạp tiền</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAddBankPress}
            style={[
              styles.contentInnerResposity,
              { marginBottom: 0 },
              {
                backgroundColor: isAddBankSelected
                  ? Colors.LightBlue
                  : "#FFFFFF",
              },
            ]}
          >
            <Image
              source={IMAGES.BankRespository}
              style={styles.bankIcon}
              resizeMode="contain"
            ></Image>
            <View style={styles.textInnerRespository}>
              <Text style={styles.textBIDV}>Thêm ngân hàng</Text>
              <Text style={styles.texFreeDeposit}>
                Liên kết ngân hàng hoặc mở tài khoản mới
              </Text>
            </View>
            <View>
              <ImageBackground
                resizeMode="contain"
                style={styles.iconMuiten}
                source={IMAGES.MuiTen}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.textDeposit}>Tiện ích</Text>
        <View style={styles.MoneyRespository}>
          <TouchableOpacity
            onPress={handlePostPaidPress}
            style={[
              styles.contentInnerResposity,
              { marginBottom: 0 },
              {
                backgroundColor: isPostPaidSelected
                  ? Colors.LightBlue
                  : "#FFFFFF",
              },
            ]}
          >
            <Image
              source={IMAGES.ViTienIch}
              style={styles.bankIcon}
              resizeMode="contain"
            ></Image>
            <View style={styles.textInnerRespository}>
              <Text style={styles.textBIDV}>Ví trả sau</Text>
              <Text style={styles.texFreeDeposit}>
                Cho phép thanh toán trước, trả sau
              </Text>
            </View>
            <View>
              <ImageBackground
                resizeMode="contain"
                style={styles.iconMuitenDuoi}
                source={IMAGES.MuiTen}
              />
            </View>
          </TouchableOpacity>
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

        <TouchableOpacity
          onPress={() => navigation.navigate("ConfirmPayment")}
          style={styles.button}
        >
          <Text style={styles.buttonContent}>Nạp tiền</Text>
        </TouchableOpacity>
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
    marginTop: heightScale(-40),
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: heightScale(10),
  },
  contentInnerResposity: {
    paddingVertical: heightScale(12),
    paddingHorizontal: widthScale(15),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: widthScale(10),
    marginBottom: heightScale(10),
  },
  bidvIcon: {
    width: widthScale(36),
    height: heightScale(12),
    marginRight: widthScale(16),
  },
  textInnerRespository: {
    display: "flex",
    flexDirection: "column",
  },
  textBIDV: {
    fontSize: fontScale(18),
    fontWeight: "bold",
  },
  texFreeDeposit: {
    fontSize: fontScale(12),
  },
  bankIcon: {
    width: widthScale(28),
    height: heightScale(28),
    marginRight: widthScale(23),
  },
  iconMuiten: {
    width: widthScale(12.41),
    height: heightScale(22.83),
    marginLeft: 50,
  },
  iconMuitenDuoi: {
    width: widthScale(12.41),
    height: heightScale(22.83),
    marginLeft: 87,
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
  button: {
    backgroundColor: Colors.MainColor,
    borderRadius: widthScale(10),
    width: "90%",
    height: heightScale(55),
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightScale(140),
    marginHorizontal: "auto",
  },
  buttonContent: {
    color: Colors.White,
    fontSize: fontScale(18),
    fontWeight: "500",
  },
});
