import MyBarChart from "@/components/BarChart";
import { useNotification } from "@/context/NotificationContext";
import { LinearGradient } from "expo-linear-gradient";
import * as Updates from "expo-updates";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function HomeScreen() {
  const { notification, expoPushToken, error } = useNotification();
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [currentIntake, setCurrentIntake] = useState(1300);
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [intakeLogs, setIntakeLogs] = useState<
    { amount: number; time: string }[]
  >([]);

  const dailyGoal = 3000;
  const progress = currentIntake / dailyGoal;

  useEffect(() => {
    if (isUpdatePending) {
      dummyFunction();
    }
  }, [isUpdatePending]);

  const dummyFunction = async () => {
    try {
      await Updates.reloadAsync();
    } catch (e) {
      Alert.alert("Update Error", "Failed to apply update.");
    }
  };

  const handleLogIntake = () => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setCurrentIntake((prev) => {
      const newTotal = prev + selectedAmount;
      // Alert.alert("Water Logged", `Added ${selectedAmount}ml of water!`);
      return newTotal > dailyGoal ? dailyGoal : newTotal;
    });

    setIntakeLogs((logs) => [
      ...logs,
      { amount: selectedAmount, time: timestamp },
    ]);
  };

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Last 7 Days</Text>
        <View style={styles.chartWrapper}>
          <MyBarChart />
        </View>

        <LinearGradient
          colors={["rgba(200,200,200,0)", "#888", "rgba(200,200,200,0)"]}
          style={styles.divider}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <View style={styles.todayContainer}>
          <Text style={styles.todayLabel}>Today's Water Intake</Text>
          <Text style={styles.todayValue}>
            {(currentIntake / 1000).toFixed(2)}{" "}
            <Text style={styles.unitText}>litres</Text>
          </Text>

          <View
            style={{
              height: 10,
              width: "100%",
              backgroundColor: isDark ? "#333" : "#ccc",
              borderRadius: 5,
              marginTop: 12,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${Math.min(progress * 100, 100)}%`,
                backgroundColor: isDark ? "#00e5ff" : "#007aff",
              }}
            />
          </View>

          <Text style={styles.goalText}>
            {currentIntake} / {dailyGoal} ml
          </Text>
        </View>

        {/* <TouchableOpacity onPress={handleLogIntake} style={styles.iconButton}>
          <FontAwesome6 name="plus" size={28} color="white" />
        </TouchableOpacity> */}

        <View style={styles.amountSelector}>
          {[200, 250, 300].map((amount) => (
            <Text
              key={amount}
              style={[
                styles.amountOption,
                selectedAmount === amount && styles.selectedOption,
              ]}
              onPress={() => {
                setSelectedAmount(amount);
                handleLogIntake();
              }}
            >
              {amount}ml
            </Text>
          ))}
        </View>

        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>Water Log Timeline</Text>
          {intakeLogs.map((log, index) => (
            <Text key={index} style={styles.timelineItem}>
              💧 {log.amount}ml at {log.time}
            </Text>
          ))}
        </View>

        <Text style={styles.motivationText}>Keep it up! Stay hydrated 💧</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? "#121212" : "#ffffff",
    },
    container: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
    },
    chartWrapper: {
      backgroundColor: isDark ? "#1e1e1e" : "#f2f2f2",
      borderRadius: 12,
      padding: 12,
      height: 250,
      overflow: "hidden",
      marginBottom: 16,
    },
    divider: {
      height: 2,
      marginVertical: 16,
    },
    todayContainer: {
      backgroundColor: isDark ? "#1f1f1f" : "#f2f2f2",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    todayLabel: {
      fontSize: 18,
      color: isDark ? "#ccc" : "#333",
      marginBottom: 8,
    },
    todayValue: {
      fontSize: 36,
      fontWeight: "bold",
      color: isDark ? "#4FC3F7" : "#007aff",
    },
    unitText: {
      fontSize: 14,
      color: isDark ? "#bbb" : "#555",
    },
    goalText: {
      marginTop: 6,
      color: isDark ? "#aaa" : "#444",
      fontSize: 12,
    },
    progressBar: {
      width: "100%",
      height: 10,
      borderRadius: 4,
      marginTop: 10,
      backgroundColor: isDark ? "#333" : "#ccc",
    },
    logButton: {
      marginTop: 24,
      marginBottom: 8,
      alignSelf: "center",
      width: "60%",
    },
    motivationText: {
      fontSize: 16,
      textAlign: "center",
      color: isDark ? "#aaa" : "#666",
      marginTop: 24,
    },
    amountSelector: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 24,
      padding: 8,
    },
    amountOption: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: "#ccc",
      color: "#000",
    },
    selectedOption: {
      backgroundColor: "#4FC3F7",
      color: "#fff",
      fontWeight: "bold",
    },
    iconButton: {
      backgroundColor: "#4FC3F7",
      borderRadius: 50,
      padding: 16,
      alignSelf: "center",
      marginTop: 10,
    },
    timelineContainer: {
      marginTop: 32,
      padding: 16,
      backgroundColor: isDark ? "#1e1e1e" : "#eee",
      borderRadius: 10,
    },
    timelineTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 10,
      color: isDark ? "#fff" : "#000",
    },
    timelineItem: {
      fontSize: 14,
      color: isDark ? "#ccc" : "#333",
      marginBottom: 12,
    },
  });
