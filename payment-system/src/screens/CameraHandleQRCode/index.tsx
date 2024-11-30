import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import 'react-native-get-random-values';
// import { BarCodeScanner, BarCodeScanningResult } from "expo-barcode-scanner";
import { CameraView, useCameraPermissions } from "expo-camera"; // Use CameraView from expo-camera
import 'react-native-get-random-values'
import CryptoJS from "crypto-js";
import QRIcon from "../../../assets/icons/qrIcon";
import { fontScale, heightScale, widthScale } from "../../utils/spacing";
import { Colors } from "../../../assets/colors";
import QRCode from "react-native-qrcode-svg";
import IMAGES from "../../../assets/images";
import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../navigation/type";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

const secretKey = "qrcode-hoang-tu";

export default function CameraHandleQRCode() {

  const navigation = useNavigation<ScreenNavigationProp>();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const [currentTab, setCurrentTab] = useState(0);
  const [cameraPaused, setCameraPaused] = useState(false); // Added state to pause camera

  let receiverId = 1;
  // Add bank selected
  const [isAddBankSelected, setAddBankSelection] = useState(false);
  const handleAddBankPress = () => {
    setAddBankSelection(!isAddBankSelected);
  };

  const [isBIDVSelected, setBIDVSelection] = useState(false);
  const handleBIDVPress = () => {
    setBIDVSelection(!isBIDVSelected);
  };

  // Handle QR code screen
  const user = useSelector((state:RootState) => state.user); 
  const [timer, setTimer] = useState(300); // 5 minutes = 300 seconds

  const [userId,setUserId] = useState<number>();
  const [encryptedData, setEncryptedData] = useState<string>("");
  useEffect(()=>{
    console.log('abcd',user?.user?.user?.id)
    setUserId(user?.user?.user?.id)


   
  },[user])

  useEffect(() => {
    let dataToEncrypt = JSON.stringify({
      receiverId: userId,
      amount: 10000,
    });

    // Encrypt the data each time the `userId` or `amount` changes
    const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
    setEncryptedData(encrypted);
    console.log("Encrypted dataa:", encrypted);
    if (userId) {
    }
  }, [userId]); // Re-run when `userId` changes


  useEffect(() => {
    try {
      if (encryptedData) {
        // Decrypt the data
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to string
        console.log("Decrypted dataa:", decryptedData); // Should log original data
      }
    } catch (error) {
      console.error("Error decrypting QR code data:", error);
      Alert.alert("QR Scan Failed", "Invalid QR code data.");
    
    }
  }, [encryptedData]); // Run when encryptedData changes
  // Timer QR code
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        let dataToEncrypt = JSON.stringify({
          receiverId: userId,
          amount: 10000,
        });
  
        // Encrypt the data each time the `userId` or `amount` changes
        try {
          const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
          setEncryptedData(encrypted);
          console.log("Encrypted data:", encrypted);
          setTimer(300); // Reset to 5 minutes
        } catch (error) {
          console.error("Error decrypting QR code data:", error);
          Alert.alert("QR Scan Failed", "Invalid QR code data.");
    
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);
 


  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        const { status } = await requestPermission();
        if (status === "granted") {
          console.log("Camera access granted");
        } else {
          console.log("Camera access denied");
        }
      }
    })();
  }, [permission, requestPermission]);
  useFocusEffect(
    React.useCallback(() => {
      // Reset scanned state to false each time the screen is focused
      setCameraPaused(false);
      setScanned(false);
      setTimer(300); // Reset timer when screen is focused

      // QR code screen   
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      if (currentTab === 1) {
        setScanned(false);  // Reset scanned state when switching to the QR scanning tab
      }
    }, [currentTab])
  );
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    try {
      console.log('data',data)
      // Decrypt the scanned data
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      console.log("Decrypted data:", decryptedData);
      const parsedData = JSON.parse(decryptedData);

      // Now you can access the receiverWalletId and amount
      const receiverId = parsedData.receiverId;
      const amount = parsedData.amount;
      // Handle self scan
      if(userId == receiverId){
        Alert.alert("QR Code Error!", `Cannot scan own QRcode`);
      }else {
        setCameraPaused(true);
        navigation.navigate('InputMoney',{receiverId:receiverId})
      }
      // Alert.alert("QR Code scanned!", `Decrypted data: ${decryptedData}`);
    } catch (error) {
      console.error("Error decrypting QR code data:", error);
    }
  };

  if (!permission?.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.subTab}>
        <TouchableOpacity
          style={[
            styles.subTabItem,
            currentTab === 0 ? styles.subTabItemActive : null,
          ]}
          onPress={() => setCurrentTab(0)}
        >
          <QRIcon
            fill={currentTab === 0 ? Colors.White : Colors.MainColor}
            width={24}
            height={24}
          />
          <Text
            style={[
              styles.subTabText,
              currentTab === 0 ? styles.subTabTextActive : null,
            ]}
          >
            QR Thanh toán
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subTabItem,
            currentTab === 1 ? styles.subTabItemActive : null,
          ]}
          onPress={() => setCurrentTab(1)}
        >
          <QRIcon
            fill={currentTab === 1 ? Colors.White : Colors.MainColor}
            width={24}
            height={24}
          />
          <Text
            style={[
              styles.subTabText,
              currentTab === 1 ? styles.subTabTextActive : null,
            ]}
          >
            Quét QR
          </Text>
        </TouchableOpacity>
      </View>

      {currentTab === 0 && (
        <View style={styles.tabContent}>
          <View style={styles.QRContainer}>
            <Text style={styles.title}>Đưa mã này cho thu ngân</Text>
            <View style={styles.qrContainer}>
              <QRCode
                value={encryptedData || "No data"} // Fallback text when no data is available
                size={250}
              />
            </View>
            <Text style={styles.title}>
              Tự động cập nhật sau <Text style={{ color: "#007F5F" }}>{timer}</Text>
              .
            </Text>
          </View>
          <View style={styles.repositoryContainer}>
            <Text style={styles.textDeposit}>Chọn thẻ để thanh toán</Text>
            <View style={styles.MoneyRespository}>
              <TouchableOpacity
                onPress={handleBIDVPress}
                style={[
                  styles.contentInnerResposity,
                  { marginBottom: 0 },
                  {
                    backgroundColor: isBIDVSelected
                      ? Colors.LightBlue
                      : "#FFFFFF",
                  },
                ]}
              >
                <Image source={IMAGES.BIDV} style={styles.bidvIcon}></Image>
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
          </View>
        </View>
      )}

      {currentTab === 1 && (
        <View style={styles.tabContent}>
          <View style={styles.scanContainer}>
          {!cameraPaused && (
            <CameraView
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            />
          )}
            {scanned && (
              <Text onPress={() => setScanned(false)} style={styles.rescanText}>
                Tap to scan again
              </Text>
            )}
            
          </View>

          <View style={styles.bottomSheet}>
            <Text style={styles.title}>Quét QR để thanh toán</Text>
            <Text style={styles.subTitle}>
              Giữ mã QR bên trong khung, nó sẽ được quét tự động
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("InputMoney",{receiverId:receiverId})}>
              <Text style={styles.selectImage}>Chọn ảnh QR</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.LightBlue,
  },
  subTab: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: heightScale(10),
  },
  subTabItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: widthScale(10),
    paddingVertical: heightScale(14),
    paddingHorizontal: widthScale(27),
    borderRadius: 18,
    width: "40%",
  },
  subTabItemActive: {
    backgroundColor: Colors.MainColor,
  },
  subTabText: {
    fontSize: fontScale(16),
    color: Colors.MainColor,
    fontWeight: "bold",
  },
  subTabTextActive: {
    color: Colors.White,
  },
  tabContent: {
    flex: 9,
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "column",
  },
  scanContainer: {
    flex: 8,
  },
  scanner: {
    width: "100%",
    height: "100%",
    top: 0,
  },
  rescanText: {
    fontSize: 16,
    color: "blue",
    textAlign: "center",
    padding: 20,
  },
  bottomSheet: {
    flex: 2,
    backgroundColor: Colors.White,
    paddingVertical: heightScale(20),
    paddingHorizontal: widthScale(18),
    gap: heightScale(15),
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  title: {
    fontSize: fontScale(18),
    fontWeight: "bold",
    color: "#030319",
  },
  subTitle: {
    fontSize: fontScale(14),
    color: "#8F92A1",
  },
  selectImage: {
    fontSize: fontScale(18),
    fontWeight: "bold",
    color: "#00477A",
    textDecorationLine: "underline",
  },
  QRContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: heightScale(12),
    paddingVertical: heightScale(10),
  },
  qrContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
  },
  repositoryContainer: {
    marginHorizontal: widthScale(24),
    marginTop: heightScale(10),
  },
  textDeposit: {
    fontSize: fontScale(20),
    color: "black",
    fontWeight: "600",
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
  textInnerRespository: {
    display: "flex",
    flexDirection: "column",
  },
  bankIcon: {
    width: widthScale(28),
    height: heightScale(28),
    marginRight: widthScale(23),
  },
  bidvIcon: {
    width: widthScale(36),
    height: heightScale(12),
    marginRight: widthScale(16),
  },
  textBIDV: {
    fontSize: fontScale(18),
    fontWeight: "bold",
  },
  texFreeDeposit: {
    fontSize: fontScale(12),
  },
  iconMuiten: {
    width: widthScale(12.41),
    height: heightScale(22.83),
    marginLeft: 50,
  },
});


// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, View, Alert, Button } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera"; // Use CameraView from expo-camera
// import CryptoJS from "crypto-js";
// import QRCode from "react-native-qrcode-svg";
// import { useNavigation } from "@react-navigation/native"; // For navigation

// const secretKey = "qrcode-hoang-tu"; // Set your secret key for encryption

// export default function CameraHandleQRCode() {
//   const [scanned, setScanned] = useState(false); // To track if QR is scanned
//   const [userId, setUserId] = useState<number | undefined>(123); // Mock userId (Replace with actual userId from state)
//   const [encryptedData, setEncryptedData] = useState<string>("");
//   const navigation = useNavigation();

//   const [permission, requestPermission] = useCameraPermissions(); // Request camera permissions

//   useEffect(() => {
//     if (permission?.granted) {
//       console.log("Camera permission granted");
//     } else if (permission?.granted === false) {
//       console.log("Camera permission denied");
//     }
//   }, [permission]);

//   // Encrypt data to be displayed in QR code
//   // useEffect(() => {
//   //   if (userId) {
//   //     const dataToEncrypt = JSON.stringify({
//   //       receiverId: userId,
//   //       amount: 10000, // Set the amount you want to encrypt and display
//   //     });
//   //     const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
//   //     setEncryptedData(encrypted);
//   //   }
//   // }, [userId]);

//   // Handle QR code scan
//   const handleBarCodeScanned = ({ data }: { data: string }) => {
//     setScanned(true);
//     try {
//       console.log('data',data)
//       const bytes = CryptoJS.AES.decrypt(data, secretKey); // Decrypt the data
//       const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
//       const parsedData = JSON.parse(decryptedData); // Parse the decrypted data
//       console.log('data2',parsedData);
//       // const receiverId = parsedData.receiverId;
//       // const amount = parsedData.amount;

//       // if (userId === receiverId) {
//       //   Alert.alert("QR Code Error!", `Cannot scan your own QR code`);
//       // } else {
//       //   navigation.navigate("InputMoney", { receiverId, amount }); // Navigate to InputMoney screen
//       // }
//     } catch (error) {
//       console.error("Error decrypting QR code data:", error);
//       Alert.alert("QR Code Error", "Could not read or decrypt the QR code.");
//     }
//   };

//   if (permission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Scan this QR to receive payment</Text>
//       <QRCode value={encryptedData || "No data"} size={250} /> {/* Display the generated QR code */}

//       <CameraView
//         style={styles.scanner}
//         barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
//         onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Disable scanning after one scan
//       />
//       {scanned && (
//         <Text onPress={() => setScanned(false)} style={styles.rescanText}>
//           Tap to scan again
//         </Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: 20,
//   },
//   scanner: {
//     width: "100%",
//     height: "50%", // Adjust camera view size
//   },
//   rescanText: {
//     color: "#007F5F",
//     fontSize: 16,
//     textAlign: "center",
//     marginTop: 10,
//   },
// });
