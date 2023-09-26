import { WizardOptionObject } from "./WizardController";

const categories: WizardOptionObject[] = [
  { value: "SOLO", label: "Solo" },
  { value: "COUPLE", label: "Couple" },
  { value: "FRIENDS", label: "Friends" },
  { value: "FAMILY", label: "Family" },
];

const interests: WizardOptionObject[] = [
  { value: "INDOOR_SPORTS", label: "Indoor Sports" },
  { value: "READING", label: "Reading" },
  { value: "MOVIES", label: "Movies" },
  { value: "VIDEO_GAMES", label: "Video Games" },
  { value: "WRITING", label: "Writing" },
  { value: "PLAYING_MUSIC", label: "Playing Music" },
  { value: "BOARD_GAMES", label: "Board Games" },
  { value: "OUTDOOR_SPORTS", label: "Outdoor Sports" },
  { value: "PAINTING", label: "Painting" },
  { value: "COOKING", label: "Cooking" },
  { value: "LISTENING_TO_MUSIC", label: "Listening to Music" },
  { value: "EXERCISING", label: "Exercising" },
  { value: "CRAFTING", label: "Crafting" },
  { value: "BAKING", label: "Baking" },
];

const objectives: WizardOptionObject[] = [
  { value: "MEET_NEW_PEOPLE", label: "Meet New People" },
  { value: "TRY_SOMETHING_NEW", label: "Try Something New" },
  { value: "RELAX_AND_UNWIND", label: "Relax and Unwind" },
  { value: "PHYSICAL_CHALLENGE", label: "Physical Challenge" },
  { value: "HAVE_FUN", label: "Have Fun" },
  { value: "CONNECT_WITH_NATURE", label: "Connect with Nature" },
  { value: "ARTISTIC_EXPRESSION", label: "Artistic Expression" },
];

const durations: WizardOptionObject[] = [
  { value: "INSTANT", label: "Instant" },
  { value: "SHORT_TERM", label: "Short-term" },
  { value: "LONG_TERM", label: "Long-term" },
];

const budgets: WizardOptionObject[] = [
  { value: "LOW", label: "Free Only" },
  { value: "MEDIUM", label: "Low Budget" },
  { value: "HIGH", label: "Investment" },
];

export { budgets, categories, durations, interests, objectives };
