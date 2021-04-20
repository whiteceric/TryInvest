import React from "react";
import { HomeScreen } from "./HomeScreen";
import { TradeScreen } from "./TradeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../assets/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        style: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen navigation={navigation} />}
      />
      <Tab.Screen
        name="Trade"
        children={() => <TradeScreen navigation={navigation} />}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background,
  },
});
