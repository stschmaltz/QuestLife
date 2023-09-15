import { FirebaseError } from "firebase/app";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, HelperText } from "react-native-paper";

import AuthInput from "../../../src/components/AuthInput";
import { signUpWithEmail } from "../../../src/services/auth/auth";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await signUpWithEmail({ email, password });
    } catch (e: unknown) {
      console.error("Signup error:", e);
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
      <AuthInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureText
      />

      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
      <Button
        mode="contained"
        onPress={handleSignUp}
        disabled={!email || !password || !confirmPassword}
      >
        Sign Up
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
