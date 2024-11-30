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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../assets/colors";
import { fontScale, heightScale, widthScale } from "../../utils/spacing";
import IMAGES from "../../../assets/images";
import { NavigationContainer, useNavigation,useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tab } from "react-native-elements";
import { testApi } from "../../services/apiService";
import * as LocalAuthentication from "expo-local-authentication";
import { loginAction } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { ScreenNavigationProp } from "../../navigation/type";
import {ScreenMoneyInputRouteProp} from "../../navigation/type";
import {getUserInforById} from '../../services/apiService';
const InputMoney = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenMoneyInputRouteProp>();
  const [nameUser,setNameUser] = useState<string>('');
  const [amount,setAmount] = useState<string>('');
  const [contentSend,setContentSend] = useState<string>('');
  let { receiverId } = route.params;
  useEffect(()=>{
    async function getUserInfor (){
      let responseUserId = await getUserInforById(receiverId);
      console.log("userInfor",responseUserId.data);
      setNameUser(responseUserId.data.firstName);
    } 
    getUserInfor();
  },[]);
  const handleConfirmPayment = ()=>{
    if(!receiverId || !amount || !contentSend){
      Alert.alert("QR Code Tranfer Error!", `Missing required data`);
    } else {
      navigation.navigate("ConfirmPaymentInsideWallet",{receiverId,amount,contentSend});
    }
  }
  console.log("amount and recei"," = ",receiverId);
  return (
    <SafeAreaView style={styles.headerPart}>
      <View style={styles.logoContainer}>
        <ImageBackground
          resizeMode="contain"
          style={styles.logo}
          source={IMAGES.avatar}
        />
        <Text style={styles.userName}>{nameUser}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.InputMoney}>
          <View>
            <TextInput 
              style={styles.inputMoneyAmount} 
              placeholder="Nhập số tiền" 
              keyboardType="numeric"  
              onChangeText={setAmount}
              value={amount}
            />
          </View>
        </View>
        <Text style={styles.text}>Lời nhắn (0/160)</Text>
        <View style={styles.pwdContainer}>
          <TextInput 
            style={styles.inputPwd} 
            placeholder="Nhập lời nhắn" 
            onChangeText={setContentSend}
            value={contentSend}

          />
        </View>

        <TouchableOpacity onPress={handleConfirmPayment} style={styles.button}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default InputMoney;

const styles = StyleSheet.create({
  headerPart: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingTop: heightScale(10),
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    marginTop: heightScale(50),
  },
  userName: {
    fontSize: fontScale(20),
    fontWeight: "500",
    color: "#303434",
    alignSelf: "center",
    marginBottom: heightScale(20)
  },
  logo: {
    width: widthScale(130),
    height: heightScale(132),
    marginBottom: heightScale(15),
  },
  bodyContainer: {
    width: widthScale(390),
    alignSelf: "center",
  },
  inputMoneyAmount: {
    fontSize: fontScale(32)
  },
  InputMoney: {
    alignSelf: "center",
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
});
