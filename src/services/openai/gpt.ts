import axios, { AxiosInstance } from "axios";

import { Context } from "../../components/ChallengeWizard/WizardStateMachine";

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
    this.temperature = 0.8;
    this.model = "gpt-4";
    this.endpoint = "v1/chat/completions";
  }

  async sendPromptWithContext(context: Context): Promise<string[]> {
    const messages = this.createStateMachineMessages(context);
    return this.sendPrompt(messages);
  }

  private async sendPrompt(messages: IMessage[]): Promise<string[]> {
    try {
      const response = await this.instance.post<IOpenAIResponse>(
        this.endpoint,
        {
          model: this.model,
          messages,
          temperature: this.temperature,
          top_p: this.top_p,
        },
      );
      return response.data.choices.map((choice) => choice.message.content);
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
        "You're a creative challenge generator for QuestLife. Generate 10 challenges based on the user's inputs ensuring they're safe, feasible, and suitable. Deliver each challenge in proper JSON format with fields: 'challengeTitle', 'challengeDescription', and 'suggestedDuration'. Avoid using numbered lists or unnecessary new lines in the output. Be quite specific with the challenges, they should be interesting and fun.",
    };

    const userMessages: IMessage[] = [
      {
        role: "user",
        content: `Challenge Category: ${context.category?.label}`,
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
        content: `Duration: ${context.duration?.label} short="1-3hours"`,
      },
      { role: "user", content: `Budget: ${context.budget?.label}` },
    ];

    return [systemMessage, ...userMessages];
  }
}

export { OpenAIApi };
