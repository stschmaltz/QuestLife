import React from "react";
import { ButtonProps } from "react-native-paper";

import ThemedButton from "../../themed/ThemedButton";

const ScreenButton: React.FC<ButtonProps> = ({
  onPress,
  children,
  ...props
}) => {
  return (
    <ThemedButton
      mode="contained"
      {...props}
      onPress={onPress}
      style={[
        {
          marginBottom: 15,
        },
        props.style,
      ]}
    >
      {children}
    </ThemedButton>
  );
};

export default ScreenButton;
