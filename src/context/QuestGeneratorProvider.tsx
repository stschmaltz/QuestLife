import React, { useCallback, useContext, useState } from "react";

import { useAuth } from "./AuthProvider";
import { Context } from "../components/ChallengeWizard/WizardStateMachine";
import { Quest } from "../services/firestore/quests/quest.types";
import { QuestManager } from "../services/firestore/quests/quests";
import { OpenAIApi } from "../services/openai/gpt";

type QuestGeneratorContextType = {
  generateQuests: (
    context: Context,
    userId: string,
    wizardOutputId: string,
  ) => Promise<Quest[]>;
  loadingQuests: boolean;
  generatedQuests: Quest[];
};

const QuestGeneratorContext = React.createContext<QuestGeneratorContextType>({
  generateQuests: async () => [],
  loadingQuests: true,
  generatedQuests: [],
});

export const useQuestGenerator = () =>
  useContext<QuestGeneratorContextType>(QuestGeneratorContext);

export function QuestGeneratorProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);
  const questManager = new QuestManager();
  const openAIApi = new OpenAIApi();

  const generateQuests = useCallback(
    async (context: Context, userId: string, wizardOutputId: string) => {
      setLoading(true);
      try {
        if (!user) {
          throw new Error("Not authenticated");
        }

        const generatedQuests: Quest[] =
          await openAIApi.sendPromptWithContext(context);

        await questManager.saveGeneratedQuests({
          uid: userId,
          wizardContextId: wizardOutputId,
          quests: generatedQuests,
        });

        setQuests(generatedQuests);

        return generatedQuests;
      } catch (error: any) {
        console.error("Error handling wizard completion:", error);

        console.error("Detailed Error:", error);
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
        console.error("Error Details:", error.details);
      } finally {
        setLoading(false);
      }

      return [];
    },
    [openAIApi, questManager, user],
  );

  return (
    <QuestGeneratorContext.Provider
      value={{
        loadingQuests: loading,
        generatedQuests: quests,
        generateQuests,
      }}
    >
      {children}
    </QuestGeneratorContext.Provider>
  );
}
