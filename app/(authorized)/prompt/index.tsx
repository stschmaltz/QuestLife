import React from "react";
import { StyleSheet, Text } from "react-native";

import { Context } from "../../../src/components/ChallengeWizard/WizardStateMachine";
import ContainerView from "../../../src/components/ContainerView";
import ThemedButton from "../../../src/components/themed/ThemedButton";
import { useAuth } from "../../../src/context/AuthProvider";
import { useOpenAI } from "../../../src/context/OpenAIProvider";

export default function Home() {
  const { user } = useAuth();

  const [isLoadingPrompt, setIsLoadingPrompt] = React.useState(false);
  const [prompt, setPrompt] = React.useState<string[]>([]);
  const openAI = useOpenAI();

  const sampleContext: Context = {
    category: {
      value: "COUPLE",
      label: "Couple",
    },
    interests: [
      { value: "READING", label: "Reading" },
      { value: "MOVIES", label: "Movies" },
      { value: "VIDEO_GAMES", label: "Video Games" },
      { value: "WRITING", label: "Writing" },
      { value: "BOARD_GAMES", label: "Board Games" },
      { value: "PAINTING", label: "Painting" },
      { value: "COOKING", label: "Cooking" },
      { value: "CRAFTING", label: "Crafting" },
      { value: "BAKING", label: "Baking" },
      { value: "LISTENING_TO_MUSIC", label: "Listening to Music" },
    ],
    objective: {
      value: "TRY_SOMETHING_NEW",
      label: "Try Something New",
    },
    duration: {
      value: "SHORT_TERM",
      label: "Short-term",
    },
    budget: {
      value: "MEDIUM",
      label: "Low Budget",
    },
  };

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
          const responses = openAI
            ? await openAI?.sendPromptWithContext(sampleContext)
            : [];
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
