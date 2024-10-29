import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ProfileIcon from "../../../../assets/icons/profileIcon";

const ProfileTab = ({ focused }: { focused: boolean }) => {
  return (
    <View style={styles.container}>
      <ProfileIcon isFocused={focused}/>
      <Text style={focused ? styles.text1 : styles.text}>Tôi</Text>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: "#929292",
  },
  text1: {
    color: "#1EA9F4",
  },
});
