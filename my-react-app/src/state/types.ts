import { ToDoListState } from '@/components/types';

type Delete = {
  type: 'DELETE_TASK';
  payload: {
    taskID: string;
    category: keyof ToDoListState;
  };
};

type Add = {
  type: 'ADD_TASK';
  payload: {
    taskID: string;
    taskName: string;
    taskDescription: string;
    taskDate: string;
    category: keyof ToDoListState;
  };
};

type Edit = {
  type: 'EDIT_TASK';
  payload: {
    taskID: string;
    taskName: string;
    taskDescription: string;
    taskDate: string;
    newCategory: keyof ToDoListState;
    oldCategory: keyof ToDoListState;
  };
};

export type ToDoListActions = Delete | Add | Edit;
