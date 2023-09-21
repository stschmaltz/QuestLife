import { Stack } from "expo-router";
import React from "react";
import { Provider, MD3LightTheme as DefaultTheme } from "react-native-paper";

import { AuthProvider } from "../src/context/AuthProvider";
import { OpenAIApiProvider } from "../src/context/OpenAIProvider";
import { OpenAIApi } from "../src/services/openai/gpt";
import { ThemeColors } from "../src/types/theme";
import { adjustColor } from "../src/utils/color-helpers";

const openAIInstance = new OpenAIApi();

const nightColor = "#071108";
const primaryColor = "#FFA07A";
const secondaryColor = "#B5D2AD";
const tertiaryColor = "#FDFD96";
const quaternaryColor = "#A7DBD8";

export const colors: ThemeColors = {
  primary: primaryColor,
  onPrimary: adjustColor(primaryColor, 30, "darken"),
  primaryContainer: adjustColor(primaryColor, 60, "lighten"),
  onPrimaryContainer: adjustColor(primaryColor, 60, "lighten"),
  backButton: adjustColor(nightColor, 80, "lighten"),

  secondary: secondaryColor,
  onSecondary: adjustColor(secondaryColor, 30, "darken"),
  secondaryContainer: adjustColor(secondaryColor, 60, "lighten"),
  onSecondaryContainer: adjustColor(secondaryColor, 60, "lighten"),

  tertiary: tertiaryColor,
  onTertiary: adjustColor(tertiaryColor, 30, "darken"),
  tertiaryContainer: adjustColor(tertiaryColor, 60, "lighten"),
  onTertiaryContainer: adjustColor(tertiaryColor, 60, "lighten"),

  quaternary: quaternaryColor,
  onQuaternary: adjustColor(quaternaryColor, 30, "darken"),
  quaternaryContainer: adjustColor(quaternaryColor, 60, "lighten"),
  onQuaternaryContainer: adjustColor(quaternaryColor, 60, "lighten"),

  lightText: "rgb(255, 255, 255)",
  darkText: nightColor,

  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 0, 2)",
  background: adjustColor(primaryColor, 90, "lighten"),
  onBackground: nightColor,
  surface: "rgb(255, 251, 255)",
  onSurface: nightColor,
  surfaceVariant: "rgb(244, 221, 220)",
  onSurfaceVariant: "rgb(83, 67, 66)",
  outline: nightColor,
  outlineVariant: "rgb(251, 238, 237))",
  shadow: nightColor,
  scrim: nightColor,
  inverseSurface: "rgb(54, 47, 46)",
  inverseOnSurface: "rgb(251, 238, 237)",
  inversePrimary: "rgb(255, 179, 176)",

  surfaceDisabled: "rgba(32, 26, 26, 0.12)",
  onSurfaceDisabled: "rgba(32, 26, 26, 0.38)",
  backdrop: "rgba(59, 45, 44, 0.4)",
  elevation: {
    level0: nightColor,
    level1: nightColor,
    level2: nightColor,
    level3: nightColor,
    level4: nightColor,
    level5: nightColor,
  },
};

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
