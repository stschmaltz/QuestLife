import React, { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";

import WizardController from "../../../src/components/ChallengeWizard/WizardController";
import { Context } from "../../../src/components/ChallengeWizard/WizardStateMachine";
import ContainerView from "../../../src/components/ContainerView";
import { useAuth } from "../../../src/context/AuthProvider";
import { Quest, QuestManager } from "../../../src/services/firestore/quests";
import { saveUserWizardOutput } from "../../../src/services/firestore/wizard-output";
import { OpenAIApi } from "../../../src/services/openai/gpt";

export default function NewQuest() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, loadingUser } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);

  const openAIApi = new OpenAIApi();
  const questManager = new QuestManager(); // Create an instance of QuestManager

  const handleWizardCompletion = useCallback(
    async (context: Context) => {
      setIsLoading(true);
      try {
        if (!user) {
          throw new Error("No user ID found");
        }

        console.log("calling gpt");
        const wizardOutput = await saveUserWizardOutput(context, user.uid);

        console.log("wizardOutput", wizardOutput);
        const generatedQuests: Quest[] =
          await openAIApi.sendPromptWithContext(context);
        console.log("generatedQuests", generatedQuests);

        await questManager.saveGeneratedQuests({
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
    [setQuests, openAIApi, questManager],
  );

  // Render function for loading state
  const renderLoading = () => <ActivityIndicator size="large" animating />;

  // Render function for generated quests
  const renderQuests = () => (
    <Card style={{ overflow: "scroll" }}>
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
      {isLoading || loadingUser ? (
        renderLoading()
      ) : quests.length === 0 ? (
        <WizardController onComplete={handleWizardCompletion} />
      ) : (
        renderQuests()
      )}
    </ContainerView>
  );
}
