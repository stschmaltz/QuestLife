import { useMachine } from "@xstate/react";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

import {
  budgets,
  categories,
  durations,
  interests,
  objectives,
} from "./WizardData";
import {
  Context,
  WizardEventTypes,
  wizardStateMachine,
} from "./WizardStateMachine";
import SummaryScreen from "./screens/SummaryScreen";
import WizardMultiToggleScreen from "./screens/WizardMultiToggleScreen";
import WizardScreen from "./screens/WizardScreen";
import ContainerView from "../ContainerView";

export interface WizardOptionObject {
  value: string;
  label: string;
}

interface Props {
  onComplete: (context: Context) => void;
}

const WizardController: React.FC<Props> = ({ onComplete }) => {
  const [state, send] = useMachine(wizardStateMachine);
  const context: Context = state.context;
  const router = useRouter();

  const createSelectHandler =
    (type: WizardEventTypes) => (value: WizardOptionObject) => {
      send({ type, value });
    };

  const handleSelectCategory = createSelectHandler("CHOOSE_CATEGORY");
  const handleSelectObjective = createSelectHandler("CHOOSE_OBJECTIVE");
  const handleSelectDuration = createSelectHandler("CHOOSE_DURATION");
  const handleSelectBudget = createSelectHandler("CHOOSE_BUDGET");

  const handleToggleInterest = (interest: WizardOptionObject) => {
    send({ type: "TOGGLE_INTEREST", interest });
  };

  const handleDoneSelectingInterests = () => {
    send("DONE_SELECTING_INTERESTS");
  };

  useEffect(() => {
    console.log("yeehaw", state.matches("completed"));
    if (state.matches("completed")) {
      console.log("giddy-up");
      send("RESET");
    }
  }, [state, send]);

  return (
    <ContainerView style={{ width: "100%" }}>
      {state.matches("selectCategory") && (
        <WizardScreen
          title="Who is doing this quest?"
          secondaryText="Choose your quest partner: flying solo, with a partner, a group of friends, or the whole family"
          options={categories}
          selectedOption={context.category}
          onSelect={handleSelectCategory}
          onBack={() => router.back()}
          screenIndex={1}
        />
      )}
      {state.matches("selectInterests") && (
        <WizardMultiToggleScreen
          title="What are your interests?"
          secondaryText="Your interests will influence which quests you receive, select none for a more randomized list."
          allOptions={interests}
          selectedOptions={context.interests}
          onToggleOption={handleToggleInterest}
          onDone={handleDoneSelectingInterests}
          onBack={() => send("BACK")}
        />
      )}
      {state.matches("selectObjective") && (
        <WizardScreen
          title="What is your goal?"
          secondaryText="Determine your quest goal: from networking and unwinding to physical and mental wizards."
          options={objectives}
          selectedOption={context.objective}
          onSelect={handleSelectObjective}
          onBack={() => send("BACK")}
          screenIndex={2}
        />
      )}
      {state.matches("selectDuration") && (
        <WizardScreen
          title="What length of quest are you looking for?"
          secondaryText="How long is your adventure? From instant thrills you can do now to a multi-day quests, you decide!."
          options={durations}
          selectedOption={context.duration}
          onSelect={handleSelectDuration}
          onBack={() => send("BACK")}
          screenIndex={2}
        />
      )}
      {state.matches("selectBudget") && (
        <WizardScreen
          title="What's your budget per quest?"
          secondaryText="Select a budget range: embark on free quests, spend a bit, or make a grand investment."
          options={budgets}
          selectedOption={context.budget}
          onSelect={handleSelectBudget}
          onBack={() => send("BACK")}
          screenIndex={3}
        />
      )}
      {state.matches("summary") && (
        <SummaryScreen
          context={context}
          onBack={() => send("BACK")}
          onConfirm={async () => {
            send("CONFIRM");
            await onComplete(context);
          }}
        />
      )}
    </ContainerView>
  );
};

export default WizardController;
