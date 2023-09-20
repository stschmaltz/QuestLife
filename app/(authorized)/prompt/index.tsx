import React from "react";
import { StyleSheet, Text } from "react-native";

import ContainerView from "../../../src/components/ContainerView";
import ThemedButton from "../../../src/components/themed/ThemedButton";
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
    <ContainerView style={[styles.container]}>
      <ThemedButton
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
      </ThemedButton>
      {prompt.map((p) => (
        <Text key={p}>{p}</Text>
      ))}
      {isLoadingPrompt && <Text>Loading prompt...</Text>}
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
