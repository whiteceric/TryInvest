import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { StockListItem, formatPrice } from "./StockListItem";
import { SearchBar } from "./SearchBar";

import { Colors } from "../assets/Colors";

const api = {
  AAPL: {
    tag: "AAPL",
    name: "Apple Inc.",
    currentPrice: 127.43,
    dayChange: -3.54,
    sharesOwned: 3,
  },
  AMZN: {
    tag: "AMZN",
    name: "Amazon",
    currentPrice: 3024.5,
    dayChange: +23.54,
    sharesOwned: 10,
  },
};

const stockList = [
  "AAPL",
  "AMZN",
  "AZZN",
  "AMZN",
  "AMZN",
  "AMZN",
  "AMZN",
  "AMZN",
  "AMZN",
  "AMZN",
  "AMZN",
  "AMZN",
  "AMZN",
  "AMZN",
]; // Object.keys(api);

export const TradeScreen = ({ navigation }) => {
  const [stock, setStock] = useState(null);
  const [tradeMode, setTradeMode] = useState("BUY");
  const [cash, setCash] = useState(0);

  useEffect(() => {
    setCash(500.34);
    setStock(api["AAPL"]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Trade</Text>
      <Text style={styles.cash}>{formatPrice(cash)}</Text>
      <Text style={styles.cashLabel}>Cash</Text>
      <View style={styles.tradeModeButtonContainer}>
        <TouchableOpacity
          style={[styles.tradeButton].concat(
            tradeMode == "BUY" ? [styles.activeTradeButton] : []
          )}
          activeOpacity={0.7}
          onPress={() => setTradeMode("BUY")}
        >
          <Text
            style={[styles.tradeButtonText].concat(
              tradeMode == "BUY" ? [styles.activeTradeButtonText] : []
            )}
          >
            BUY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tradeButton].concat(
            tradeMode == "SELL" ? [styles.activeTradeButton] : []
          )}
          activeOpacity={0.7}
          onPress={() => setTradeMode("SELL")}
        >
          <Text
            style={[styles.tradeButtonText].concat(
              tradeMode == "SELL" ? [styles.activeTradeButtonText] : []
            )}
          >
            SELL
          </Text>
        </TouchableOpacity>
      </View>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        barStyle={styles.searchBar}
        textStyle={styles.searchBarText}
        dropdownContainerStyle={styles.searchDropdownContainer}
        dropdownItemStyle={styles.searchDropdownItem}
        dropdownItemText={styles.searchDropdownText}
        defaultText={"Search"}
        items={stockList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    color: Colors.primary,
    fontSize: 40,
    alignSelf: "flex-start",
    left: 15,
    top: 20,
  },
  cash: {
    color: Colors.primary,
    marginTop: 35,
    fontSize: 52,
    fontWeight: "bold",
  },
  cashLabel: {
    color: Colors.secondary,
    fontSize: 30,
  },
  tradeModeButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  tradeButtonText: {
    color: Colors.primary,
    fontSize: 32,
    fontWeight: "bold",
  },
  tradeButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    width: "40%",
    height: 70,
  },
  activeTradeButton: {
    backgroundColor: Colors.primary,
  },
  activeTradeButtonText: {
    color: Colors.secondary,
  },
  searchBarContainer: {
    marginVertical: 20,
    flex: 1,
    width: "80%",
  },
  searchBar: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
    height: 45,
    padding: 3,
  },
  searchBarText: {
    fontSize: 30,
  },
  searchDropdownContainer: {
    backgroundColor: Colors.primary,
    minHeight: 45,
    maxHeight: 200,
    borderColor: Colors.black,
    borderWidth: 1,
  },
  searchDropdownItem: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    borderColor: Colors.white,
    backgroundColor: Colors.primary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 5,
  },
  searchDropdownText: {
    fontSize: 24,
  },
});
