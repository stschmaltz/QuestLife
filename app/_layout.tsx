import { Stack } from "expo-router";
import { Provider, MD3LightTheme as DefaultTheme } from "react-native-paper";

import { AuthProvider } from "../src/context/AuthProvider";

export default function RootLayout() {
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

  return (
    <Provider theme={theme}>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              title: "Authorized",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="(unauthorized)/index"
            options={{
              title: "Unauthorized",
              headerShown: true,
            }}
          />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}
