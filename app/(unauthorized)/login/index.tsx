import { FirebaseError } from "firebase/app";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { HelperText } from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
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
    <ContainerView style={styles.container}>
      <AuthInput
        inputMode="email"
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
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
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
  },
});
