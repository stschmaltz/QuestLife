import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

import ThemedTextInput from "../themed/ThemedTextInput";

interface AuthInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureText?: boolean;
}

export default function AuthInput({
  label,
  value,
  onChangeText,
  secureText = false,
}: AuthInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ThemedTextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      style={styles.input}
      autoCapitalize="none"
      right={
        secureText ? (
          <TextInput.Icon
            icon={isPasswordVisible ? "eye-off" : "eye"}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        ) : null
      }
      secureTextEntry={secureText && !isPasswordVisible}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});
