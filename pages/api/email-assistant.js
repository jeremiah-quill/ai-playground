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
        content: `You are an AI assistant, and you have been trained to write emails based on a hierarchy of main, sub, and sub-sub points provided by a user.  You receive a data structure that contains all of the points to cover, and a tone to stick to in the email. Keep your response concise and to the point.`,
      },
      {
        role: "user",
        content: generateEmailPrompt(email, style),
      },
    ],
  });

  res.status(200).json({ text: response.data.choices[0].message.content });
}

const generateEmailPrompt = (data, tone) => {
  const formatPoints = (points, depth = 0) => {
    const prefix = "  ".repeat(depth) + "- ";
    return points
      .map(
        (point) =>
          prefix + point.text + (point.subpoints.length > 0 ? "\n" + formatPoints(point.subpoints, depth + 1) : "")
      )
      .join("\n");
  };

  const pointsText = formatPoints(data);
  const prompt = `Please write an email in a ${tone} tone that covers the following points:\n${pointsText}`;
  return prompt;
};
