import { Stack } from "expo-router";
import { Provider, MD3LightTheme as DefaultTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthProvider } from "../src/context/AuthProvider";

export default function RootLayout() {
  const theme = {
    ...DefaultTheme,
    // Specify custom property
    custom: true,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      custom: "blue",
      background: "#eeeeee",
    },
  };

  return (
    <Provider theme={theme}>
      <AuthProvider>
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
      </AuthProvider>
    </Provider>
  );
}
