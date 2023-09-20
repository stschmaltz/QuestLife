import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

import ContainerView from "../../src/components/ContainerView";
import ThemedButton from "../../src/components/themed/ThemedButton";

export default function UnauthorizedHome() {
  return (
    <>
      <ContainerView style={{ alignItems: "center", justifyContent: "center" }}>
        <ThemedButton mode="contained" onPress={() => router.push("/login")}>
          Login
        </ThemedButton>
        <ThemedButton
          style={{ marginTop: 10 }}
          mode="contained"
          onPress={() => router.push("/sign-up")}
        >
          Sign Up
        </ThemedButton>
      </ContainerView>
    </>
  );
}
