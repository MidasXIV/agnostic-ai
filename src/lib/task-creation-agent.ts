import { ServiceStrategy } from "@/services/service-strategy";

/**
 * The TaskCreationAgent class is responsible for generating new tasks based 
 * on the objective and the result of the previous task. 
 * 
 * It takes in four parameters: the objective, the result of the previous task, the task description, and the current task list. 
 * It utilizes a service strategy to send a prompt to a third-party API that generates new tasks based on the input parameters.
 * 
 * The createTasks() method of the TaskCreationAgent class is responsible for generating the new tasks. 
 * The createTasks() method then uses the PromptGenerator class to generate the prompt as a string, and passes this prompt to the callService function. 
 * The response from the API is then processed and returned as a list of dictionaries, where each dictionary contains the name of a new task.
 * Note that the TaskCreationAgent class is a generic implementation and is not specific to any particular API. 
 * Therefore, the service strategy and serviceCall function passed to it should be implemented according to the specific API being used.
 */
export default class TaskCreationAgent {
  service: ServiceStrategy;

  constructor(service: ServiceStrategy) {
    this.service = service;
  }

  /**
   * Generates new tasks based on the input parameters and the specified service strategy.
   *
   * @param objective The objective of the tasks to be generated.
   * @param result The result of the previous task.
   * @param taskDescription The description of the tasks to be generated.
   * @param taskList The current list of tasks.
   *
   * @returns A list of dictionaries, where each dictionary contains the name of a new task.
   */
  public async createTasks(
    objective: string,
    result: Record<string, any>,
    taskDescription: string,
    taskList: string[]
  ): Promise<{ task_name: string }[]> {
    const prompt = PromptGenerator.generateTaskCreationAgentPrompt(
      objective,
      result,
      taskDescription,
      taskList
    );
    const response = await this.service.callService(prompt);
    const newTasks = response.split("\n").filter(Boolean);
    return newTasks.map((taskName) => ({ task_name: taskName }));
  }
}
