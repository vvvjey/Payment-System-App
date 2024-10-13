import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  View,
} from "react-native";
import IMAGES from "../../../assets/images";
import React from "react";
import { fontScale, heightScale, widthScale } from "../../utils/spacing";

const SearchBar = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <ImageBackground resizeMode="contain" style={styles.icon} source={IMAGES.SearchIcon} />
      </View>

      <TextInput 
        placeholder="Tìm số điện thoại chuyển tiền"
        style={ styles.input } 
      />
    </TouchableOpacity>
  );
};

export default SearchBar;


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
    width: widthScale(288),
    height: heightScale(32),
    paddingTop: heightScale(1),
    paddingLeft: widthScale(16),
    borderRadius: widthScale(12),
  },
  iconContainer: {
    width: widthScale(18.31),
    height: heightScale(17.58),
    marginRight: widthScale(10)
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  input: {
    fontStyle: 'italic' , 
    fontSize: fontScale(16), 
    color: '#A09CAB',
  }
});
