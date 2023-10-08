import React from "react";
import { ButtonProps, useTheme } from "react-native-paper";

import ScreenButton from "./ScreenButton";
import { CustomTheme } from "../../../theme/theme.types";
import { adjustColor } from "../../../utils/colorHelpers";

export type ValidColorMapIndexes = 0 | 1 | 2 | 3 | 4;

type ColoredButtonProps = ButtonProps & {
  index: number;
  toggled?: boolean;
};

const ColoredScreenButton: React.FC<ColoredButtonProps> = ({
  index,
  onPress,
  toggled = false,
  children,
  style,
}) => {
  const { colors } = useTheme<CustomTheme>();
  const colorMap: Record<ValidColorMapIndexes, string> = {
    0: colors.primary,
    1: colors.secondary,
    2: colors.tertiary,
    3: colors.quaternary,
    4: colors.quinary,
  };

  const backgroundColor = colorMap[(index % 5) as ValidColorMapIndexes];

  return (
    <ScreenButton
      style={[
        {
          borderColor: toggled ? colors.outlineVariant : colors.outline,
          backgroundColor: toggled
            ? adjustColor(backgroundColor, 40, "lighten")
            : backgroundColor,
        },

        style,
      ]}
      textColor={toggled ? colors.outlineVariant : colors.darkText}
      onPress={onPress}
    >
      {children}
    </ScreenButton>
  );
};

export default ColoredScreenButton;
