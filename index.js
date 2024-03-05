import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI();

const results = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content:
        "you are an assistant , answer any question to the best of your abilty ",
    },

    {
      role: "user",
      content:
        "hi can you please tell me how many countries are there in the world",
    },
  ],
});
console.log(results.choices[0]);
