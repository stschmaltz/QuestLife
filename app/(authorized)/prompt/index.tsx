import React from "react";
import { StyleSheet, Text } from "react-native";

import { Context } from "../../../src/components/ChallengeWizard/WizardStateMachine";
import ContainerView from "../../../src/components/ContainerView";
import ThemedButton from "../../../src/components/themed/ThemedButton";
import { useAuth } from "../../../src/context/AuthProvider";
import { useQuestGenerator } from "../../../src/context/QuestGeneratorProvider";
import { Quest } from "../../../src/services/firestore/quests/quest.types";

export default function Home() {
  const { user, loadingUser } = useAuth();

  const [isLoadingPrompt, setIsLoadingPrompt] = React.useState(false);
  const [prompt, setPrompt] = React.useState<Quest[]>([]);
  const { generateQuests } = useQuestGenerator();

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

  if (!user || loadingUser) {
    return null;
  }

  return (
    <ContainerView style={[styles.container]}>
      <ThemedButton
        mode="contained"
        onPress={async () => {
          setIsLoadingPrompt(true);
          setPrompt([]);
          const responses = generateQuests
            ? await generateQuests(
                sampleContext,
                user.uid,
                "ManualWizardOutputId",
              )
            : [];
          setPrompt(responses);
          setIsLoadingPrompt(false);
        }}
      >
        Send Prompt
      </ThemedButton>
      {prompt.map((p) => (
        <>
          <Text key={p.challengeTitle}>{p.challengeTitle}</Text>
          <Text key={p.challengeDescription}>{p.challengeDescription}</Text>
          <Text key={p.suggestedDuration}>{p.suggestedDuration}</Text>
        </>
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
