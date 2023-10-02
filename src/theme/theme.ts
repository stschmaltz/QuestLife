import { ThemeColors } from "./theme.types";
import { adjustColor } from "../utils/colorHelpers";

const nightColor = "#071108";
const primaryColor = "#FFA07A";
const secondaryColor = "#BAFCA2";
const tertiaryColor = adjustColor("#FDFD96", 5, "darken");
const quaternaryColor = "#A7DBD8";
const quinaryColor = adjustColor("#C4A1FF", 30, "lighten");

const colors: ThemeColors = {
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

  quinary: quinaryColor,
  onQuinary: adjustColor(quinaryColor, 30, "darken"),
  quinaryContainer: adjustColor(quinaryColor, 60, "lighten"),
  onQuinaryContainer: adjustColor(quinaryColor, 60, "lighten"),

  lightText: "rgb(255, 255, 255)",
  darkText: nightColor,
  darkBackground: nightColor,

  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 0, 2)",
  background: adjustColor(quaternaryColor, 70, "lighten"),
  onBackground: "rgb(244, 221, 220)",
  surface: "rgb(255, 251, 255)",
  onSurface: nightColor,
  surfaceVariant: "rgb(244, 221, 220)",
  onSurfaceVariant: "rgb(83, 67, 66)",
  outline: nightColor,
  outlineVariant: adjustColor(nightColor, 60, "lighten"),
  shadow: nightColor,
  scrim: nightColor,
  inverseSurface: "rgb(54, 47, 46)",
  inverseOnSurface: "rgb(251, 238, 237)",
  inversePrimary: "rgb(255, 179, 176)",

  surfaceDisabled: "rgba(32, 26, 26, 0.12)",
  onSurfaceDisabled: "rgba(32, 26, 26, 0.38)",
  backdrop: "rgba(59, 45, 44, 0.4)",
  elevation: {
    level0: "rgb(255, 251, 255)",
    level1: "rgb(255, 251, 255)",
    level2: "rgb(255, 251, 255)",
    level3: "rgb(255, 251, 255)",
    level4: "rgb(255, 251, 255)",
    level5: "rgb(255, 251, 255)",
  },
};

export { colors };
