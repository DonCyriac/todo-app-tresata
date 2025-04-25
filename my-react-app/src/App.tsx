import add from '@/assets/plus.png';
import { useReducer, useState } from 'react';
import './App.css';
import { Navbar } from './components';
import { AddTask } from './components/add-task.component';
import { EditTask } from './components/edit-task.component';
import { ToDoList } from './components/to-do-list.component';
import { Task, TaskCategoryText, ToDoListState } from './components/types';
import { initialState, reducer } from './state/reducer';
import { Pages } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState(Pages.LIST);
  const [currentEditTask, setCurrentEditTask] = useState<
    | (Task & { category: keyof ToDoListState; categoryText: TaskCategoryText })
    | null
  >(null);
  const [todoList, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onBackButtonClick={() => {
          setCurrentPage(Pages.LIST);
          setCurrentEditTask(null);
        }}
      />
      <div className="px-8 sm:px-4">
        {currentPage === Pages.LIST && (
          <ToDoList
            todoList={todoList}
            onEditClick={(
              task: Task & {
                category: keyof ToDoListState;
                categoryText: TaskCategoryText;
              },
            ) => {
              setCurrentPage(Pages.EDIT);
              setCurrentEditTask(task);
            }}
            onDeleteClick={(taskId: string, category: keyof ToDoListState) => {
              dispatch({
                type: 'DELETE_TASK',
                payload: {
                  taskID: taskId,
                  category: category,
                },
              });
            }}
          />
        )}
        {currentPage === Pages.ADD && (
          <AddTask
            onCancel={() => {
              setCurrentPage(Pages.LIST);
              setCurrentEditTask(null);
            }}
            onUpdate={(
              taskID: string,
              taskName: string,
              taskDate: string,
              taskDescription: string,
              category: TaskCategoryText,
            ) => {
              setCurrentPage(Pages.LIST);
              setCurrentEditTask(null);
              dispatch({
                type: 'ADD_TASK',
                payload: {
                  taskID,
                  taskName,
                  taskDate,
                  taskDescription,
                  category,
                },
              });
            }}
          />
        )}
        {currentPage === Pages.EDIT && (
          <EditTask
            {...(currentEditTask as Task & {
              category: keyof ToDoListState;
              categoryText: TaskCategoryText;
            })}
            onCancel={() => {
              setCurrentPage(Pages.LIST);
              setCurrentEditTask(null);
            }}
            onUpdate={(
              taskID: string,
              taskName: string,
              taskDate: string,
              taskDescription: string,
              newCategory: TaskCategoryText,
              oldCategory: TaskCategoryText,
            ) => {
              setCurrentPage(Pages.LIST);
              setCurrentEditTask(null);
              dispatch({
                type: 'EDIT_TASK',
                payload: {
                  taskID,
                  taskName,
                  taskDate,
                  taskDescription,
                  newCategory,
                  oldCategory,
                },
              });
            }}
          />
        )}
      </div>
      {currentPage === Pages.LIST && (
        <button
          className="fixed right-10 bottom-10 bg-blue-900 rounded-full p-4"
          onClick={() => setCurrentPage(Pages.ADD)}
        >
          <img src={add} alt="" width={24} className="h-6" />
        </button>
      )}
    </>
  );
}

export default App;
