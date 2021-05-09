import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
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
  const [cash, setCash] = useState(0);
  const [stock, setStock] = useState(null);
  const [tradeMode, setTradeMode] = useState("BUY");
  const [moreInfoDisabled, setMoreInfoDisabled] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(false);
  const [numShares, setNumShares] = useState(0);
  const [numSharesFocused, setNumSharesFocused] = useState(false);

  useEffect(() => {
    setCash(500.34);
    //setStock(api["AAPL"]);
  }, []);

  const symbolSelected = (symbol) => {
    if (api.hasOwnProperty(symbol)) {
      setStock(api[symbol]);
    } else {
      setStock(null);
    }
    setMoreInfoDisabled(stock == null);
    setConfirmDisabled(stock == null);
  };

  const onNumSharesFocus = () => {
    setNumSharesFocused(true);
    setNumShares(0);
  };

  const onNumSharesInput = (newText) => {
    console.log(newText);
    if (newText.length == 0) {
      setNumShares(0);
    } else if (newText.indexOf(".") == -1 && !isNaN(+newText)) {
      setNumShares(Math.min(99999, newText));
    }
  };

  const onNumSharesSubmit = () => {
    console.log(numShares);
    setNumSharesFocused(false);
    setConfirmDisabled(numShares == 0);
  };

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
        onSelect={symbolSelected}
        items={stockList}
      />
      <Text style={styles.stockPrice}>
        {stock == null ? formatPrice(0) : formatPrice(stock.currentPrice)}
        {console.log(stock)}
      </Text>
      <TouchableOpacity
        style={[
          styles.moreInfoButton,
          moreInfoDisabled ? styles.disabledButtonStyle : {},
        ]}
        onPress={() => console.log("More Info")}
        disabled={moreInfoDisabled}
        activeOpacity={0.7}
      >
        <Text style={styles.moreInfoButtonText}>More Info</Text>
      </TouchableOpacity>
      <View style={styles.numSharesContainer}>
        <Text style={styles.numSharesLabel}># of Shares</Text>
        <TextInput
          value={
            numSharesFocused
              ? numShares == 0
                ? ""
                : String(numShares)
              : String(numShares)
          }
          onFocus={onNumSharesFocus}
          onChangeText={onNumSharesInput}
          onSubmitEditing={onNumSharesSubmit}
          textAlign={"right"}
          style={styles.numSharesInput}
        />
      </View>
      <Text style={styles.estimatedValue}>
        Estimated {tradeMode == "BUY" ? "Cost" : "Value"}:{" "}
        {stock == null
          ? formatPrice(0)
          : formatPrice(numShares * stock.currentPrice)}
      </Text>
      <TouchableOpacity
        style={[
          styles.confirmButton,
          confirmDisabled ? styles.disabledButtonStyle : {},
        ]}
        onPress={() => console.log("Confirm")}
        disabled={confirmDisabled}
        activeOpacity={0.7}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
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
    width: "80%",
    zIndex: 999,
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
    position: "absolute",
    top: 45,
    width: "100%",
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
  stockPrice: {
    color: Colors.primary,
    fontSize: 70,
    fontWeight: "bold",
  },
  moreInfoButton: {
    backgroundColor: Colors.secondary,
    marginVertical: 10,
    width: "45%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  moreInfoButtonText: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: "bold",
  },
  numSharesContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  numSharesLabel: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.primary,
    marginRight: 20,
  },
  numSharesInput: {
    backgroundColor: Colors.primary,
    padding: 5,
    width: "35%",
    height: 50,
    fontSize: 40,
  },
  estimatedValue: {
    fontSize: 30,
    color: Colors.primary,
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: Colors.secondary,
    marginVertical: 20,
    width: "80%",
    height: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: "bold",
  },
  disabledButtonStyle: {
    opacity: 0.7,
  },
});
