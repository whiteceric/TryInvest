import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from "react-native";

import { Colors } from "../assets/Colors";
import up_arrow from "../assets/images/up_arrow.png";
import down_arrow from "../assets/images/down_arrow.png";

export const formatPrice = (price) => {
  return "$" + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getPriceSize = (formattedPrice) => {
  const len = formattedPrice.length;
  const scale = Dimensions.get("window").width > 375 ? 10 : 12;
  return len < 8 ? 52 : 52 - scale * (len - 8);
};

export const StockListItem = ({
  tag,
  name,
  currentPrice,
  dayChange,
  sharesOwned,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.leftSide}>
        <Text style={styles.stockName}>{name}</Text>
        <Text style={styles.stockTag}>{tag}</Text>
        <Image
          style={styles.arrowImage}
          source={dayChange < 0 ? down_arrow : up_arrow}
        />
      </View>
      <View style={styles.rightSide}>
        <Text
          style={[
            styles.price,
            { fontSize: getPriceSize(formatPrice(currentPrice)) },
          ]}
        >
          {formatPrice(currentPrice)}
        </Text>
        <Text
          style={[
            styles.priceSmall,
            { color: dayChange < 0 ? Colors.negative : Colors.primary },
          ]}
        >
          {dayChange < 0 ? "-" : "+"}${Math.abs(dayChange).toFixed(2)}
        </Text>
        <Text style={styles.priceSmall}>{sharesOwned} shares owned</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  leftSide: {
    display: "flex",
  },
  stockName: {
    color: Colors.primary,
    fontSize: 15,
  },
  stockTag: {
    color: Colors.primary,
    fontSize: 40,
    fontWeight: "bold",
  },
  arrowImage: {
    width: 70,
    height: 70,
  },
  rightSide: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 52,
    color: Colors.primary,
    fontWeight: "bold",
  },
  priceSmall: {
    fontSize: 23,
    color: Colors.primary,
  },
});
