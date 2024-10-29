import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PromotionIcon from "../../../../assets/icons/promotionIcon";

const PromotionTab = ({ focused }: { focused: boolean }) => {
  return (
    <View style={styles.container}>
      <PromotionIcon isFocused={focused}/>
      <Text style={focused ? styles.text1 : styles.text}>Ưu đãi</Text>
    </View>
  );
};

export default PromotionTab;

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
