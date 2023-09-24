import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { firestore } from "../../../firebase.config";

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
}

export interface QuestPackage {
  title: string;
  uid: string;
  wizardContextId: string;
  quests: Quest[];
  id: string;
  createdAt?: Timestamp;
}

type CreateQuestPackage = Omit<QuestPackage, "id" | "title">;

class QuestManager {
  private questRef = collection(firestore, "questPackages");

  async saveGeneratedQuests(data: CreateQuestPackage): Promise<Quest[]> {
    console.log("quests", data.quests, "uid", data.uid);

    if (!data.quests.length) {
      throw new Error("No quests generated");
    }

    const newDocRef = doc(this.questRef);

    const now = Timestamp.now();
    const newDoc: QuestPackage = {
      title: newDocRef.id,
      uid: data.uid,
      wizardContextId: data.wizardContextId,
      id: newDocRef.id,
      createdAt: now,
      quests: data.quests.map((quest) => ({
        unlocked: false,
        createdAt: now,
        ...quest,
      })),
    };

    await setDoc(newDocRef, newDoc);

    return data.quests;
  }

  async getRecentQuests(userId: string, x: number): Promise<QuestPackage[]> {
    try {
      const queryRef = query(
        this.questRef,
        where("uid", "==", userId),
        orderBy("createdAt", "desc"),
        limit(x),
      );
      const result = await getDocs(queryRef);
      console.log(result.docs);

      return result.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        quests: doc.data().quests.map((quest: Quest) => ({
          challengeTitle: quest.challengeTitle,
          challengeDescription: quest.challengeDescription,
          suggestedDuration: quest.suggestedDuration,
          userRating: quest.userRating,
          userComment: quest.userComment,
          completedOn: quest.completedOn,
          unlocked: quest.unlocked,
          hint: quest.hint,
          createdAt: quest.createdAt,
        })),
        createdAt: doc.data().createdAt,
        uid: doc.data().uid,
        wizardContextId: doc.data().wizardContextId,
      }));
    } catch (error) {
      console.error("Error fetching recent quests:", error);
      return [];
    }
  }

  async findById(id: string): Promise<QuestPackage | null> {
    try {
      const questDocument = await getDoc(doc(this.questRef, id));

      if (questDocument.exists()) {
        const questPackageData: QuestPackage =
          questDocument.data() as QuestPackage;
        return {
          id: questDocument.id,
          quests: questPackageData.quests.map((quest: Quest) => ({
            challengeTitle: quest.challengeTitle,
            challengeDescription: quest.challengeDescription,
            suggestedDuration: quest.suggestedDuration,
            userRating: quest.userRating,
            userComment: quest.userComment,
            completedOn: quest.completedOn,
            unlocked: quest.unlocked,
            hint: quest.hint,
            createdAt: quest.createdAt,
          })),
          title: questPackageData.title,
          uid: questPackageData.uid,
          wizardContextId: questPackageData.wizardContextId,
          createdAt: questPackageData.createdAt,
        };
      }
    } catch (error) {
      console.error("Error fetching quest by ID:", error);
    }

    return null;
  }
}

export { QuestManager };
