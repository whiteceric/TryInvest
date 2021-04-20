import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { StockListItem, formatPrice } from "./StockListItem";

import { Colors } from "../assets/Colors";

export const TradeScreen = ({ navigation }) => {
  const [stock, setStock] = useState("");
  const [tradeMode, setTradeMode] = useState("BUY");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Trade</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  headerText: {
    color: Colors.primary,
    fontSize: 40,
    alignSelf: "flex-start",
    left: 15,
    top: 20,
  },
});
