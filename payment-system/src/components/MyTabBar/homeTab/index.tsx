import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HomeIcon from "../../../../assets/icons/homeIcon";

const HomeTab = ({ focused }: { focused: boolean }) => {
  return (
    <View style={styles.container}>
      <HomeIcon isFocused={focused}/>
      <View style={styles.textContainer}>
        <Text style={focused ? styles.text1 : styles.text}>Nex</Text>
        <Text style={focused ? styles.text2 : styles.text}>Pay</Text>
      </View>
    </View>
  );
};

export default HomeTab;

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
    color: "#030878",
  },
  text2: {
    color: "#1EA9F4",
  },
});
