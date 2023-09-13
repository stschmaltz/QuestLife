import "../../../firebase.config";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { useAuth } from "../../../src/context/AuthProvider";

export default function Home() {
  const { user } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: "green" }]}>
      <Text>
        {user ? `User is signed in as ${user?.email}` : "User is not signed in"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
