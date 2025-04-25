export type ToDoListState = Record<TaskCategoryText, Category>;

export type Task = {
  taskID: string;
  taskName: string;
  taskDescription: string;
  taskDate: string;
};

export type Category = {
  category: TaskCategoryText;
  tasks: Task[];
};

export enum TaskCategoryText {
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  PENDING = 'Pending',
}
