import { Stack } from "expo-router";
import React from "react";
import { Provider, MD3LightTheme as DefaultTheme } from "react-native-paper";

import { AuthProvider } from "../src/context/AuthProvider";
import { OpenAIApiProvider } from "../src/context/OpenAIProvider";
import { OpenAIApi } from "../src/services/openai/gpt";
const openAIInstance = new OpenAIApi();

function desaturate(color: string, amount: number) {
  const [r, g, b] = color
    .slice(1)
    .match(/.{2}/g)!
    .map((hex: string) => parseInt(hex, 16));
  const avg = (r + g + b) / 3;
  return `#${((1 - amount) * r + amount * avg).toString(16).padStart(2, "0")}${(
    (1 - amount) * g +
    amount * avg
  )
    .toString(16)
    .padStart(2, "0")}${((1 - amount) * b + amount * avg)
    .toString(16)
    .padStart(2, "0")}`;
}

export default function RootLayout() {
  const nightColor = "#071108";
  const theme = {
    ...DefaultTheme,
    // Specify custom property
    custom: true,
    // Specify custom property in nested object
    colors: {
      primary: "#FF6B6B",
      onPrimary: nightColor,
      primaryContainer: desaturate("#FF6B6B", 0.3),
      onPrimaryContainer: nightColor,

      secondary: "#90EE90",
      onSecondary: nightColor,
      secondaryContainer: desaturate("#90EE90", 0.3),
      onSecondaryContainer: nightColor,

      tertiary: "#FFDB58",
      onTertiary: nightColor,
      tertiaryContainer: desaturate("#FFDB58", 0.3),
      onTertiaryContainer: nightColor,

      quaternary: "#69D2E7",
      onQuaternary: "rgb(255, 255, 255)",
      quaternaryContainer: desaturate("#69D2E7", 0.3),
      onQuaternaryContainer: "rgb(0, 31, 37)",

      lightText: "rgb(255, 255, 255)",
      darkText: nightColor,

      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(255, 251, 255)",
      onBackground: nightColor,
      surface: "rgb(255, 251, 255)",
      onSurface: nightColor,
      surfaceVariant: "rgb(244, 221, 220)",
      onSurfaceVariant: "rgb(83, 67, 66)",
      outline: nightColor,
      outlineVariant: "rgb(215, 193, 192)",
      shadow: nightColor,
      scrim: nightColor,
      inverseSurface: "rgb(54, 47, 46)",
      inverseOnSurface: "rgb(251, 238, 237)",
      inversePrimary: "rgb(255, 179, 176)",

      surfaceDisabled: "rgba(32, 26, 26, 0.12)",
      onSurfaceDisabled: "rgba(32, 26, 26, 0.38)",
      backdrop: "rgba(59, 45, 44, 0.4)",
    },
  };

  return (
    <Provider theme={theme}>
      <AuthProvider>
        <OpenAIApiProvider openAIApi={openAIInstance}>
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
        </OpenAIApiProvider>
      </AuthProvider>
    </Provider>
  );
}
