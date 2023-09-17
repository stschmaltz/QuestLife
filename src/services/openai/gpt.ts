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

  constructor() {
    this.instance = axios.create({
      baseURL: "https://api.openai.com/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
    });

    // Default values. This can be adjusted based on the desired behavior.
    this.model = "gpt-4";
    this.messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant. You give users unique adventures based on their inputs. Your goal is to make the adventure fun, unique but doable. You are to give 10 unique adventures but they should be something that can be completed within a specified timeline.",
      },
      {
        role: "user",
        content:
          "Hello! I want adventures for me and my partner. They should be very cute and romantic ideas. We don't want to spend money. We are trying to add more fun to our lives. We like food, music, and board games. I'm looking for 3 hour or less adventures that can be done on weekends.",
      },
    ];
  }

  async sendPrompt(): Promise<string[]> {
    try {
      const response = await this.instance.post<IOpenAIResponse>(
        "v1/chat/completions",
        {
          model: this.model,
          messages: this.messages,
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
