import { Timestamp } from "firebase/firestore";

import { WizardOutput } from "./wizardOutput.types";
import { WizardDatabase } from "./wizardOutputDatabase";
import { Context } from "../../../components/ChallengeWizard/WizardStateMachine";

class WizardOutputManager {
  private db = new WizardDatabase();

  async saveUserWizardOutput(
    wizardContext: Context,
    uid: string,
  ): Promise<WizardOutput> {
    const newContextDocId = this.db.generateId();
    const newOutput: WizardOutput = {
      id: newContextDocId,
      uid,
      wizardContext: {
        category: wizardContext.category,
        interests: wizardContext.interests,
        objective: wizardContext.objective,
        duration: wizardContext.duration,
        budget: wizardContext.budget,
      },
      createdAt: Timestamp.now(),
    };

    await this.db.save(newOutput);

    return newOutput;
  }

  async findById(id: string): Promise<WizardOutput | null> {
    return this.db.findById(id);
  }
}

export { WizardOutputManager };
