import { useRouter } from "expo-router";
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user, loadingUser } = useAuth();
  const { loadingQuests, generateQuests } = useQuestGenerator();

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
        setIsLoading(false);
        router.push("/home");
      } catch (error: any) {
        console.error("Error handling wizard completion:", error);

        console.error("Detailed Error:", error);
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
        console.error("Error Details:", error.details);
        setIsLoading(false);
      } finally {
      }
    },
    [questManager],
  );

  const renderLoading = () => <ActivityIndicator size="large" animating />;

  return (
    <QuestGeneratorProvider>
      <ContainerView style={{ alignItems: "center" }}>
        {isLoading || loadingUser || loadingQuests ? (
          renderLoading()
        ) : (
          <WizardController onComplete={handleWizardCompletion} />
        )}
      </ContainerView>
    </QuestGeneratorProvider>
  );
}
