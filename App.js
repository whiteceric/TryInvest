import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "./components/HomeScreen";
import { TabNavigator } from "./components/TabNavigator";
import { StockDetailScreen } from "./components/StockDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Colors } from "./assets/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen
          name="Stock Info"
          component={StockDetailScreen}
          options={{
            headerShown: true,
            headerStyle: styles.headerStyle,
            headerTintColor: Colors.primary,
            headerBackTitle: "Back",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background,
  },
  headerStyle: {
    backgroundColor: Colors.background,
  },
});
