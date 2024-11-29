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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../assets/colors";
import { fontScale, heightScale, widthScale } from "../../utils/spacing";
import IMAGES from "../../../assets/images";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tab } from "react-native-elements";
import { getWalletInforByUserId, testApi } from "../../services/apiService";
import { NavigationContainer, useFocusEffect, useNavigation,useRoute } from "@react-navigation/native";
import { ScreenNavigationProp,ScreenConfirmPaymentRouteProp } from "../../navigation/type";
import {getUserInforById} from '../../services/apiService';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { tranferMoney } from "../../services/apiService";
import * as LocalAuthentication from 'expo-local-authentication';

import { err } from "react-native-svg";
import { v4 as uuidv4 } from 'uuid';

const ConfirmPaymentInsideWallet = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [inputMoneyQuantity, setInputMoney] = useState<string>("");
  const [isSelected, setSelection] = useState(false);
  const [nameUser,setNameUser] = useState<string>('');
  const [phoneNumber,setPhoneNumber] = useState<string>("");
  const [contentSend,setContentSend] = useState<string>('');
  const [receiverWalletId,setReceiverWalletId] = useState<number>();
  const [utrCode,setUtrCode] = useState<string>('');
  const [balance,setBalance] = useState<number>(0);
  const user = useSelector((state:RootState) => state.user); // assuming user is stored in state.user


  useFocusEffect(
    React.useCallback(()=>{
      async function getWalletInfor(){
        let wallets = await getWalletInforByUserId(user.user?.user?.id);
        // console.log(wallets.data.data);
        if(wallets?.data?.data){
          setBalance(wallets?.data?.data.balance)
        }
      }
      getWalletInfor();
    },[])
  );
  const handlePress = () => {
    setSelection(!isSelected);
  };
  useEffect(()=>{
    var {amount,receiverId} = route.params;
    setInputMoney(amount);
    console.log("e",amount,"===",receiverId);
  },[]);
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenConfirmPaymentRouteProp>();
  useEffect(()=>{
    async function getUserInfor (){
      let responseUserId = await getUserInforById(route.params.receiverId);
      console.log("userInfor",responseUserId.data);
      setNameUser(responseUserId.data.firstName);
      setPhoneNumber(responseUserId.data.phoneNumber);
      setContentSend(route.params.contentSend);
      setReceiverWalletId(responseUserId.data.wallets.wallet_id);
      let utr = await generateUTR();
      console.log('utr code',utr)
      setUtrCode(utr);
    } 
    getUserInfor();
  },[]);
  const handleTranferMoney = async() =>{
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
          console.log("Biometric authentication successful");

          // HANDLE NEXT
     
          let senderWalletId = user.user?.user?.wallets.wallet_id;
          let amount = parseInt(inputMoneyQuantity);
          let responseTranfer = await tranferMoney(senderWalletId,receiverWalletId,amount,utrCode,contentSend);
          console.log('res',responseTranfer.data);
          if(responseTranfer.data?.data?.errCode == 0){
            console.log("thanfh cong");
            //Handle nhay qua man hinh kia
            navigation.navigate("PaymentSuccess",{amount:amount.toString(),contentSend,nameUser,utrCode})
          } else {
            let popupMess = responseTranfer.data?.errMessage;
            console.log('popupMess',popupMess);
            // Display cai loi o day 
            Alert.alert("QR Code Tranfer Error!", popupMess);
        
          }
        } else {
          console.error("Biometric authentication failed");
        }
      } else {
        console.log("Biometric authentication not available");
      }

      
    } catch (error) {
      console.log("err",error);
    }
  }
  const generateUTR = async () =>{
    const prefix = 'NEXPAY';
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const uuid = uuidv4().split('-')[0]; 
    return `${prefix}-${timestamp}-${uuid}`;
  }
  
  return (
    <SafeAreaView style={styles.headerPart}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTextRow}>
          <Text style={styles.headerText}>Tài khoản/Thẻ</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.MoneyRespository}>
          <TouchableOpacity
            style={[
              styles.buttonDeposit,
              {
                borderColor:
                  activeTab === "deposit" ? Colors.MainColor : "#dadada",
              },
            ]}
            onPress={() => setActiveTab("deposit")}
          >
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={IMAGES.iconLogo}
            ></Image>
            <View>
              <Text style={styles.textOn}>Ví NexPay</Text>
              <Text style={styles.textBelow}>{balance}<Text>đ</Text></Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonDeposit,
              {
                borderColor:
                  activeTab === "withdraw" ? Colors.MainColor : "#dadada",
              },
            ]}
            onPress={() => setActiveTab("withdraw")}
          >
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={IMAGES.iconBIDV}
            ></Image>
            <View>
              <Text style={styles.textOn}>BIDV</Text>
              <Text style={styles.textBelow}>GD từ 10k</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.title}>CHI TIẾT GIAO DỊCH</Text>
        </View>
        <View style={styles.Details}>
          <View style={styles.textInnerRespository}>
            <Text style={styles.textBefore}>Người nhận</Text>
            <Text style={styles.textAfter}>
              <Text style={{ color: "black" }}>{nameUser}</Text>
            </Text>
          </View>
          <View style={styles.textInnerRespository}>
            <Text style={styles.textBefore}>Số tiền</Text>
            <Text style={styles.textAfter}>
              {inputMoneyQuantity}<Text style={{ color: "black" }}>đ</Text>
            </Text>
          </View>
          <View style={styles.textInnerRespository}>
            <Text style={styles.textBefore}>Số điện thoại</Text>
            <Text style={styles.textAfter}>{phoneNumber}</Text>
          </View>
          <View style={styles.lineHorizontal} />
          <View style={styles.textInnerRespository}>
            <Text style={styles.textBefore}>Phí giao dịch</Text>
            <Text style={styles.textAfter}>Miễn phí</Text>
          </View>
          <View style={styles.textInnerRespository}>
            <Text style={styles.textBefore}>Mã tham chiếu</Text>
            <Text style={styles.textAfter} >{utrCode}</Text>
          </View>
          <View style={styles.textInnerRespository}>
            <Text style={styles.textBefore}>Nội dung</Text>
            <Text style={styles.textAfter} >{contentSend}</Text>
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
        <View style={styles.totalMoney}>
          <Text style={styles.textBefore}>Tổng tiền</Text>
          <Text style={styles.textAfter}>
            {inputMoneyQuantity}<Text style={{ color: "black" }}>đ</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleTranferMoney}
          style={styles.button}
        >
          <Text style={styles.buttonContent}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ConfirmPaymentInsideWallet;

const styles = StyleSheet.create({
  headerPart: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: heightScale(-20),
    paddingHorizontal: widthScale(18),
    marginBottom: heightScale(10),
  },
  headerTextRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: heightScale(11),
  },
  headerText: {
    fontSize: fontScale(20),
    fontWeight: "600",
  },
  seeAll: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: Colors.MainColor,
  },
  MoneyRespository: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: heightScale(-45),
    paddingHorizontal: widthScale(8),
    paddingVertical: widthScale(6),
    
    backgroundColor: "white",
  },
  buttonDeposit: {
    backgroundColor: 'transparent',
    paddingVertical: widthScale(6),
    paddingHorizontal: widthScale(30),
    borderRadius: widthScale(10),
    borderColor: "#dadada",
    borderWidth: 2,
    display: 'flex',
    flexDirection: "row",
    gap: 20,
    alignItems: 'center'
  },
  logo: {
    width: widthScale(32),
    height: heightScale(32)
  },
  textOn: {
    fontWeight: "600",
    fontSize: fontScale(14),
  },
  textBelow: {
    fontWeight: "500",
    fontSize: fontScale(11),
    color: '#929292'
  },
  title: {
    fontSize: fontScale(20),
    fontWeight: '500',
    color: '#000000B2'
  },
  buttonText: {
    fontWeight: "700",
    fontSize: fontScale(18),
  },
  lineVerticle: {
    width: widthScale(1),
    height: heightScale(25),
    backgroundColor: "gray",
    alignSelf: "center",
  },
  bodyContainer: {
    paddingHorizontal: widthScale(18),
    paddingVertical: heightScale(10),
  },

  Details: {
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

  textInnerRespository: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow:'hidden',

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
    paddingLeft:30
  },
  bankIcon: {
    width: widthScale(28),
    height: heightScale(28),
    marginRight: widthScale(23),
  },
  iconMuiten: {
    width: widthScale(12.41),
    height: heightScale(22.83),
    marginLeft: widthScale(50),
  },
  iconMuitenDuoi: {
    width: widthScale(12.41),
    height: heightScale(22.83),
    marginLeft: widthScale(87),
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
  button: {
    backgroundColor: Colors.MainColor,
    borderRadius: widthScale(10),
    width: "90%",
    height: heightScale(55),
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightScale(19),
    marginHorizontal: "auto",
  },
  buttonContent: {
    color: Colors.White,
    fontSize: fontScale(17),
    fontWeight: "500",
  },
  totalMoney: {
    marginTop: heightScale(200),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
