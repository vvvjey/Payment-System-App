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
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../assets/colors";
import { fontScale, heightScale, widthScale } from "../../utils/spacing";
import IMAGES from "../../../assets/images";
import SearchBar from "../../components/SearchBar";
import ManageBar from "../../components/ManageBar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tab } from "react-native-elements";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.headerPart}>
      <View style={styles.headerContainer}>
        <View style={styles.iconProfileContainer}>
          <Image
            style={styles.iconProfileHeader}
            source={IMAGES.iconProfileHeader}
          ></Image>
        </View>
        <Text style={styles.userName}>Bùi Thị Hương</Text>
        <Text style={styles.userPhone}>0987364673</Text>
      </View>
      <View style={styles.bodyContainer}>
        <TouchableOpacity style={styles.contentInnerResposity}>
          <View style={styles.before}>
            <Image
              style={styles.iconProfileBody}
              source={IMAGES.iconProfileHeader}
              resizeMode="contain"
            ></Image>
            <Text style={styles.personalText}>Thông tin cá nhân</Text>
          </View>
          <ImageBackground
            resizeMode="contain"
            style={styles.iconMuiten}
            source={IMAGES.MuiTen}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentInnerResposity}>
          <View style={styles.before}>
            <Image
              style={styles.iconProfileBody}
              source={IMAGES.iconIdentification}
              resizeMode="contain"
            ></Image>
            <Text style={styles.personalText}>Xác thực tài khoản</Text>
          </View>
          <ImageBackground
            resizeMode="contain"
            style={styles.iconMuiten}
            source={IMAGES.MuiTen}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentInnerResposity}>
          <View style={styles.before}>
            <Image
              style={styles.iconProfileBody}
              source={IMAGES.iconLink}
              resizeMode="contain"
            ></Image>
            <Text style={styles.personalText}>Thẻ liên kết</Text>
          </View>
          <ImageBackground
            resizeMode="contain"
            style={styles.iconMuiten}
            source={IMAGES.MuiTen}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentInnerResposity}>
          <View style={styles.before}>
            <Image
              style={styles.iconProfileBody}
              source={IMAGES.iconSetting}
              resizeMode="contain"
            ></Image>
            <Text style={styles.personalText}>Cài đặt</Text>
          </View>
          <ImageBackground
            resizeMode="contain"
            style={styles.iconMuiten}
            source={IMAGES.MuiTen}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentInnerResposity}>
          <View style={styles.before}>
            <Image
              style={styles.iconProfileBody}
              source={IMAGES.iconSpending}
              resizeMode="contain"
            ></Image>
            <Text style={styles.personalText}>Quản lý chi tiêu</Text>
          </View>
          <ImageBackground
            resizeMode="contain"
            style={styles.iconMuiten}
            source={IMAGES.MuiTen}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentInnerResposity}>
          <View style={styles.before}>
            <Image
              style={styles.iconProfileBody}
              source={IMAGES.iconHelp}
              resizeMode="contain"
            ></Image>
            <Text style={styles.personalText}>Trung tâm trợ giúp</Text>
          </View>
          <ImageBackground
            resizeMode="contain"
            style={styles.iconMuiten}
            source={IMAGES.MuiTen}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentInnerResposity}>
          <View style={styles.before}>
            <Image
              style={styles.iconProfileBody}
              source={IMAGES.iconLogout}
              resizeMode="contain"
            ></Image>
            <Text style={styles.personalText}>Đăng xuất</Text>
          </View>
          <ImageBackground
            resizeMode="contain"
            style={styles.iconMuiten}
            source={IMAGES.MuiTen}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerPart: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingHorizontal: widthScale(22),
    marginTop: heightScale(-30),
    gap: heightScale(13),
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.White,
    borderRadius: 14,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 5,
    paddingVertical: heightScale(14),
    marginBottom: heightScale(8),
  },
  iconProfileHeader: {
    width: widthScale(24),
    height: heightScale(24),
  },
  userName: {
    fontSize: fontScale(18),
    fontWeight: "500",
    color: "#303434",
  },
  userPhone: {
    fontSize: fontScale(12),
    fontWeight: "500",
    color: "#98a1a1",
  },
  bodyContainer: {
    paddingHorizontal: widthScale(20),
    gap: heightScale(14),
  },
  contentInnerResposity: {
    paddingVertical: heightScale(18),
    paddingHorizontal: widthScale(18),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: widthScale(10),
    backgroundColor: "#f5f5f5",
  },
  iconProfileContainer: {
    backgroundColor: "#f3f4f5",
    width: widthScale(100),
    height: heightScale(100),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  before: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconProfileBody: {
    width: widthScale(20),
    height: heightScale(20),
  },
  personalText: {
    fontSize: fontScale(14),
    fontWeight: "500",
    color: "#303434",
    marginLeft: widthScale(18),
  },
  iconMuiten: {
    width: widthScale(6.5),
    height: heightScale(10.21),
  },
});

export default ProfileScreen;
