const express = require('express');
const app = express();
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



app.post('/', async (req, res) => {
  const massage = req.body.message;
  if (massage == 'siapa kamu' || massage == 'halo' || massage == 'siapa yang menciptakanmu'|| massage == 'whats your name' || massage == 'hallo' || massage == 'hai' || massage == 'who are you' || massage == 'hello'  || massage == 'kamu itu apa'  || massage == 'siapa kmu?'  || massage == 'siapa kmu'  || massage == 'siapa kamu?'  || massage == 'siapa penciptamu'  || massage == 'siapa penciptamu'  || massage == 'siapa yang menciptakanmu'  || massage == 'apa'  || massage == 'tes'  || massage == 'hmm'  || massage == 'Hello'  || massage == 'Halo'  || massage == 'Siapa kamu'  || massage == 'are you' ){
    res.json({ response: 'Hallo, Aku adalah simple AI buatan deni setiya yang berbasis pada openai, aku siap membantumu' });
  }
  else{
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: massage
        }
      ]
    });
    res.json({ response: response.data.choices[0].message.content });
  }
  }
);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});