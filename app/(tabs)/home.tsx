import "../../firebase.config";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";

import { useAuth } from "../../src/context/AuthProvider";

export default function Home() {
  const theme = useTheme();
  const { user } = useAuth();
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    setValue({
      ...value,
      error: "",
    });
  }

  return (
    <View style={[styles.container, { backgroundColor: "green" }]}>
      <Text>
        {user ? "User is signed in as ${user?.email}" : "User is not signed in"}
      </Text>
      <Link href="/login">Login</Link>

      <StatusBar style="auto" />
      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}
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

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});
