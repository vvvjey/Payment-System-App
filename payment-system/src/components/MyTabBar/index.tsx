import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { heightScale, widthScale } from "../../utils/spacing";
import { Colors } from "../../../assets/colors";
import HomeTab from "./homeTab";
import PromotionTab from "./promotionTab";
import HistoryTab from "./historyTab";
import ProfileTab from "./profileTab";
import QRTab from "./qrTab";

const renderItem = (TabName: string, Focused: boolean) => {
  switch (TabName) {
    case "Home": {
      return <HomeTab focused={Focused} />;
    }
    case "Promotion": {
      return <PromotionTab focused={Focused} />;
    }
    case "CameraHandleQRCode": {
      return <QRTab />;
    }
    case "History": {
      return <HistoryTab focused={Focused} />;
    }
    case "Profile": {
      return <ProfileTab focused={Focused} />;
    }
  }
};

export function MyTabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: heightScale(80),
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#D7D7D7' ,
        paddingHorizontal: widthScale(18)
      }}
    >
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (label === "CameraHandleQRCodeTab") {
              navigation.navigate("CameraHandleQRCode");
            } else navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={isFocused ? styles.focused : styles.blured}
            key={label}
          >
            {renderItem(label, isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  focused: {
    display: "flex",
    borderTopColor: Colors.MainColor,
    borderTopWidth: heightScale(2),
    height: "100%",
    justifyContent: "center",
  },
  blured: {
    display: "flex",
    borderTopColor: "transparent",
    borderTopWidth: heightScale(2),
    height: "100%",
    justifyContent: "center",
  },
});
