import agent from './openaiAgent';

async function main() {
  try {
    // Initial user input
    let userInput = "Where am I located right now?";

    // Run the agent function with the user input
    let messages = await agent(userInput);

    // Log the messages
    console.log(messages);

    // Loop for continued interaction
    for (let i = 0; i < 3; i++) {
      // Update user input
      userInput = "What's the weather like there?";

      // Run the agent function with the new user input
      messages = await agent(userInput);

      // Log the messages
      console.log(messages);
    }
  } catch (error) {
    console.error(error);
  }
}

main();
