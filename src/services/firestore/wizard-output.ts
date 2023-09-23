// firestore/context.ts

import { doc, setDoc } from "firebase/firestore";

import { firestore } from "../../../firebase.config";
import { Context } from "../../components/ChallengeWizard/WizardStateMachine";

type WizardOutput = { wizardContext: Context; uid: string; id: string };

export const saveUserWizardOutput = async (
  wizardContext: Context,
  uid: string,
): Promise<WizardOutput> => {
  console.log("wizardContext", wizardContext, "uid", uid);

  const contextRef = doc(firestore, "wizardContexts", uid);

  await setDoc(contextRef, {
    uid,
    category: wizardContext.category,
    interests: wizardContext.interests,
    objective: wizardContext.objective,
    duration: wizardContext.duration,
    budget: wizardContext.budget,
    id: contextRef.id,
  });

  return {
    id: contextRef.id,
    uid,
    wizardContext: {
      category: wizardContext.category,
      interests: wizardContext.interests,
      objective: wizardContext.objective,
      duration: wizardContext.duration,
      budget: wizardContext.budget,
    },
  };
};
