import React, { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";

import WizardController from "../../../src/components/ChallengeWizard/WizardController";
import { Context } from "../../../src/components/ChallengeWizard/WizardStateMachine";
import ContainerView from "../../../src/components/ContainerView";
import { useAuth } from "../../../src/context/AuthProvider";
import {
  QuestGeneratorProvider,
  useQuestGenerator,
} from "../../../src/context/QuestGeneratorProvider";
import { QuestManager } from "../../../src/services/firestore/quests/quests";
import { WizardOutputManager } from "../../../src/services/firestore/wizardOutput/wizardOutput";

export default function NewQuest() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, loadingUser } = useAuth();
  const { generatedQuests, loadingQuests, generateQuests } =
    useQuestGenerator();

  const questManager = new QuestManager();
  const wizardOutputManager = new WizardOutputManager();

  const handleWizardCompletion = useCallback(
    async (context: Context) => {
      setIsLoading(true);
      try {
        if (!user) {
          throw new Error("No user ID found");
        }

        const wizardOutput = await wizardOutputManager.saveUserWizardOutput(
          context,
          user.uid,
        );

        await generateQuests(context, wizardOutput.uid, wizardOutput.id);
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
    [questManager],
  );

  // Render function for loading state
  const renderLoading = () => <ActivityIndicator size="large" animating />;

  // Render function for generated quests
  const renderQuests = () => (
    <Card style={{ overflow: "scroll" }}>
      <ScrollView>
        {generatedQuests?.map((quest, index) => (
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
    <QuestGeneratorProvider>
      <ContainerView style={{ alignItems: "center" }}>
        {isLoading || loadingUser || loadingQuests ? (
          renderLoading()
        ) : generatedQuests?.length === 0 ? (
          <WizardController onComplete={handleWizardCompletion} />
        ) : (
          renderQuests()
        )}
      </ContainerView>
    </QuestGeneratorProvider>
  );
}
