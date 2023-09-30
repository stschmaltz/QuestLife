import { WizardOutput } from "./wizardOutput.types";
import { FirestoreDatabase } from "../firestoreDatabase";

class WizardDatabase extends FirestoreDatabase<WizardOutput> {
  constructor() {
    super("wizardContexts");
  }
}

export { WizardDatabase };
