import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
config();

const configuration = new Configuration({
  organization: "org-8NZ31pJoZhInoUzZQc5gn6Uv",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: `${message}`,
  //   max_tokens: 100,
  //   temperature: 0.5,
  // });
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${message}` }],
  });
  res.json({
    message: completion.data.choices[0].message.content,
  });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
