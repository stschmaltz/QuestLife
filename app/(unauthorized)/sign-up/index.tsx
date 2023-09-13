import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();

  const handleSignUp = async () => {
    // Handle sign up logic here
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Else, continue with the sign-up process
    console.log("Signing up with:", email, password);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optionally, you could navigate the user to a welcome or home screen here.
    } catch (e: unknown | FirebaseError) {
      console.error("Signup error:", e);
      if (e instanceof FirebaseError) {
        setError(e.message);
        alert(e.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
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
  input: {
    marginBottom: 10,
  },
});
