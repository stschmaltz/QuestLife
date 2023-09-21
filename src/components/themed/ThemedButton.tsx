import React from "react";
import { Button, ButtonProps, useTheme } from "react-native-paper";

import { CustomTheme } from "../../types/theme";

const ThemedButton: React.FC<ButtonProps> = (props) => {
  const { colors } = useTheme<CustomTheme>();

  const { mode } = props;

  const customTheme =
    mode === "contained"
      ? {
          borderWidth: 3,
          borderColor: colors.outline,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 5,
        }
      : {};

  const textColor = mode === "contained" ? "#071108" : "#071108";

  return (
    <Button
      textColor={textColor}
      labelStyle={{ fontWeight: "bold" }}
      {...props}
      style={[customTheme, props.style]}
    />
  );
};

export default ThemedButton;
