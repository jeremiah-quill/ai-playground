import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `You are a text-based autocomplete. I will send you a piece of text, and you will suggest a brief, subtle continuation, beginning from the end of the submitted text. This continuation should only be one to two sentences long and naturally extend the idea already presented. Here is the submitted text: "${req.body.currentText}"`,
      },
    ],
  });

  let suggestedText = response.data.choices[0].message.content;

  // trim text of any quotation marks:
  const trimmedText = suggestedText.split('"').join("");

  res.status(200).json({ suggestedText: trimmedText });
}
