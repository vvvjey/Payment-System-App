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
import { heightScale, widthScale } from "../../utils/spacing";

const SearchBar = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <ImageBackground resizeMode="contain" style={styles.icon} source={IMAGES.SearchIcon} />
      </View>

      <TextInput placeholder="Tìm số điện thoại chuyển tiền" />
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: widthScale(25),
    height: heightScale(24),
    marginRight: widthScale(18)
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});
