import { User } from "firebase/auth";
import { useState, useEffect } from "react";

import { QuestPackage, QuestManager } from "../services/firestore/quests";

const questManager = new QuestManager();

export const useRecentQuestPackages = (
  user: User | null | undefined,
  count: number,
): [QuestPackage[], boolean, Error | null] => {
  const [quests, setQuests] = useState<QuestPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;
    if (error) return;

    const userId = user.uid;

    const fetchQuests = async () => {
      try {
        console.log("Fetching recent quests for user", userId);
        const recentQuests: QuestPackage[] = await questManager.getRecentQuests(
          userId,
          count,
        );
        console.log("Recent quests:", recentQuests);
        setQuests(recentQuests);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err);

        console.error("Error fetching recent quests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, [count, user, error]);

  return [quests, loading, error];
};
