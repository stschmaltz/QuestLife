import axios, { AxiosInstance } from "axios";

import { Context } from "../../components/ChallengeWizard/WizardStateMachine";
import { Quest } from "../firestore/quests/quests";

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const gpt4Model = "gpt-4";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const gpt3Model = "gpt-3.5-turbo";

    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
    });

    this.top_p = 1;
    this.temperature = 1;
    this.model = gpt4Model;
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
          // temperature: this.temperature,
          // top_p: this.top_p,
        },
      );

      console.log("RESPONSE", response.data.choices[0].message.content);
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
    const systemMessages: IMessage[] = [
      {
        role: "system",
        content:
          "Craft 5 unique challenges for QuestLife using the provided context. While the user's interests serve as a starting point, do not limit the challenges exclusively to those interests. Branch out and incorporate elements from other domains to ensure a diverse set of experiences. Each challenge should blend the user's category, objective, duration, and budget, and be actionable, multi-step, incorporating real-world elements or current trends. Avoid generic suggestions. Inspire users to embark on adventures that encourage exploration beyond their comfort zone. Do not suggest build your own board game. Return challenges in the format of a JSON array, where each challenge is an object with fields 'challengeTitle', 'challengeDescription', and 'suggestedDuration'. I will be consuming the result programatically using Javascript using JSON.parse. Additionally the challenges should be quirky and fun and deeply consider the user's input to craft a tailored response. Do not respond with anything other than the JSON array of challenges.",
      },
      {
        role: "system",
        content:
          "Take your time to generate truly unique and interesting challenges. This is the most important part of the user flow.",
      },
    ];

    const userMessages: IMessage[] = [
      {
        role: "user",
        content: `Category: ${context.category?.label}`,
      },
      {
        role: "user",
        content: `For inspiration, not required to have challenges include interests: ${context.interests
          .map((interest) => interest.label)
          .join(
            ", ",
          )}. if there are no interests, the results should be random.`,
      },
      {
        role: "user",
        content: `Objective: ${context.objective?.label}. Let's STRONGLY consider this objective when generating each.`,
      },
      {
        role: "user",
        content: `Duration: ${context.duration?.label} (instant is something you can do now and within an hour or two. short-term indicates 1-2 hours, Long-term indicates 3+ hours, maybe multiple days/weeks)`,
      },
      {
        role: "user",
        content: `Budget: ${context.budget?.label}. free is completely free, low is $0-50, investment is 0-$200`,
      },
    ];

    return [...systemMessages, ...userMessages];
  }
}

export { OpenAIApi };
