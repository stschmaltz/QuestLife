import { FirebaseError } from "firebase/app";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { HelperText } from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
import AuthInput from "../../../src/components/auth/AuthInput";
import ThemedButton from "../../../src/components/themed/ThemedButton";
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
    <ContainerView style={styles.container}>
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
      <ThemedButton
        mode="contained"
        onPress={handleSignUp}
        disabled={!email || !password || !confirmPassword}
      >
        Sign Up
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
