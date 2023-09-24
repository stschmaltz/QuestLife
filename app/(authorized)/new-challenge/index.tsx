import React, { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";

import WizardController from "../../../src/components/ChallengeWizard/WizardController";
import { Context } from "../../../src/components/ChallengeWizard/WizardStateMachine";
import ContainerView from "../../../src/components/ContainerView";
import { useAuth } from "../../../src/context/AuthProvider";
import {
  Quest,
  saveGeneratedQuests,
} from "../../../src/services/firestore/quests";
import { saveUserWizardOutput } from "../../../src/services/firestore/wizard-output";
import { OpenAIApi } from "../../../src/services/openai/gpt";

export default function NewChallenge() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);

  const openAIApi = new OpenAIApi();

  const handleWizardCompletion = useCallback(
    async (context: Context) => {
      setIsLoading(true);
      try {
        if (!user || user === "loading") {
          throw new Error("No user ID found");
        }

        console.log("calling gpt");
        const wizardOutput = await saveUserWizardOutput(context, user.uid);

        console.log("wizardOutput", wizardOutput);
        const generatedQuests: Quest[] =
          await openAIApi.sendPromptWithContext(context);
        console.log("generatedQuests", generatedQuests);

        await saveGeneratedQuests({
          uid: wizardOutput.uid,
          wizardContextId: wizardOutput.id,
          quests: generatedQuests,
        });
        setQuests(generatedQuests);
      } catch (error: any) {
        console.error("Error handling wizard completion:", error);

        console.error("Detailed Error:", error);
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
        console.error("Error Details:", error.details);
      } finally {
        setIsLoading(false);
      }
    },
    [setQuests, openAIApi],
  );

  // Render function for loading state
  const renderLoading = () => <Text>Loading...</Text>;

  // Render function for generated quests
  const renderQuests = () => (
    <Card style={{ backgroundColor: "#fff", overflow: "scroll" }}>
      <ScrollView>
        {quests?.map((quest, index) => (
          <>
            <Card.Title title={quest.challengeTitle} key={index} />
            <Card.Content>
              <Text>{quest.challengeDescription}</Text>
              <Text>{quest.suggestedDuration}</Text>
            </Card.Content>
          </>
        ))}
      </ScrollView>
    </Card>
  );

  return (
    <ContainerView style={{ alignItems: "center" }}>
      {isLoading ? (
        renderLoading()
      ) : quests.length === 0 ? (
        <WizardController onComplete={handleWizardCompletion} />
      ) : (
        renderQuests()
      )}
    </ContainerView>
  );
}
