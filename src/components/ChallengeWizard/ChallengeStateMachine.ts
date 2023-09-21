import { assign, createMachine } from "xstate";

type ChallengeEvent =
  | { type: "CHOOSE_FREQUENCY"; value: string }
  | { type: "CHOOSE_TYPE"; value: string }
  | { type: "CHOOSE_BUDGET"; value: string }
  | { type: "TOGGLE_INTEREST"; interest: string }
  | { type: "BACK" }
  | { type: "DONE_SELECTING_INTERESTS" }
  | { type: "CONFIRM" }
  | { type: "MODIFY" };

export interface Context {
  interests: string[];
  frequency: string;
  type: string;
  budget: string;
}

const challengeStateMachine = createMachine<any, ChallengeEvent>(
  {
    predictableActionArguments: true,
    id: "questLife",
    initial: "selectFrequency",
    context: {
      interests: [],
      frequency: "",
      type: "",
      budget: "",
    },
    states: {
      selectFrequency: {
        on: {
          CHOOSE_FREQUENCY: {
            target: "selectType",
            actions: assign({
              frequency: (_context, event) => event.value,
            }),
          },
        },
      },
      selectType: {
        on: {
          CHOOSE_TYPE: {
            target: "selectInterests",
            actions: assign({
              type: (_context, event) => event.value,
            }),
          },
          BACK: "selectFrequency",
        },
      },
      selectInterests: {
        on: {
          TOGGLE_INTEREST: {
            actions: "toggleInterest",
          },
          DONE_SELECTING_INTERESTS: "selectBudget",
          BACK: "selectType",
        },
      },
      selectBudget: {
        on: {
          CHOOSE_BUDGET: {
            target: "summary",
            actions: assign({
              budget: (_context, event) => event.value,
            }),
          },
          BACK: "selectInterests",
        },
      },
      summary: {
        on: {
          CONFIRM: "completed",
          MODIFY: "selectFrequency",
          BACK: "selectBudget",
        },
      },
      completed: {
        type: "final",
      },
    },
  },
  {
    actions: {
      toggleInterest: assign({
        interests: (context, event) => {
          if (event.type !== "TOGGLE_INTEREST") return context.interests;
          const interest = event.interest;
          const interests = [...context.interests];
          const index = interests.indexOf(interest);
          if (index > -1) {
            interests.splice(index, 1);
          } else {
            interests.push(interest);
          }
          return interests;
        },
      }),
    },
  },
);

export { challengeStateMachine };
