import React, { useState } from "react";
import { TextInput } from "react-native-paper";

import ThemedTextInput from "../themed/ThemedTextInput";

interface AuthInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureText?: boolean;
  inputMode?: "text" | "email";
}

export default function AuthInput({
  label,
  value,
  onChangeText,
  secureText = false,
  inputMode = "text",
}: AuthInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ThemedTextInput
      inputMode={inputMode}
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      style={{
        marginBottom: 10,
      }}
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
