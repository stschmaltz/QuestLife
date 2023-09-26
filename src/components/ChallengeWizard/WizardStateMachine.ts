import { assign, createMachine } from "xstate";

import { WizardOptionObject } from "./WizardController";

export type WizardEvent =
  | { type: "CHOOSE_CATEGORY"; value: WizardOptionObject }
  | { type: "TOGGLE_INTEREST"; interest: WizardOptionObject }
  | { type: "CHOOSE_OBJECTIVE"; value: WizardOptionObject }
  | { type: "CHOOSE_BUDGET"; value: WizardOptionObject }
  | { type: "CHOOSE_DURATION"; value: WizardOptionObject }
  | { type: "BACK" }
  | { type: "DONE_SELECTING_INTERESTS" }
  | { type: "CONFIRM" };

type WizardEvents = Extract<WizardEvent, { value: WizardOptionObject }>;

export type WizardEventTypes = WizardEvents["type"];

export interface Context {
  category?: WizardOptionObject;
  interests: WizardOptionObject[];
  objective?: WizardOptionObject;
  duration?: WizardOptionObject;
  budget?: WizardOptionObject;
}

const wizardStateMachine = createMachine<any, WizardEvent>(
  {
    predictableActionArguments: true,
    id: "questLife",
    initial: "selectCategory",
    context: {
      interests: [],
      category: undefined,
      budget: undefined,
      objective: undefined,
      duration: undefined,
    },
    states: {
      selectCategory: {
        on: {
          CHOOSE_CATEGORY: {
            target: "selectInterests",
            actions: assign({
              category: (_context, event) => event.value,
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
              objective: (_context, event) => event.value,
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
              duration: (_context, event) => event.value,
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
          const interests: WizardOptionObject[] = [...context.interests];
          const index = interests.findIndex((i) => i.value === interest.value);
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

export { wizardStateMachine };
