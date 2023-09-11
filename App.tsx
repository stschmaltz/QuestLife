import "./firebase.config";
import { Provider, MD3LightTheme as DefaultTheme } from "react-native-paper";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { useAuthentication } from "./src/hooks/useAuthentication";

export default function App() {
  const theme = {
    ...DefaultTheme,
    // Specify custom property
    custom: true,
    ...DefaultTheme.colors,
    // Specify custom property in nested object
    colors: {
      custom: "blue",
      background: "#eeeeee",
    },
  };
  
  const { user } = useAuthentication();
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
    <Provider theme={theme}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text>
          {user
            ? "User is signed in as ${user?.email}"
            : "User is not signed in"}
        </Text>

        <StatusBar style="auto" />
        {!!value.error && (
          <View style={styles.error}>
            <Text>{value.error}</Text>
          </View>
        )}
      </View>
    </Provider>
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
