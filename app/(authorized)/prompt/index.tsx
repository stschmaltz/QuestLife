import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

import { useAuth } from "../../../src/context/AuthProvider";
import { useOpenAI } from "../../../src/context/OpenAIProvider";

export default function Home() {
  const { user } = useAuth();

  const [isLoadingPrompt, setIsLoadingPrompt] = React.useState(false);
  const [prompt, setPrompt] = React.useState<string[]>([]);
  const openai = useOpenAI();

  if (!user || user === "loading") {
    return null;
  }

  return (
    <View style={[styles.container]}>
      <Button
        mode="contained"
        onPress={async () => {
          setIsLoadingPrompt(true);
          setPrompt([]);
          const responses = openai ? await openai?.sendPrompt() : [];
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