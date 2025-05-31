import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNotification } from "@/context/NotificationContext";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const { notification, expoPushToken, error } = useNotification();
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  const [dummyState, setDummyState] = useState(0);

  if (error) {
    return <ThemedText>Error: {error.message}</ThemedText>;
  }

  useEffect(() => {
    if (isUpdatePending) {
      // Update has successfully downloaded; apply it now
      // Updates.reloadAsync();
      // setDummyState(dummyState + 1);
      // Alert.alert("Update downloaded and applied");

      dummyFunction();
    }
  }, [isUpdatePending]);

  const dummyFunction = async () => {
    try {
      await Updates.reloadAsync();
    } catch (e) {
      Alert.alert("Error");
    }

    // UNCOMMENT TO REPRODUCE EAS UPDATE ERROR
    // } finally {
    //   setDummyState(dummyState + 1);
    //   console.log("dummyFunction");
    // }
  };

  // If true, we show the button to download and run the update
  const showDownloadButton = isUpdateAvailable;

  // Show whether or not we are running embedded code or an update
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? "This app is running from built-in code"
    : "This app is running an update";
  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 10,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedText type="subtitle">Updates Demo 5</ThemedText>
        <ThemedText>{runTypeMessage}</ThemedText>
        <Button
          onPress={() => Updates.checkForUpdateAsync()}
          title="Check manually for updates"
        />
        {showDownloadButton ? (
          <Button
            onPress={() => Updates.fetchUpdateAsync()}
            title="Download and run update"
          />
        ) : null}
        <ThemedText type="subtitle" style={{ color: "red" }}>
          Your push token:
        </ThemedText>
        <ThemedText>{expoPushToken}</ThemedText>
        <ThemedText type="subtitle">Latest notification:</ThemedText>
        <ThemedText>{notification?.request.content.title}</ThemedText>
        <ThemedText>
          {JSON.stringify(notification?.request.content.data, null, 2)}
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    //   headerImage={
    //     <Image
    //       source={require("@/assets/images/partial-react-logo.png")}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit{" "}
    //       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
    //       to see changes. Press{" "}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({
    //           ios: "cmd + d",
    //           android: "cmd + m",
    //           web: "F12",
    //         })}
    //       </ThemedText>{" "}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       {`Tap the Explore tab to learn more about what's included in this starter app.`}
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       {`When you're ready, run `}
    //       <ThemedText type="defaultSemiBold">
    //         npm run reset-project
    //       </ThemedText>{" "}
    //       to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
    //       directory. This will move the current{" "}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
