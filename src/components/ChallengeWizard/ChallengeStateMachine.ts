import { assign, createMachine } from "xstate";

type ChallengeEvent =
  | { type: "CHOOSE_CATEGORY"; value: string }
  | { type: "TOGGLE_INTEREST"; interest: string }
  | { type: "CHOOSE_OBJECTIVE"; value: string }
  | { type: "CHOOSE_BUDGET"; value: string }
  | { type: "CHOOSE_DURATION"; value: string }
  | { type: "BACK" }
  | { type: "DONE_SELECTING_INTERESTS" }
  | { type: "CONFIRM" }
  | { type: "MODIFY" };

export interface Context {
  category: string;
  interests: string[];
  objective: string;
  duration: string;
  type: string;
  budget: string;
}

const challengeStateMachine = createMachine<any, ChallengeEvent>(
  {
    predictableActionArguments: true,
    id: "questLife",
    initial: "selectCategory",
    context: {
      interests: [],
      frequency: "",
      type: "",
      budget: "",
    },
    states: {
      selectCategory: {
        on: {
          CHOOSE_CATEGORY: {
            target: "selectInterests",
            actions: assign({
              frequency: (_context, event) => event.value,
            }),
          },
        },
      },
      selectInterests: {
        on: {
          TOGGLE_INTEREST: {
            actions: "toggleInterest",
          },
          DONE_SELECTING_INTERESTS: "selectObjective",
          BACK: "selectCategory",
        },
      },
      selectObjective: {
        on: {
          CHOOSE_OBJECTIVE: {
            target: "selectDuration",
            actions: assign({
              type: (_context, event) => event.value,
            }),
          },
          BACK: "selectInterests",
        },
      },
      selectDuration: {
        on: {
          CHOOSE_DURATION: {
            target: "selectBudget",
            actions: assign({
              budget: (_context, event) => event.value,
            }),
          },
          BACK: "selectObjective",
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
          BACK: "selectDuration",
        },
      },
      summary: {
        on: {
          CONFIRM: "completed",
          MODIFY: "selectCategory",
          BACK: "selectObjective",
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
