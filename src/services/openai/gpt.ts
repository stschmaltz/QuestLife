import axios, { AxiosInstance } from "axios";

import { Context } from "../../components/ChallengeWizard/WizardStateMachine";
import { Quest } from "../firestore/quests";

interface IMessage {
  role: "system" | "user";
  content: string;
}

interface IChoice {
  message: IMessage;
}

interface IOpenAIResponse {
  choices: IChoice[];
}

class OpenAIApi {
  private instance: AxiosInstance;
  private model: string;
  private temperature: number;
  private top_p: number;
  private endpoint: string;
  private baseUrl: string = "https://api.openai.com/";

  constructor() {
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
    });

    this.top_p = 0.7;
    this.temperature = 1;
    this.model = "gpt-4";
    this.endpoint = "v1/chat/completions";
  }

  async sendPromptWithContext(context: Context): Promise<Quest[]> {
    const messages = this.createStateMachineMessages(context);
    return this.sendPrompt(messages);
  }

  private async sendPrompt(messages: IMessage[]): Promise<Quest[]> {
    try {
      const response = await this.instance.post<IOpenAIResponse>(
        this.endpoint,
        {
          model: this.model,
          messages,
          temperature: this.temperature,
          // top_p: this.top_p,
        },
      );

      console.log(response.data.choices.length);
      const result = response.data.choices.map(
        (choice) => choice.message.content,
      )[0];

      const parsedResponse: Quest[] = JSON.parse(result);

      return parsedResponse;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Converts the xstate context into a series of messages
   * suitable for the OpenAI API.
   */
  private createStateMachineMessages(context: Context): IMessage[] {
    const systemMessage: IMessage = {
      role: "system",
      content:
        "Craft 10 unique challenges for QuestLife using the provided context. While the user's interests serve as a starting point, do not limit the challenges exclusively to those interests. Branch out and incorporate elements from other domains to ensure a diverse set of experiences. Each challenge should blend the user's category, objective, duration, and budget, and be actionable, multi-step, incorporating real-world elements or current trends. Return challenges in a JSON format with 'challengeTitle', 'challengeDescription', and 'suggestedDuration'. Avoid overly generic suggestions. Examples: 'Visit a local museum and sketch your favorite exhibit' or 'Cook a dish from a country you've never visited, keeping in mind the budget'. Inspire users to embark on adventures that encourage exploration beyond their comfort zone.",
    };

    const userMessages: IMessage[] = [
      {
        role: "user",
        content: `Category: ${context.category?.label}`,
      },
      {
        role: "user",
        content: `Interests, not all interests need to be used and you can generate things outside of those interests. They are for inspiration though.: ${context.interests
          .map((interest) => interest.label)
          .join(", ")}`,
      },
      { role: "user", content: `Objective: ${context.objective?.label}` },
      {
        role: "user",
        content: `Duration: ${context.duration?.label} (short-term indicates 1-2 hours)`,
      },
      { role: "user", content: `Budget: ${context.budget?.label}` },
    ];

    return [systemMessage, ...userMessages];
  }
}

export { OpenAIApi };
