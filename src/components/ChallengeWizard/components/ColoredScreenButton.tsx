import React from "react";
import { ButtonProps, useTheme } from "react-native-paper";

import ScreenButton from "./ScreenButton";
import { CustomTheme } from "../../../types/theme";
import { adjustColor } from "../../../utils/color-helpers";

export type ValidColorMapIndexes = 0 | 1 | 2 | 3;

type ColoredButtonProps = ButtonProps & {
  index: number;
  toggled?: boolean;
};

const ColoredScreenButton: React.FC<ColoredButtonProps> = ({
  index,
  onPress,
  toggled = false,
  children,
}) => {
  const { colors } = useTheme<CustomTheme>();
  const colorMap: Record<ValidColorMapIndexes, string> = {
    0: colors.primary,
    1: colors.secondary,
    2: colors.tertiary,
    3: colors.quaternary,
  };

  const backgroundColor = colorMap[(index % 4) as ValidColorMapIndexes];

  return (
    <ScreenButton
      style={{
        borderColor: toggled ? colors.outlineVariant : colors.outline,
        backgroundColor: toggled
          ? adjustColor(backgroundColor, 40, "lighten")
          : backgroundColor,
      }}
      onPress={onPress}
    >
      {children}
    </ScreenButton>
  );
};

export default ColoredScreenButton;
