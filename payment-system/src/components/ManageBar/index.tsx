import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    View,
    Text,
  } from "react-native";
  import IMAGES from "../../../assets/images";
  import React from "react";
  import { fontScale, heightScale, widthScale } from "../../utils/spacing";
  
  const ManageBar = () => {
    return (
      <TouchableOpacity style={styles.container}>
        <Text style={styles.text}>Quản lý</Text>
        <View >
          <ImageBackground resizeMode="contain" style={styles.iconQuanly} source={IMAGES.QuanLy} />
        </View>
        <View >
          <ImageBackground resizeMode="contain" style={styles.iconMuiten} source={IMAGES.MuiTen} />
        </View>
        
      </TouchableOpacity>
    );
  };
  
  export default ManageBar;
  
  
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#9BD5FA",
      width: widthScale(77),
      height: heightScale(17),
      borderRadius: widthScale(5),
      
    },
    text: {
        fontSize: fontScale(9),
        fontWeight: 'bold',
        color: '#333333',
        marginEnd: widthScale(2)
    },
    iconQuanly: {
        width: widthScale(23),
        height: heightScale(13),
        marginEnd: widthScale(4)
    },
    iconMuiten: {
        width: widthScale(4.66),
        height: heightScale(8.56),
    }
  });
  