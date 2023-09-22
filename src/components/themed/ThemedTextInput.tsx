import React from "react";
import { TextInput, TextInputProps, useTheme } from "react-native-paper";

const ThemedTextInput: React.FC<TextInputProps> = (props) => {
  const theme = useTheme();

  return (
    <TextInput
      outlineStyle={{
        backgroundColor: theme.colors.surface,
        borderWidth: 2.7,
        borderColor: theme.colors.outline,
      }}
      {...props}
      style={[{}, props.style]}
    />
  );
};

export default ThemedTextInput;
