import React, { Component } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../assets/colors";
import { fontScale, heightScale, widthScale } from "../../utils/spacing";
import IMAGES from "../../../assets/images";
import SearchBar from "../../components/SearchBar";
import ManageBar from "../../components/ManageBar";


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.headerPart}>
      <View style={styles.headerContainer}>
        <ImageBackground style={styles.banner} source={IMAGES.banner}>
          <View style={styles.appBar}>
            <View>
              <SearchBar />
            </View>
            <View style={styles.iconPart}>
              <TouchableOpacity style={styles.iconContainer}>
                <ImageBackground
                  resizeMode="contain"
                  style={styles.iconBell}
                  source={IMAGES.BellIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <ImageBackground
                  resizeMode="contain"
                  style={styles.iconChat}
                  source={IMAGES.ChatIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.modelPart}>
            <View style={styles.modelContainer}>
              <ImageBackground
                resizeMode="contain"
                style={styles.model}
                source={IMAGES.Model}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.bodyContainer}>
        {/* Balance of NexPay */}
        <View style={styles.balanceContainer}>
          <View style={styles.headerBalance}>
            <View>
              <Text style={styles.viTitle}>
                <Text style={{ color: Colors.DarkGray }}> Ví </Text>
                <Text style={{ color: Colors.DarkBlue }}>Nex</Text>
                <Text style={{ color: "#1EA9F4" }}>Pay</Text>
              </Text>
              <View style={styles.balanceAccount}>
                <TouchableOpacity>
                  <Image source={IMAGES.Visibility} style={styles.visibility}></Image>              
                </TouchableOpacity>
                <Text style={styles.balance}>30.000.000đ</Text>
              </View>
            </View>
            <View style={styles.manageBar}>
              <ManageBar />
            </View>
          </View>  
          <View style={styles.line}>
          </View>   
          <View style={styles.bodyBalance}>
            <TouchableOpacity style={styles.childBalance}>            
              <Image source={IMAGES.NapTien} style={styles.iconNap}></Image>  
              <Text style={styles.textBalance}>Nạp/Rút</Text>            
            </TouchableOpacity>
            <TouchableOpacity style={styles.childBalance}>
              <Image source={IMAGES.RutTien} style={styles.iconRut}></Image>    
              <Text style={styles.textBalance}>Nhận tiền</Text>          
            </TouchableOpacity>
            <TouchableOpacity style={styles.childBalance}>
              <Image source={IMAGES.QR} style={styles.iconQR}></Image>     
              <Text style={styles.textBalance}>QR Thanh toán</Text>         
            </TouchableOpacity>
            <TouchableOpacity style={styles.childBalance}>
              <Image source={IMAGES.TienIch} style={styles.iconTienich}></Image>  
              <Text style={styles.textBalance}>Ví tiện ích</Text>            
            </TouchableOpacity>
          </View>
        </View>
        {/* Main Services */}
        <View style={styles.mainServiceContainer}>
          <View style={styles.bodyMainService}>
            <TouchableOpacity style={styles.childMainService}>            
              <Image source={IMAGES.ChuyenTien} style={styles.iconChuyentien}></Image>  
              <Text style={styles.textMainService}>Chuyển tiền</Text>            
            </TouchableOpacity>
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.ThanhToanHD} style={styles.iconThanhtoanHD}></Image>    
              <Text style={styles.textMainService}>Thanh toán{"\n"}hóa đơn</Text>          
            </TouchableOpacity>
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.NapTienDT} style={styles.iconNaptienDT}></Image>     
              <Text style={styles.textMainService}>Nạp tiền{"\n"}điện thoại</Text>         
            </TouchableOpacity>
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.Data5G} style={styles.iconData5G}></Image>  
              <Text style={styles.textMainService}>Data 4D/5D</Text>            
            </TouchableOpacity>
          </View>
          <View style={styles.bodyMainService}>
            <TouchableOpacity style={styles.childMainService}>            
              <Image source={IMAGES.ThanhToanKV} style={styles.iconThanhtoanKV}></Image>  
              <Text style={styles.textMainService}>Thanh toán{"\n"}khoản vay</Text>            
            </TouchableOpacity>
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.XemPhim} style={styles.iconXemphim}></Image>    
              <Text style={styles.textMainService}>Mua vé{"\n"}xem phim</Text>          
            </TouchableOpacity> 
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.DuLich} style={styles.iconDulich}></Image>     
              <Text style={styles.textMainService}>Du lịch{"\n"}Đi lại</Text>         
            </TouchableOpacity>
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.XemThem} style={styles.iconXemthem}></Image>  
              <Text style={styles.textMainService}>Xem thêm{"\n"}dịch vụ</Text>            
            </TouchableOpacity>
          </View>          
        </View>
        {/* NexPay đề xuất */}
        <View>
          <Text style={styles.deXuatTitle}>
            <Text style={{ color: Colors.DarkBlue }}>Nex</Text>
            <Text style={{ color: "#1EA9F4" }}>Pay</Text>
            <Text > đề xuất</Text>
          </Text>
        </View>
        {/* Other Services */}
        <View style={styles.otherServiceContainer}>
          <View style={styles.bodyMainService}>
            <TouchableOpacity style={styles.childMainService}>            
              <Image source={IMAGES.ChuyenTien} style={styles.iconChuyentien}></Image>  
              <Text style={styles.textMainService}>Chuyển tiền</Text>            
            </TouchableOpacity>
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.ThanhToanHD} style={styles.iconThanhtoanHD}></Image>    
              <Text style={styles.textMainService}>Thanh toán{"\n"}hóa đơn</Text>          
            </TouchableOpacity>
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.NapTienDT} style={styles.iconNaptienDT}></Image>     
              <Text style={styles.textMainService}>Nạp tiền{"\n"}điện thoại</Text>         
            </TouchableOpacity>
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.Data5G} style={styles.iconData5G}></Image>  
              <Text style={styles.textMainService}>Data 4D/5D</Text>            
            </TouchableOpacity>
          </View>
          <View style={styles.bodyMainService}>
            <TouchableOpacity style={styles.childMainService}>            
              <Image source={IMAGES.ThanhToanKV} style={styles.iconThanhtoanKV}></Image>  
              <Text style={styles.textMainService}>Thanh toán{"\n"}khoản vay</Text>            
            </TouchableOpacity>
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.XemPhim} style={styles.iconXemphim}></Image>    
              <Text style={styles.textMainService}>Mua vé{"\n"}xem phim</Text>          
            </TouchableOpacity> 
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.DuLich} style={styles.iconDulich}></Image>     
              <Text style={styles.textMainService}>Du lịch{"\n"}Đi lại</Text>         
            </TouchableOpacity>
            <TouchableOpacity style={styles.childMainService}>
              <Image source={IMAGES.XemThem} style={styles.iconXemthem}></Image>  
              <Text style={styles.textMainService}>Xem thêm{"\n"}dịch vụ</Text>            
            </TouchableOpacity>
          </View>


          
        </View>
      </View>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerPart: {
    backgroundColor: Colors.LightBlue,
    paddingTop: heightScale(40),
  },
  headerContainer: {
    width: "100%",
    height: heightScale(210),
    display: "flex",
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  appBar: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: widthScale(22),
  },
  iconPart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: widthScale(110),
  },
  iconContainer: {
    width: widthScale(29),
    height: heightScale(28),
    borderRadius: widthScale(50),
    backgroundColor: "white",
    marginRight: widthScale(9),
  },
  iconBell: {
    height: widthScale(20),
    width: heightScale(20),
    margin: widthScale(4.5),
  },
  iconChat: {
    height: widthScale(22),
    width: heightScale(22),
    margin: heightScale(3.5),
  },
  modelPart: {
    marginHorizontal: widthScale(20),
    display: "flex",
    flexDirection: "row-reverse",
  },
  modelContainer: {
    height: heightScale(138),
    marginTop: heightScale(10),
    width: widthScale(200),
  },
  model: {
    height: "100%",
    width: "100%",
  },

  bodyContainer: {
    backgroundColor: Colors.White,
    height: heightScale(800),
  },
  balanceContainer: {
    backgroundColor: "white",
    borderRadius: widthScale(10),
    width: widthScale(389),
    height: heightScale(136),
    alignSelf: "center",
    paddingHorizontal: widthScale(12),
    position: "absolute",
    zIndex: 1,
    top: heightScale(-30),
    elevation: 4,

  },
  headerBalance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viTitle: {
    fontSize: fontScale(10),
    fontWeight: "bold",
    marginTop: heightScale(9)
  },
  balanceAccount: {
    display: "flex",
    flexDirection: "row",
    marginTop: heightScale(2),
  },
  visibility: {
    width: widthScale(12),
    height: heightScale(12),
    marginRight: widthScale(5),
    marginLeft: widthScale(2),
    marginTop: heightScale(2.5)
  },
  balance: {
    fontSize: fontScale(11),
    fontWeight: "bold",
  },
  manageBar: {
    marginTop: heightScale(17)
  },
  line: {
    width: widthScale(365),
    height: heightScale(1),
    marginTop: heightScale(9), 
    backgroundColor: '#1EA9F4',
    color: 'red',
  },
  bodyBalance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightScale(13),
  },
  childBalance: {
    width: widthScale(80),
    height: heightScale(60),
    backgroundColor: '#9BD5FA',
    borderWidth: widthScale(1),           
    borderColor: '#1EA9F4',    
    borderRadius: widthScale(10), 
    justifyContent: 'center',
    alignItems: 'center',  
    display: 'flex',
    flexDirection: 'column',  
  },
  iconNap: {
    width: widthScale(30),
    height: heightScale(30),
  },
  iconRut: {
    width: widthScale(30),
    height: heightScale(28),
  },
  iconQR: {
    width: widthScale(30),
    height: heightScale(27),
  },
  iconTienich: {
    width: widthScale(25),
    height: heightScale(25.24),
  },
  textBalance: {
    fontSize: fontScale(9),
    color: '#333333',
    textAlign: 'center',
  },
  mainServiceContainer: {
    width: widthScale(345),
    height: heightScale(163),
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: heightScale(139),
  },
  bodyMainService: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  childMainService: {
    width: widthScale(75),
    display: 'flex',
    flexDirection: 'column', 
    marginTop: heightScale(6),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textMainService: {
    fontSize: fontScale(10),
    textAlign:'center',
    marginTop: heightScale(4),
  },
  iconChuyentien: {
    width: widthScale(30),
    height: heightScale(30),
  },
  iconThanhtoanHD: {
    width: widthScale(34),
    height: heightScale(28.85),
  },
  iconNaptienDT: {
    width: widthScale(30),
    height: heightScale(30),
  },
  iconData5G: {
    width: widthScale(27),
    height: heightScale(27),
  },
  iconThanhtoanKV: {
    width: widthScale(25),
    height: heightScale(25),
  },
  iconXemphim: {
    width: widthScale(32),
    height: heightScale(32),
  },
  iconDulich: {
    width: widthScale(40),
    height: heightScale(40),
  },
  iconXemthem: {
    width: widthScale(28),
    height: heightScale(28),
  },


  deXuatTitle: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
    marginLeft: widthScale(21),
    marginTop: heightScale(-13),
  },
  otherServiceContainer: {
    width: widthScale(345),
    height: heightScale(163),
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: heightScale(13),
  },



});
