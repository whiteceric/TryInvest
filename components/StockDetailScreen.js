import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { formatPrice } from "./StockListItem";
import { StockChart } from "./StockChart";

import { Colors } from "../assets/Colors";
import up_arrow from "../assets/images/up_arrow.png";
import down_arrow from "../assets/images/down_arrow.png";

export const StockDetailScreen = ({ navigation, route }) => {
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
  const { tag, name, currentPrice, dayChange, sharesOwned } = api[
    route.params.tag
  ];

  return (
    <SafeAreaView style={styles.scrollViewContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.bigText, styles.stockName]}>{name}</Text>
          <TouchableOpacity
            style={styles.tradeButton}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("Trade");
            }}
          >
            <Text style={styles.tradeButtonText}>TRADE</Text>
          </TouchableOpacity>
          <Text style={[styles.bigText, styles.price]}>
            {formatPrice(currentPrice)}
          </Text>
          <Text
            style={[
              styles.dayChange,
              { color: dayChange < 0 ? Colors.negative : Colors.primary },
            ]}
          >
            {dayChange < 0 ? "-" : "+"}${Math.abs(dayChange)}
          </Text>
          <Image
            style={styles.arrowImage}
            source={dayChange < 0 ? down_arrow : up_arrow}
          />
          <Text style={[styles.bigText, styles.tag]}>{tag}</Text>
          <Text style={styles.shareCount}>
            You Own: {sharesOwned} Share{sharesOwned == 1 ? "" : "s"}
          </Text>
          <StockChart tag={tag} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bigText: {
    color: Colors.primary,
    fontSize: 52,
    fontWeight: "bold",
  },
  dayChange: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: "bold",
  },
  shareCount: {
    color: Colors.primary,
    fontSize: 35,
    fontWeight: "bold",
  },
  stockName: {
    marginTop: 50,
    marginBottom: 10,
  },
  tradeButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    width: "90%",
    display: "flex",
    alignItems: "center",
    marginVertical: 20,
  },
  tradeButtonText: {
    color: Colors.primary,
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 20,
  },
  price: {
    marginVertical: 10,
    fontSize: 60,
  },
  arrowImage: {
    width: 250,
    height: 250,
  },
});
