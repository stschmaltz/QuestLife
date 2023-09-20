import { MD3Colors, MD3Theme } from "react-native-paper/lib/typescript/types";

export type ThemeColors = MD3Colors & {
  quaternary: string;
  onQuaternary: string;
  quaternaryContainer: string;
  onQuaternaryContainer: string;

  lightText: string;
  darkText: string;
};

export type CustomTheme = Omit<MD3Theme, "colors"> & { colors: ThemeColors };
