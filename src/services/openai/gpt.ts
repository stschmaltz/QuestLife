import axios from "axios";

async function sendPrompt() {
  const instance = axios.create({
    baseURL: "https://api.openai.com/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    },
  });

  try {
    const response = await instance.post("v1/chat/completions", {
      model: "gpt-4",
      messages: [
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
      ],
    });

    response.data.choices.forEach((choice: any) => {
      console.log({ choice: choice.message.content });
    });
    console.log(response.data.choices[0].text);
    return response.data.choices.map((choice: any) => choice.message.content);
  } catch (error) {
    console.error(error);
    return "";
  }
}

export { sendPrompt };
