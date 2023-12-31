import { MD3Colors, MD3Theme } from "react-native-paper/lib/typescript/types";

interface CustomColors {
  quaternary: string;
  onQuaternary: string;
  quaternaryContainer: string;
  onQuaternaryContainer: string;
  quinary: string;
  onQuinary: string;
  quinaryContainer: string;
  onQuinaryContainer: string;

  lightText: string;
  darkText: string;
  darkBackground: string;

  backButton: string;
}

export type ThemeColors = MD3Colors & CustomColors;

export type CustomTheme = Omit<MD3Theme, "colors"> & { colors: ThemeColors };
