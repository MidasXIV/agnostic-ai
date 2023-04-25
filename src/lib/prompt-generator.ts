class PromptGenerator {
  static generateTaskCreationAgentPrompt(
    objective: string,
    result: Record<string, any>,
    taskDescription: string,
    taskList: string[]
  ): string {
    return `
    You are a task creation AI that uses the result of an execution agent to create new tasks with the following objective: ${objective},
    The last completed task has the result: ${JSON.stringify(result)}.
    This result was based on this task description: ${taskDescription}. These are incomplete tasks: ${taskList.join(
      ", "
    )}.
    Based on the result, create new tasks to be completed by the AI system that do not overlap with incomplete tasks.
    Return the tasks as an array.`;
  }

  static generatePrioritizationAgentPrompt(
    objective: string,
    taskNames: string,
    nextTaskId: number
  ): string {
    return `
    You are a task prioritization AI tasked with cleaning the formatting of and reprioritizing the following tasks: ${taskNames}.
    Consider the ultimate objective of your team:${objective}.
    Do not remove any tasks. Return the result as a numbered list, like:
    #. First task
    #. Second task
    Start the task list with number ${nextTaskId}.`;
  }
  
  static generateTakExecutionAgent(
    objective: string,
    task: string,
    context: Array<string>
  ): string {
    return `
    You are an AI who performs one task based on the following objective: ${objective}.
    Take into account these previously completed tasks: ${context}.
    Your task: ${task}
    Response:`;
  }
}
