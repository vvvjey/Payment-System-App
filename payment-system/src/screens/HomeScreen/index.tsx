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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../assets/colors";
import { heightScale, widthScale } from "../../utils/spacing";
import IMAGES from "../../../assets/images";
import SearchBar from "../../components/SearchBar";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.LightBlue }}>
      <View style={styles.headerContainer}>
        <ImageBackground style={styles.banner} source={IMAGES.banner}>
          <View style={styles.appBar}>
            <View style={styles.searchBar}>
              <SearchBar />
            </View>
            <View style={styles.iconPart}>
              <TouchableOpacity style={styles.iconContainer}>
                <ImageBackground
                  resizeMode="contain"
                  style={styles.icon}
                  source={IMAGES.BellIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <ImageBackground
                  resizeMode="contain"
                  style={styles.icon}
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
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
    paddingHorizontal: widthScale(20),
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    flex: 0.7,
    height: heightScale(32),
    paddingLeft: widthScale(18),
    borderRadius: widthScale(12),
  },
  iconPart: {
    flex: 0.3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconContainer: {
    width: widthScale(25),
    height: heightScale(24),
    borderRadius: widthScale(15),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: widthScale(5),
    paddingHorizontal: widthScale(2),
    paddingVertical: heightScale(2),
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  modelPart: {
    marginHorizontal: widthScale(20),
    display: "flex",
    flexDirection: "row-reverse"
  },
  modelContainer: {
    height: heightScale(138),
    marginTop: heightScale(10),
    width: widthScale(200)
  },
  model: {
    height: "100%",
    width: "100%",
  },
});
