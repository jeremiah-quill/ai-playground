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
        content: `You are an AI assistant, and you have been trained to write emails when given a summary of topics and details to cover. You will receive a data structure that contains all of the topics and details to cover, and a writing tone to apply. Keep your response concise, but make sure to include all of the topics and details.`,
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
      .map((point) => {
        const subpointsText = point.children.length > 0 ? "\n" + formatPoints(point.children, depth + 1) : "";
        return prefix + point.text + subpointsText;
      })
      .join("\n");
  };

  const pointsText = formatPoints(data);
  const prompt = `Please write an email in a ${tone} tone that covers the following topics and details:\n${pointsText}.`;
  return prompt;
};
