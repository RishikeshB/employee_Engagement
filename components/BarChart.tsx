import React from "react";
import { Dimensions, useColorScheme, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const chartPadding = 8;

const getLast7DayLabels = () => {
  const labels = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(today.getDate() - i);
    const label = day.toLocaleDateString("en-US", { weekday: "short" });
    labels.push(label);
  }

  return labels;
};

const data = {
  labels: getLast7DayLabels(),
  datasets: [
    {
      data: [1000, 1200, 800, 1500, 2000, 1700, 1300],
    },
  ],
};

const MyBarChart = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const chartConfig = {
    backgroundGradientFrom: isDark ? "#1e1e1e" : "#f2f2f2",
    backgroundGradientTo: isDark ? "#1e1e1e" : "#f2f2f2",
    decimalPlaces: 0,
    color: (opacity = 1) => "#4FC3F7",
    labelColor: (opacity = 1) => "#4FC3F7",
    propsForBackgroundLines: {
      strokeWidth: 0.5,
      stroke: isDark ? "#444" : "#ccc",
      transform: "translate(80,0)",
    },
  };

  return (
    <View
      style={{
        alignItems: "center",
        position: "relative",
        left: -chartPadding * 4.5,
      }}
    >
      <BarChart
        data={data}
        width={screenWidth - chartPadding}
        height={250}
        fromZero
        showValuesOnTopOfBars
        chartConfig={chartConfig}
        style={{
          borderRadius: 12,
        }}
        withHorizontalLabels={false}
        yAxisLabel=""
        yAxisSuffix=""
        verticalLabelRotation={0}
      />
    </View>
  );
};

export default MyBarChart;
