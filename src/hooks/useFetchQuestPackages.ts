import { User } from "firebase/auth";
import { useState, useEffect } from "react";

import { QuestPackage } from "../services/firestore/quests/quest.types";
import { QuestManager } from "../services/firestore/quests/quests";

const questManager = new QuestManager();

export const useFetchAllQuestPackages = (
  user: User | null | undefined,
): [QuestPackage[], boolean, Error | null] => {
  const [questPackages, setQuestPackages] = useState<QuestPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;
    if (error) return;

    const userId = user.uid;

    const fetchQuests = async () => {
      try {
        const allQuestPackages: QuestPackage[] =
          await questManager.getAllQuestPackages(userId);

        setQuestPackages(allQuestPackages);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err);

        console.error("Error fetching recent questPackages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, [user, error]);

  return [questPackages, loading, error];
};
