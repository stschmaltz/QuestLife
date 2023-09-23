// firestore/quests.ts

import { doc, setDoc } from "firebase/firestore";

import { firestore } from "../../../firebase.config";

export interface Quest {
  /**
   * A brief and captivating title for the quest.
   */
  challengeTitle: string;

  /**
   * A detailed description elaborating on what the quest entails.
   */
  challengeDescription: string;

  /**
   * An estimated time for how long the quest might take.
   * This can be a range (e.g., "20-30 minutes") or a specific duration (e.g., "1 hour").
   */
  suggestedDuration: string;
}

export interface QuestCollection {
  uid: string;
  quests: Quest[];
}

export const saveGeneratedQuests = async (
  data: QuestCollection,
): Promise<Quest[]> => {
  console.log("quests", data.quests, "uid", data.uid);

  const challengeRef = doc(firestore, "quests", data.uid);
  await setDoc(challengeRef, { challenges: data.quests });

  return data.quests;
};
