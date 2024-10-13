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
      <View style={styles.balanceContainer}>
        <View>
          <Text style={styles.viTitle}>
            <Text style={{ color: "#333333" }}> Ví </Text>
            <Text style={{ color: "#030878" }}>Nex</Text>
            <Text style={{ color: "#1EA9F4" }}>Pay</Text>
          </Text>
          <View style={styles.balanceAccount}>
            <Image source={IMAGES.Visibility} style={styles.visibility}></Image>
            <Text style={styles.money}>30.000.000đ</Text>
          </View>
        </View>
        <View style={styles.manageBar}>
          <ManageBar />
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
    height: heightScale(210),
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

  balanceContainer: {
    backgroundColor: "white",
    borderRadius: widthScale(10),
    width: widthScale(389),
    height: heightScale(136),
    alignSelf: "center",
    paddingHorizontal: widthScale(12),
    position: "absolute",
    zIndex: 1,
    top: heightScale(245),
    elevation: 4,
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
  money: {
    fontSize: fontScale(11),
    fontWeight: "bold",
  },
  manageBar: {
    marginTop: heightScale(17)
  }




});
