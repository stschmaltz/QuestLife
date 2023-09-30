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

  return {
    questPackage,
    unlockQuest,
    completeQuest,
  };
}

export default useQuestManager;
