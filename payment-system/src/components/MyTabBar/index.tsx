import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export function MyTabBar({ state, descriptors, navigation } : {state: any, descriptors: any, navigation: any}) {
  return (
    <View style={{ flexDirection: 'row' }}>
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
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
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
            style={{ flex: 1 }}
          >
            {/* Cho dongf if */}
            {label==="Home" && <Text>Home</Text>}
            {label==="Promotion" && <Text>Promotion</Text>}
            {label==="History" && <Text>History</Text>}
            {label==="Profile" && <Text>Profile</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}