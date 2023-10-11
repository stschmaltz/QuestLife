import { Stack } from "expo-router";
import React from "react";
import { Provider, MD3LightTheme as DefaultTheme } from "react-native-paper";

import { AuthProvider } from "../src/context/AuthProvider";
import { QuestGeneratorProvider } from "../src/context/QuestGeneratorProvider";
import { colors } from "../src/theme/theme";

export default function RootLayout() {
  const theme = {
    ...DefaultTheme,
    // Specify custom property
    custom: true,
    // Specify custom property in nested object
    colors,
  };

  return (
    <Provider theme={theme}>
      <AuthProvider>
        <QuestGeneratorProvider>
          <Stack>
            <Stack.Screen
              name="(authorized)"
              options={{
                title: "Authorized",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(unauthorized)"
              options={{
                title: "Unauthorized",
                headerShown: false,
              }}
            />
          </Stack>
        </QuestGeneratorProvider>
      </AuthProvider>
    </Provider>
  );
}
