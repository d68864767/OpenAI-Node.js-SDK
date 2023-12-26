import OpenAI from "openai";
import { getCurrentWeather, getLocation } from "./tools";

// Load environment variables
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const tools = [
  {
    type: "function",
    function: {
      name: "getCurrentWeather",
      description: "Get the current weather in a given location",
      parameters: {
        latitude: "number",
        longitude: "number"
      },
    }
  },
  {
    type: "function",
    function: {
      name: "getLocation",
      description: "Get the user's location",
      parameters: {},
    }
  },
];

const messages = [
  {
    role: "system",
    content: "You are a helpful assistant."
  },
];

const availableTools = {
  getCurrentWeather,
  getLocation,
};

async function agent(userInput) {
  messages.push({
    role: "user",
    content: userInput
  });

  const response = await openai.chat.completions.create({
    model: "text-davinci-002",
    messages: messages,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 0.5,
    log_level: "info",
    logprobs: null,
    lls_model: "text-davinci-002",
    tools: tools
  });

  const message = response.data.choices[0].message;
  messages.push({
    role: "assistant",
    content: message.content
  });

  if (message.role === "system" && message.content === "tool_call") {
    const tool = message.tool;
    const args = message.args;
    const result = await availableTools[tool](...args);
    messages.push({
      role: "assistant",
      content: result
    });
  }

  return messages;
}

export default agent;
