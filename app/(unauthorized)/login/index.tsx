import { FirebaseError } from "firebase/app";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, HelperText } from "react-native-paper";

import AuthInput from "../../../src/components/AuthInput";
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
      <Button
        mode="contained"
        onPress={handleLogin}
        disabled={!email || !password}
      >
        Login
      </Button>
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
