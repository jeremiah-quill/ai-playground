import { ChatGPTAPI } from "chatgpt";

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
  // completionParams: {
  //   temperature: 0.5,
  //   top_p: 0.8
  // },
  debug: true,
  systemMessage: false,
});

export default async function handler(req, res) {
  const { style } = req.body;

  console.log("req.body in handler", req.body);
  console.log("style in handler", style);

  const response = await api.sendMessage(`I am looking for a baby name.  Please list 5 names in the style of ${style}`);
  console.log(response.text);

  res.status(200).json({ text: response.text });
}
