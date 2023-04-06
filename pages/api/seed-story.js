import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const { seeds, theme, creativity, storyLength } = req.body;

  console.log("seeds", seeds);
  console.log("theme", theme);
  console.log("creativity", creativity);
  console.log("storyLength", storyLength);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: creativity,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a children's storybook writing assistant.  You are provided with a handful of 'seeds' from which you begin your writing.  The seeds can be a plot, characters, description, etc.  You will also be provided a theme.  You will respond with the opening line to a children's story based on the seeds and theme. The opening line is strictly to be 1 sentence only.  The opening line does not have to capture all relevant details, and it should start like a typical children's story.`,
      },
      {
        role: "user",
        content: `The chosen theme for my story is: ${theme}.  The initial seed concepts for my story are: ${seeds}.  The story should be at maximum ${"a few sentences"} long. Please provide the first sentence to the story.`,
      },
    ],
  });

  res.status(200).json({ text: response.data.choices[0].message.content });
}
