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

  const categories: WizardOptionObject[] = [
    { value: "SOLO", label: "Solo" },
    { value: "COUPLE", label: "Couple" },
    { value: "FRIENDS", label: "Friends" },
    { value: "FAMILY", label: "Family" },
  ];
  const handleSelectCategory = (value: string) => {
    send({ type: "CHOOSE_CATEGORY", value });
  };

  const objectives: WizardOptionObject[] = [
    { value: "MEET_NEW_PEOPLE", label: "Meet New People" },
    { value: "TRY_SOMETHING_NEW", label: "Try Something New" },
    { value: "RELAX_AND_UNWIND", label: "Relax and Unwind" },
    { value: "PHYSICAL_CHALLENGE", label: "Physical Challenge" },
    { value: "MENTAL_CHALLENGE", label: "Mental Challenge" },
    { value: "CONNECT_WITH_NATURE", label: "Connect with Nature" },
    { value: "ARTISTIC_EXPRESSION", label: "Artistic Expression" },
  ];
  const handleSelectObjective = (value: string) => {
    send({ type: "CHOOSE_OBJECTIVE", value });
  };

  const durations: WizardOptionObject[] = [
    { value: "INSTANT", label: "Instant" },
    { value: "SHORT_TERM", label: "Short-term" },
    { value: "LONG_TERM", label: "Long-term" },
  ];
  const handleSelectDuration = (value: string) => {
    send({ type: "CHOOSE_DURATION", value });
  };

  const budgets: WizardOptionObject[] = [
    { value: "LOW", label: "Free Only" },
    { value: "MEDIUM", label: "Low Budget" },
    { value: "HIGH", label: "Investment" },
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
      {state.matches("selectCategory") && (
        <WizardScreen
          title="Who is doing this quest?"
          options={categories}
          selectedOption={state.context.category}
          onSelect={handleSelectCategory}
          onBack={() => router.back()}
          screenIndex={1}
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
      {state.matches("selectObjective") && (
        <WizardScreen
          title="Who do you want to do quests with?"
          options={objectives}
          selectedOption={state.context.type}
          onSelect={handleSelectObjective}
          onBack={() => send("BACK")}
          screenIndex={2}
        />
      )}
      {state.matches("selectDuration") && (
        <WizardScreen
          title="What length of quest are you looking for?"
          options={durations}
          selectedOption={state.context.duration}
          onSelect={handleSelectDuration}
          onBack={() => send("BACK")}
          screenIndex={2}
        />
      )}
      {state.matches("selectBudget") && (
        <WizardScreen
          title="What's your budget per quest?"
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
