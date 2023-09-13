import { Link, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function UnauthorizedHome() {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button mode="contained" onPress={() => router.push("/login")}>
          Login
        </Button>
        <Button
          style={{ marginTop: 10 }}
          mode="contained"
          onPress={() => router.push("/sign-up")}
        >
          Sign Up
        </Button>
      </View>
    </>
  );
}
