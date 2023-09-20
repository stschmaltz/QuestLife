import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import ThemedButton from "../../../src/components/themed/ThemedButton";
import { useAuth } from "../../../src/context/AuthProvider";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user === "loading") {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: "#B1EDE8" }]}>
      <View style={{ height: 100, justifyContent: "flex-end" }}>
        <Text>
          {user
            ? `User is signed in as ${user?.email}`
            : "User is not signed in"}
        </Text>
      </View>
      <View style={{ height: 400, justifyContent: "center" }}>
        <ThemedButton
          mode="contained"
          onPress={() => router.push("/new-challenge")}
        >
          Start a challenge!
        </ThemedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
});
