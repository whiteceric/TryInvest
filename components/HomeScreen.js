import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { StockListItem, formatPrice } from "./StockListItem";

import { Colors } from "../assets/Colors";

export const HomeScreen = ({ navigation }) => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [cash, setCash] = useState(0);
  const [stockList, setStockList] = useState([]);

  const apple = {
    tag: "AAPL",
    name: "Apple Inc.",
    currentPrice: 127.43,
    dayChange: -3.54,
    sharesOwned: 3,
  };
  const amazon = {
    tag: "AMZN",
    name: "Amazon",
    currentPrice: 3024.5,
    dayChange: +23.54,
    sharesOwned: 10,
  };

  useEffect(() => {
    setPortfolioValue(8000.76);
    setCash(500.34);
    setStockList([apple, amazon, apple]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.money}>{formatPrice(portfolioValue)}</Text>
        <Text style={styles.moneyLabel}>Portfolio Value</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.money}>{formatPrice(cash)}</Text>
        <Text style={styles.moneyLabel}>Cash</Text>
      </View>
      <ScrollView style={styles.stockScrollView}>
        {stockList.map((stock) => {
          return (
            <StockListItem
              key={Math.random() * 100}
              tag={stock.tag}
              name={stock.name}
              currentPrice={stock.currentPrice}
              dayChange={stock.dayChange}
              sharesOwned={stock.sharesOwned}
              onPress={() =>
                navigation.navigate("Stock Info", { tag: stock.tag })
              }
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  money: {
    color: Colors.primary,
    fontSize: 52,
    fontWeight: "bold",
  },
  moneyLabel: {
    color: Colors.secondary,
    fontSize: 30,
  },
  labelContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  stockScrollView: {
    marginTop: 10,
    display: "flex",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
