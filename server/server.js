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

const port = 3080;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${message}` }],
    });
    res.json({
      message: completion.data.choices[0].message.content,
    });

    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `${message}`,
    //   temperature: 0,
    //   max_tokens: 2000,
    //   top_p: 1,
    //   frequency_penalty: 0.5,
    //   presence_penalty: 0,
    // });

    // console.log(response.data.choices[0].text, "TEST!!");
    // res.status(200).send({
    //   message: response.data.choices[0].text,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
