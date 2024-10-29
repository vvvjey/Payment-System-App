import { View, Text, StyleSheet } from "react-native";
import React from "react";
import QRIcon from "../../../../assets/icons/qrIcon";
import { Colors } from "../../../../assets/colors";
import { heightScale, widthScale } from "../../../utils/spacing";

const QRTab = () => {
  return (
    <View style={styles.container}>
      <QRIcon />
      <Text style={styles.text}>Quét QR</Text>
    </View>
  );
};

export default QRTab;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.MainColor,
    borderRadius: 90,
    padding: widthScale(10),
    zIndex: 1,
    transform: [{ translateY: -heightScale(25) }]
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: "#ffffff",
  },
});
