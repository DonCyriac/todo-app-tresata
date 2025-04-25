import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import pencil from '../assets/Pencil.png';
import trash from '../assets/Trash.png';
import { Task, TaskCategoryText, ToDoListState } from './types';

export const ToDoList = ({
  todoList,
  onEditClick,
  onDeleteClick,
}: {
  todoList: ToDoListState;
  onEditClick: (
    task: Task & {
      category: keyof ToDoListState;
      categoryText: TaskCategoryText;
    },
  ) => void;
  onDeleteClick: (taskId: string, category: keyof ToDoListState) => void;
}) => {
  return (
    <div className="pt-4">
      {Object.keys(todoList).map(todoCategory => (
        <div className="pt-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="bg-blue-50">
              <AccordionTrigger>
                <p className="pl-4">
                  {todoList[todoCategory as keyof ToDoListState].category}{' '}
                  &nbsp; (
                  {todoList[todoCategory as keyof ToDoListState].tasks.length})
                </p>
              </AccordionTrigger>
              <AccordionContent className="bg-white">
                {todoList[todoCategory as keyof ToDoListState].tasks.length ===
                  0 && <p>Nothing to show</p>}
                {todoList[todoCategory as keyof ToDoListState].tasks.map(
                  task => (
                    <div className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                      <div className="flex justify-between">
                        <p>{task.taskName}</p>
                        <p>
                          {
                            todoList[todoCategory as keyof ToDoListState]
                              .category
                          }
                        </p>
                      </div>
                      <p>{task.taskDescription}</p>
                      <div className="flex justify-between">
                        <p>{task.taskDate}</p>
                        <div className="flex">
                          <button
                            onClick={() =>
                              onEditClick({
                                ...task,
                                category: todoCategory as keyof ToDoListState,
                                categoryText:
                                  todoList[todoCategory as keyof ToDoListState]
                                    .category,
                              })
                            }
                          >
                            <img
                              src={pencil}
                              alt=""
                              width={25}
                              className="h-6"
                            />
                          </button>
                          <button
                            onClick={() =>
                              onDeleteClick(
                                task.taskID,
                                todoCategory as keyof ToDoListState,
                              )
                            }
                          >
                            <img src={trash} alt="" width={25} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};
