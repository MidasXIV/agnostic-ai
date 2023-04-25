import { ServiceStrategy } from "@/services/service-strategy";

/**
 * The PrioritizationAgent class is responsible for reprioritizing the task list using AI.
 * It takes in the ID of the current task as a parameter, and sends a prompt to the API to generate a
 * reprioritized task list. The task list is returned as a record, where each record contains the ID and name of a task.
 *
 * Note that the PrioritizationAgent class is a generic implementation and is not specific to any particular API.
 * Therefore, the service strategy and serviceCall function passed to it should be implemented according to the specific API being used.
 */
export default class PrioritizationAgent {
  service: ServiceStrategy;
  taskList: Array<{ task_id: number; task_name: string }>;

  constructor(
    service: ServiceStrategy,
    taskList: Array<{ task_id: number; task_name: string }>
  ) {
    this.service = service;
    this.taskList = taskList;
  }

  public async reprioritizeTasks(
    objective: string,
    thisTaskId: number
  ): Promise<Array<{ task_id: number; task_name: string }>> {
    const taskNames = this.taskList.map((t) => t.task_name).join(", ");
    const nextTaskId = thisTaskId + 1;
    const prompt = PromptGenerator.generatePrioritizationAgentPrompt(
      objective,
      taskNames,
      nextTaskId
    );
    const response = await this.service.callService(prompt);
    const newTasks = response.split("\n").map((taskString: string) => {
      const [taskId, taskName] = taskString
        .split(".", 2)
        .map((part) => part.trim());
      return { task_id: parseInt(taskId), task_name: taskName };
    });
    this.taskList = newTasks;
    return newTasks;
  }
}
