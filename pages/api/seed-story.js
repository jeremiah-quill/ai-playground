import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.2,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { seeds, theme } = req.body;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a children's storybook writing assistant.  You are provided with a handful of 'seeds' from which you begin your writing.  The seeds can be a plot, characters, description, etc.  You will also be provided a theme.  You will respond with the opening line to a children's story based on the seeds and theme.  The opening line itself doesn't have to include every single detail.`,
      },
      {
        role: "user",
        content: `Seeds: ${seeds} Theme: ${theme}`,
      },
    ],
  });

  res.status(200).json({ text: response.data.choices[0].message.content });
}
