const OBJECTIVE = "objective";
const table_name = "index_name";

type ContextAgentArgs = {
  tokenLimit: number;
  model?: string;
  debug?: boolean;
};

export class ContextAgent {
  private context: LLMMessage[] = [];
  private readonly tokenLimit: number;
  private readonly model: string;
  private readonly debug: boolean;

  constructor({ tokenLimit, model = Config.smart_llm_model, debug = false }: ContextAgentArgs) {
    this.tokenLimit = tokenLimit;
    this.model = model;
    this.debug = debug;
  }

  public async addMessage(role: "system" | "user", content: string, permanent?: boolean) {
    const message: LLMMessage = { role, content };

    if (permanent) {
      this.context.splice(1, 0, message);
    } else if (role === "system") {
      this.context.splice(0, 0, message);
    } else {
      this.context.push(message);
    }
  }

  public async getContext(tokenBudget: number) {
    const contextToSend = this.getContextToSend(tokenBudget);
    const tokensRemaining = tokenBudget - this.countTokens(contextToSend);

    if (this.debug) {
      console.log(`Token limit: ${this.tokenLimit}`);
      console.log(`Send Token Count: ${this.countTokens(contextToSend)}`);
      console.log(`Tokens remaining for response: ${tokensRemaining}`);
      console.log("------------ CONTEXT SENT TO AI ---------------");
      for (const message of contextToSend) {
        console.log(
          `${message.role.charAt(0).toUpperCase() + message.role.slice(1)}: ${
            message.content
          }`
        );
        console.log();
      }
      console.log("----------- END OF CONTEXT ----------------");
    }

    return { contextToSend, tokensRemaining };
  }

  public async chatWithAI(userInput: string, context: LLMMessage[], tokensRemaining: number) {
    const assistantReply = await callLLMChatCompletion(
      context,
      this.model,
      undefined /* temperature */,
      tokensRemaining
    );

    return assistantReply;
  }

  private getContextToSend(tokenBudget: number) {
    const sendTokenLimit = tokenBudget - 1000;
    const contextToSend: LLMMessage[] = [];
    let currentTokensUsed = 0;

    for (const message of this.context) {
      const tokensToAdd = this.countTokens([message]);

      if (currentTokensUsed + tokensToAdd > sendTokenLimit) {
        break;
      }

      contextToSend.push(message);
      currentTokensUsed += tokensToAdd;
    }

    return contextToSend;
  }

  private countTokens(messages: LLMMessage[]) {
    let tokenCount = 0;

    for (const message of messages) {
      tokenCount += this.countMessageTokens(message);
    }

    return tokenCount;
  }

  private countMessageTokens(message: LLMMessage) {
    return message.content.trim().split(/\s+/).length;
  }
}


export default class TaskContextAgent {
  /**
   * Retrieves context for a given query from an index of tasks.
   * @param query The query or objective for retrieving context.
   * @param topResultsNum The number of top results to retrieve.
   * @returns A list of tasks as context for the given query, sorted by relevance.
   */
  public async getContext(query: string, topResultsNum: number): Promise<string[]> {
    const queryEmbedding = await getAdaEmbedding(query);
    const results = await index.query({
      query: queryEmbedding,
      top_k: topResultsNum,
      include_metadata: true,
      namespace: OBJECTIVE,
    });
    const sortedResults = results.matches.sort((a, b) => b.score - a.score);
    return sortedResults.map((item) => item.metadata.task.toString());
  }
}

// async function getAdaEmbedding(text: string): Promise<number[]> {
//   text = text.replace("\n", " ");
//   const result = await openai.Embedding.create({
//     input: [text],
//     model: "text-embedding-ada-002",
//   });
//   return result.data[0].embedding;
// }