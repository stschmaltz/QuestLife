import { Timestamp, collection, doc, setDoc } from "firebase/firestore";

import { firestore } from "../../../firebase.config";
import { Context } from "../../components/ChallengeWizard/WizardStateMachine";

type WizardOutput = {
  wizardContext: Context;
  uid: string;
  id: string;
  createdAt: Timestamp;
};

export const saveUserWizardOutput = async (
  wizardContext: Context,
  uid: string,
): Promise<WizardOutput> => {
  console.log("wizardContext", wizardContext, "uid", uid);

  const wizardContextsCollection = collection(firestore, "wizardContexts");
  const newContextDocRef = doc(wizardContextsCollection);

  await setDoc(newContextDocRef, {
    uid,
    category: wizardContext.category,
    interests: wizardContext.interests,
    objective: wizardContext.objective,
    duration: wizardContext.duration,
    budget: wizardContext.budget,
    id: newContextDocRef.id,
    createdAt: Timestamp.now(),
  });

  return {
    id: newContextDocRef.id,
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
};
