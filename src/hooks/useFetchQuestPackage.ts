import { useState, useEffect } from "react";

import {
  Quest,
  QuestManager,
  QuestPackage,
} from "../services/firestore/quests";

function useFetchQuest(id: string | undefined) {
  const [questPackage, setQuestPackage] = useState<QuestPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuest = async () => {
      const questManager = new QuestManager();

      if (!id) {
        return;
      }

      try {
        const fetchedQuest = await questManager.findById(id);
        if (fetchedQuest) {
          setQuestPackage(fetchedQuest);
        } else {
          setError("Quest not found");
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        console.log("Error fetching questPackage:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuest();
  }, [id]);

  return { questPackage, loading, error };
}

export default useFetchQuest;
