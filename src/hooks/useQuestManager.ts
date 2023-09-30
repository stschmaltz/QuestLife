import { useState, useCallback } from "react";

import { QuestPackage } from "../services/firestore/quests/quest.types";
import { QuestManager } from "../services/firestore/quests/quests";

function useQuestManager(questPackageId: string) {
  const [questPackage, setQuestPackage] = useState<QuestPackage | null>(null);
  const questManager = new QuestManager();

  const unlockQuest = useCallback(
    async (questIndex: number) => {
      const updatedQuestPackage = await questManager.unlockQuest(
        questPackageId,
        questIndex,
      );

      setQuestPackage(updatedQuestPackage);
    },
    [questPackageId],
  );

  const completeQuest = useCallback(
    async (questIndex: number) => {
      const updatedQuestPackage = await questManager.completeQuest(
        questPackageId,
        questIndex,
      );
      setQuestPackage(updatedQuestPackage);
    },
    [questPackageId],
  );

  const addUserFeedbackToQuest = useCallback(
    async (
      questIndex: number,
      userRating: 1 | 2 | 3 | 4 | 5,
      userComment: string,
    ) => {
      const updatedQuestPackage = await questManager.addUserFeedbackToQuest(
        questPackageId,
        questIndex,
        userRating,
        userComment,
      );
      setQuestPackage(updatedQuestPackage);
    },
    [questPackageId],
  );

  return {
    questPackage,
    unlockQuest,
    completeQuest,
    addUserFeedbackToQuest,
  };
}

export default useQuestManager;
