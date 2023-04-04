import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.2,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { style, email } = req.body;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are an AI assistant, and you have been trained to provide suggested edits to emails based on a chosen tone or style. The main style you have been trained on is ${style}. Keep your response concise and to the point, it shouldn't add more than 1-2 sentences to the original email.`,
      },
      {
        role: "user",
        content: `Please generate a version of my email in the style of ${style}: ${email}`,
      },
    ],
  });

  res.status(200).json({ text: response.data.choices[0].message.content });
}
