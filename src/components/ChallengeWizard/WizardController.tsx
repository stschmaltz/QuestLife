import { useMachine } from "@xstate/react";
import { useRouter } from "expo-router";
import React from "react";

import { challengeStateMachine } from "./ChallengeStateMachine";
import WizardScreen from "./components/WizardScreen";
import InterestsScreen from "./screens/InterestsScreen";
import SummaryScreen from "./screens/SummaryScreen";
import ContainerView from "../ContainerView";

export interface WizardOptionObject {
  value: string;
  label: string;
}

export default function WizardController() {
  const [state, send] = useMachine(challengeStateMachine);
  const router = useRouter();

  const frequencies: WizardOptionObject[] = [
    { value: "DAILY", label: "Daily" },
    { value: "WEEKLY", label: "Weekly" },
    { value: "MONTHLY", label: "Monthly" },
  ];
  const handleSelectFrequency = (value: string) => {
    send({ type: "CHOOSE_FREQUENCY", value });
  };

  const types: WizardOptionObject[] = [
    { value: "SOLO", label: "Solo" },
    { value: "COUPLES", label: "Couples" },
    { value: "FRIENDS", label: "Friends" },
  ];
  const handleSelectType = (value: string) => {
    send({ type: "CHOOSE_TYPE", value });
  };

  const budgets: WizardOptionObject[] = [
    { value: "LOW", label: "Free Only" },
    { value: "MEDIUM", label: "$0-$50" },
    { value: "HIGH", label: "$0-$200" },
  ];
  const handleSelectBudget = (value: string) => {
    send({ type: "CHOOSE_BUDGET", value });
  };

  console.log("WOOOOOO", {
    value: state.value,
    context: state.context,
    events: state.events,
    state,
  });

  return (
    <ContainerView style={{ width: "100%" }}>
      {state.matches("selectFrequency") && (
        <WizardScreen
          title="How often do you want to do challenges?"
          options={frequencies}
          selectedOption={state.context.frequency}
          onSelect={handleSelectFrequency}
          onBack={() => router.back()}
          screenIndex={1}
        />
      )}
      {state.matches("selectType") && (
        <WizardScreen
          title="Who do you want to do challenges with?"
          options={types}
          selectedOption={state.context.type}
          onSelect={handleSelectType}
          onBack={() => send("BACK")}
          screenIndex={2}
        />
      )}
      {state.matches("selectInterests") && (
        <InterestsScreen
          interests={state.context.interests}
          onSelectInterest={(interest) =>
            send({ type: "TOGGLE_INTEREST", interest })
          }
          onBack={() => send("BACK")}
          onDone={() => send("DONE_SELECTING_INTERESTS")}
        />
      )}
      {state.matches("selectBudget") && (
        <WizardScreen
          title="What's your budget per challenge?"
          options={budgets}
          selectedOption={state.context.budget}
          onSelect={handleSelectBudget}
          onBack={() => send("BACK")}
          screenIndex={3}
        />
      )}
      {state.matches("summary") && (
        <SummaryScreen context={state.context} onBack={() => send("BACK")} />
      )}
    </ContainerView>
  );
}
