import { TaskCategoryText, ToDoListState } from '@/components/types';
import { ToDoListActions } from './types';

export const initialState: ToDoListState = {
  'In Progress': {
    category: TaskCategoryText.IN_PROGRESS,
    tasks: [
      {
        taskID: '1',
        taskName: 'Task 1',
        taskDescription: 'Task 1 description',
        taskDate: '2023-10-01',
      },
      {
        taskID: '2',
        taskName: 'Task 2',
        taskDescription: 'Task 2 description',
        taskDate: '2023-10-02',
      },
    ],
  },
  Completed: {
    category: TaskCategoryText.COMPLETED,
    tasks: [],
  },
  Pending: {
    category: TaskCategoryText.PENDING,
    tasks: [],
  },
};

export const reducer = (
  state: ToDoListState = initialState,
  action: ToDoListActions,
) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const { taskID, taskName, taskDescription, taskDate, category } =
        action.payload;
      return {
        ...state,
        [category]: {
          ...state[category],
          tasks: [
            ...state[category].tasks,
            {
              taskID,
              taskName,
              taskDescription,
              taskDate,
            },
          ],
        },
      };
    }
    case 'EDIT_TASK': {
      const {
        taskID,
        taskName,
        taskDescription,
        taskDate,
        newCategory,
        oldCategory,
      } = action.payload;
      if (oldCategory !== newCategory) {
        return {
          ...state,
          [oldCategory]: {
            ...state[oldCategory],
            tasks: state[oldCategory].tasks.filter(
              task => task.taskID !== taskID,
            ),
          },
          [newCategory]: {
            ...state[newCategory],
            tasks: [
              ...state[newCategory].tasks,
              {
                taskID,
                taskName,
                taskDescription,
                taskDate,
              },
            ],
          },
        };
      }
      return {
        ...state,
        [newCategory]: {
          ...state[newCategory],
          tasks: state[newCategory].tasks.map(task =>
            task.taskID === taskID
              ? { ...task, taskName, taskDescription, taskDate }
              : task,
          ),
        },
      };
    }
    case 'DELETE_TASK': {
      const { taskID, category } = action.payload;
      return {
        ...state,
        [category]: {
          ...state[category],
          tasks: state[category].tasks.filter(task => task.taskID !== taskID),
        },
      };
    }
    default:
      return state;
  }
};
