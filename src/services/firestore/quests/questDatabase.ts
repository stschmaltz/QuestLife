import { QuestPackage } from "./quest.types";
import { FirestoreDatabase } from "../firestoreDatabase";

class QuestDatabase extends FirestoreDatabase<QuestPackage> {
  constructor() {
    super("questPackages");
  }

  async getRecent(userId: string, x: number): Promise<QuestPackage[]> {
    return this.findByField("uid", userId, x);
  }
}

export { QuestDatabase };
