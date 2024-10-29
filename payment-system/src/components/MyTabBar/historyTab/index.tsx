import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HistoryIcon from "../../../../assets/icons/historyIcon";

const HistoryTab = ({ focused }: { focused: boolean }) => {
  return (
    <View style={styles.container}>
      <HistoryIcon isFocused={focused}/>
      <Text style={focused ? styles.text1 : styles.text}>Lịch sử GD</Text>
    </View>
  );
};

export default HistoryTab;

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
