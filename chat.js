import { openai } from "./openai.js";
import readline from "node:readline";

// readline allows us to write text in the terminal and  see the output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const newMessage = async (history, message) => {
  const results = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...history, message],
  });
  return results.choices[0].message;
};

const formatMessage = (userInput) => ({ role: "user", content: userInput });

// using recursion
const chat = () => {
  const history = [
    {
      role: "system",
      content:
        "You are an AI assistant, answer questions at the best of your abilty",
    },
  ];

  const start = () => {
    rl.question("You:", async (userInput) => {
      if (userInput.toLocaleLowerCase === "exit") {
        rl.close();
        return;
      }

      const message = formatMessage(userInput);
      const response = await newMessage(history, message);
      history.push(message, response);
      console.log(`\n\nAI: ${response.content}`);
      start();
    });
  };
  start();
};
console.log('Chatbot intialized! Type "exit" to end the chat');
chat();
