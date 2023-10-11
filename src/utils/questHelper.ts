import { QuestPackage } from "../services/firestore/quests/quest.types";

const getCompletedQuests = (questPackage: QuestPackage) =>
  questPackage.quests.filter((quest) => !!quest.completedOn);

export { getCompletedQuests };
