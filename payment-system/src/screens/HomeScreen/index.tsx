import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text> HomeScreen </Text>
    </SafeAreaView>
  );
};

export default HomeScreen
