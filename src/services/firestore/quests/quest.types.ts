import { Timestamp } from "firebase/firestore";

export interface Quest {
  challengeTitle: string;
  challengeDescription: string;
  suggestedDuration: string;
  userRating?: 1 | 2 | 3 | 4 | 5;
  userComment?: string;
  completedOn?: Timestamp;
  unlocked?: boolean;
  hint?: string;
  createdAt?: Timestamp;
  initialIndex: number;
}

export interface QuestPackage {
  title: string;
  uid: string;
  wizardContextId: string;
  quests: Quest[];
  id: string;
  createdAt?: Timestamp;
}

export type CreateQuestPackageQuest = Omit<Quest, "initialIndex">;

export type CreateQuestPackage = Omit<
  QuestPackage,
  "id" | "title" | "quests"
> & {
  quests: CreateQuestPackageQuest[];
};
