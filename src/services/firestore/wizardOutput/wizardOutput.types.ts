import { Timestamp } from "firebase/firestore";

import { Context } from "../../../components/ChallengeWizard/WizardStateMachine";

export type WizardOutput = {
  wizardContext: Context;
  uid: string;
  id: string;
  createdAt: Timestamp;
};
