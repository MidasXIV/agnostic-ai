export interface ServiceStrategy {
  callService(prompt: string, maxTokens?: number): string;
}
