import { ServiceStrategy } from "./service-strategy";

class OpenAIService implements ServiceStrategy {
  callService(prompt: string): string {
    // Call OpenAI's API and return the response
    // return openaiCall(prompt);
    return "To be implemented";
  }
}


const interactWithOpenAI = async (prompt: string): Promise<any> => {
  return fetch(`/api/chat/`, {
    method: "POST",
    body: JSON.stringify({ prompt }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default interactWithOpenAI;
