import axios, { AxiosInstance } from "axios";

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
  private messages: IMessage[];
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

    // Default values. This can be adjusted based on the desired behavior.
    this.top_p = 0.7;
    this.temperature = 0.8;
    this.model = "gpt-4";
    this.endpoint = "v1/chat/completions";
    this.messages = [
      {
        role: "system",
        content:
          "You're a challenge generator for QuestLife, an app that provides users with personalized challenges based on their preferences, goals, budget, and limitations. Your task is to come up with 10 engaging, suitable, and realistic challenges tailored to each user's inputs. Please structure each challenge response in JSON format with fields 'challengeTitle', 'challengeDescription', and 'suggestedDuration'.",
      },
      { role: "user", content: "I want daily challenges." },
      { role: "user", content: "I'll be taking the challenges solo." },
      { role: "user", content: "My main goal is personal growth." },
      {
        role: "user",
        content: "My interests are food, exercise, sports, and video games.",
      },
      { role: "user", content: "I have a low budget for these challenges." },
      { role: "user", content: "No specific limitations." },
      {
        role: "user",
        content: "My ideal duration for each challenge is 30 minutes.",
      },
    ];
  }

  async sendPrompt(): Promise<string[]> {
    try {
      const response = await this.instance.post<IOpenAIResponse>(
        this.endpoint,
        {
          model: this.model,
          messages: this.messages,
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
}

export { OpenAIApi };
