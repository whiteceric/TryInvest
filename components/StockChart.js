import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { Colors } from "../assets/Colors";

const data = {
  labels: [13, 14, 15, 16, 19],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: Colors.secondary,
  backgroundGradientTo: Colors.secondary,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: () => Colors.primary,
  fillShadowGradient: Colors.primary,
  fillShadowGradientOpacity: 0.6,
  propsForBackgroundLines: {
    strokeWidth: "1",
    strokeDasharray: [],
  },
  propsForDots: {
    r: "0",
  },
};

const axes = [
  { primary: true, type: "linear", position: "bottom" },
  { type: "linear", position: "left" },
];

export const StockChart = ({ tag }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>{tag} over the last week</Text>
      <LineChart
        data={data}
        width={0.9 * Dimensions.get("window").width} // from react-native
        height={250}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        onDataPointClick={({ value, dataset, getColor }) =>
          console.log(value, dataset, getColor)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  chartTitle: {
    color: Colors.primary,
    fontSize: 30,
  },
  chart: {
    marginVertical: 15,
    borderRadius: 16,
  },
});
