import { useMachine } from "@xstate/react";
import React from "react";
import { View } from "react-native";

import { challengeStateMachine } from "./ChallengeStateMachine";
import BudgetScreen from "./screens/BudgetScreen";
import FrequencyScreen from "./screens/FrequencyScreen";
import InterestsScreen from "./screens/InterestsScreen";
import { SummaryScreen } from "./screens/SummaryScreen";
import TypeScreen from "./screens/TypeScreen";

export default function WizardController() {
  const [state, send] = useMachine(challengeStateMachine);

  const handleSelectFrequency = (value: "DAILY" | "WEEKLY" | "MONTHLY") => {
    send({ type: "CHOOSE_FREQUENCY", value });
  };

  const handleSelectType = (value: "SOLO" | "COUPLES" | "FRIENDS") => {
    send({ type: "CHOOSE_TYPE", value });
  };

  const handleSelectBudget = (value: "LOW" | "MEDIUM" | "HIGH") => {
    send({ type: "CHOOSE_BUDGET", value });
  };

  console.log("WOOOOOO", {
    value: state.value,
    context: state.context,
    events: state.events,
    state,
  });

  return (
    <View>
      {state.matches("selectFrequency") && (
        <FrequencyScreen onSelect={handleSelectFrequency} />
      )}
      {state.matches("selectType") && (
        <TypeScreen onSelect={handleSelectType} />
      )}
      {state.matches("selectInterests") && (
        <InterestsScreen
          interests={state.context.interests}
          onSelectInterest={(interest) =>
            send({ type: "TOGGLE_INTEREST", interest })
          }
          onDone={() => send("DONE_SELECTING_INTERESTS")}
        />
      )}
      {state.matches("selectBudget") && (
        <BudgetScreen onSelect={handleSelectBudget} />
      )}
      {state.matches("summary") && <SummaryScreen {...state.context} />}
    </View>
  );
}
