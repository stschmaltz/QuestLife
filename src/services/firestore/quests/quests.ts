import { Timestamp } from "firebase/firestore";

import {
  CreateQuestPackage,
  Quest,
  QuestPackage,
  UserRatingOptions,
} from "./quest.types";
import { QuestDatabase } from "./questDatabase";

class QuestManager {
  private db = new QuestDatabase();

  async saveGeneratedQuests(data: CreateQuestPackage): Promise<QuestPackage> {
    console.log("quests", data.quests, "uid", data.uid);

    if (!data.quests?.length) {
      throw new Error("No quests generated");
    }

    const newDocId = this.db.generateId();

    const now = Timestamp.now();
    const newDoc: QuestPackage = {
      title: "Generated Quests",
      uid: data.uid,
      wizardContextId: data.wizardContextId,
      id: newDocId,
      createdAt: now,
      quests: data.quests.map((quest, index) => ({
        unlocked: false,
        createdAt: now,
        initialIndex: index,
        ...quest,
      })),
    };

    await this.db.save(newDoc);

    return newDoc;
  }

  async getRecentQuests(userId: string, x: number): Promise<QuestPackage[]> {
    return this.db.getRecent(userId, x);
  }

  async findById(id: string): Promise<QuestPackage | null> {
    return this.db.findById(id);
  }

  async updateQuest(
    questPackageId: string,
    questIndex: number,
    updateFunction: (quest: Quest) => Quest,
  ): Promise<QuestPackage | null> {
    const questPackageData = await this.db.findById(questPackageId);

    if (!questPackageData) {
      console.log("Document does not exist");
      return null;
    }

    const newQuests = questPackageData.quests.map((quest) => {
      if (quest.initialIndex === questIndex) {
        return updateFunction(quest);
      }
      return quest;
    });

    const newQuestPackage: QuestPackage = {
      ...questPackageData,
      quests: newQuests,
    };

    await this.db.update(questPackageId, newQuestPackage);

    return newQuestPackage;
  }

  async unlockQuest(
    questPackageId: string,
    questIndex: number,
  ): Promise<QuestPackage> {
    console.log("unlocking quest", questIndex);

    const quest = await this.updateQuest(
      questPackageId,
      questIndex,
      (quest) => ({
        ...quest,
        unlocked: true,
      }),
    );

    if (!quest) {
      throw new Error("Quest not found");
    }

    return quest;
  }

  async completeQuest(
    questPackageId: string,
    questIndex: number,
  ): Promise<QuestPackage> {
    const quest = await this.updateQuest(
      questPackageId,
      questIndex,
      (quest) => ({
        ...quest,
        completedOn: Timestamp.now(),
      }),
    );

    if (!quest) {
      throw new Error("Quest not found");
    }

    return quest;
  }

  async addUserFeedbackToQuest(
    questPackageId: string,
    questIndex: number,
    userRating: UserRatingOptions,
    userComment: string,
  ): Promise<QuestPackage | null> {
    return this.updateQuest(questPackageId, questIndex, (quest) => ({
      ...quest,
      userRating,
      userComment,
    }));
  }
}

export { QuestManager };
