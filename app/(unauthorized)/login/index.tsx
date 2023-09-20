import { FirebaseError } from "firebase/app";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { HelperText } from "react-native-paper";

import AuthInput from "../../../src/components/auth/AuthInput";
import ThemedButton from "../../../src/components/themed/ThemedButton";
import { signInWithEmail } from "../../../src/services/auth/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    try {
      await signInWithEmail({ email, password });
    } catch (e: unknown) {
      console.error("Login error:", e);
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <AuthInput label="Email" value={email} onChangeText={setEmail} />
      <AuthInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureText
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
      <ThemedButton
        mode="contained"
        onPress={handleLogin}
        disabled={!email || !password}
      >
        Login
      </ThemedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
});
