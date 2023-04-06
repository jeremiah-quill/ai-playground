import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const { story, seeds, theme, creativity, storyLength, currentSentence } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: creativity,
  });

  const openai = new OpenAIApi(configuration);

  const content = `The chosen theme for my story is: ${theme}.  The initial seed concepts for my story were: ${seeds}.  I'm requesting the story should be ${"a few sentences"} long only. This is the story up until this point: ${story}. Please provide the next sentence in the story, keeping in mind that the story length should be around ${"a few sentences"} long.  If you feel the story is coming to an end, please continue progressing towards the end.  If you feel like it has reached the end of the story, provide the ending sentence followed by this symbol: "||".`;

  console.log("content", content);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a children's storybook writing assistant.  You receive information about an existing story and respond with the next sentence in the story. Your stories contain wisdom and lessons for children.`,
      },
      {
        role: "user",
        content: content,
      },
    ],
  });

  res.status(200).json({ text: response.data.choices[0].message.content });
}
