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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab } from "react-native-elements";

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.headerPart}>
            <View style={styles.headerContainer}>
                <ImageBackground resizeMode="contain" style={styles.iconBack} source={IMAGES.ArrowBack} />
                <Text style={styles.headerTitle}>Hồ sơ của tôi</Text>
            </View>
            <View style={styles.divider} />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerPart: {
        // backgroundColor: Colors.White,
        // paddingBottom: heightScale(20),
    },
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: heightScale(40),
    },
    headerTitle: {
        fontSize: fontScale(20),
        fontWeight: "500",
        marginLeft: widthScale(105)
    },
    iconBack: {
        width: widthScale(14),
        height: heightScale(11),
        marginLeft: widthScale(37),
        marginTop: heightScale(10),
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.Black,
        marginVertical: 8, 
        width: "90%",
        marginHorizontal: "auto",
        opacity: 0.1,
    },
})

export default ProfileScreen;
