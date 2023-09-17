import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

import { useAuth } from "../../../src/context/AuthProvider";
import { sendPrompt } from "../../../src/services/openai/gpt";

export default function Home() {
  const { user } = useAuth();

  const [isLoadingPrompt, setIsLoadingPrompt] = React.useState(false);
  const [prompt, setPrompt] = React.useState([]);

  if (!user || user === "loading") {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: "green" }]}>
      <Text>
        {user ? `User is signed in as ${user?.email}` : "User is not signed in"}
      </Text>
      <Button
        onPress={async () => {
          setIsLoadingPrompt(true);
          const responses = await sendPrompt();
          setPrompt(responses);
          setIsLoadingPrompt(false);
        }}
      >
        Send Prompt
      </Button>
      {prompt.map((p) => (
        <Text key={p}>{p}</Text>
      ))}
      {isLoadingPrompt && <Text>Loading prompt...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
