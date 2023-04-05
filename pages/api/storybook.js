import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.2,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { story, seeds, theme } = req.body;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a children's storybook writing assistant.  You receive the initial seeds, the theme, and the start of a story, and you respond with the next sentence in the story.`,
      },
      {
        role: "user",
        content: `Story: ${story} Initial seeds: ${seeds} Theme: ${theme}`,
      },
    ],
  });

  res.status(200).json({ text: response.data.choices[0].message.content });
}
