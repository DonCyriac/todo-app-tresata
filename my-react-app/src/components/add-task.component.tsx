import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { StatusDot } from './status-dots.component';
import { TaskCategoryText } from './types';

export const AddTask = ({
  onCancel,
  onUpdate,
}: {
  onCancel: () => void;
  onUpdate: (
    taskID: string,
    taskName: string,
    taskDate: string,
    taskDescription: string,
    category: TaskCategoryText,
  ) => void;
}) => {
  const [taskNameInput, setTaskNameInput] = useState('');
  const [taskDescriptionInput, setTaskDescriptionInput] = useState('');
  const [taskCategoryInput, setTaskCategoryInput] = useState(
    TaskCategoryText.PENDING,
  );
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  return (
    <div className="pt-8">
      <div className="border border-gray-300 rounded-md p-2 ">
        <input
          value={taskNameInput}
          onChange={e => setTaskNameInput(e.target.value)}
          className="focus:outline-none"
        ></input>
      </div>
      <div className="border border-gray-300 rounded-md p-2 mt-4">
        <textarea
          className="flex min-h-[60px] w-full focus:outline-none"
          value={taskDescriptionInput}
          onChange={e => setTaskDescriptionInput(e.target.value)}
        ></textarea>
      </div>
      <div className="relative">
        <button
          className="flex justify-between items-center cursor-pointer  w-full border border-gray-300 rounded-md p-2 mt-4"
          onClick={() => setShowCategoryOptions(prev => !prev)}
        >
          <div className="flex items-center">
            <StatusDot status={taskCategoryInput} />
            <p className="hover:bg-gray-100 px-4 py-2">{taskCategoryInput}</p>
          </div>
          <ChevronDownIcon
            className={`text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 ${showCategoryOptions ? 'rotate-180' : ''}`}
          />
        </button>
        {showCategoryOptions && (
          <div className="absolute w-full bg-white top-16 border border-gray-300 shadow-md py-2">
            {Object.keys(TaskCategoryText).map(listCategory => (
              <button
                className="flex items-center cursor-pointer hover:bg-gray-100 px-2 w-full"
                onClick={() => {
                  setTaskCategoryInput(
                    TaskCategoryText[
                      listCategory as keyof typeof TaskCategoryText
                    ],
                  );
                  setShowCategoryOptions(false);
                }}
              >
                <StatusDot
                  status={
                    TaskCategoryText[
                      listCategory as keyof typeof TaskCategoryText
                    ]
                  }
                />
                <p key={listCategory} className="hover:bg-gray-100 px-4 py-2">
                  {
                    TaskCategoryText[
                      listCategory as keyof typeof TaskCategoryText
                    ]
                  }
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="py-2 px-8 border border-blue-900 rounded-md text-blue-900"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="py-2 px-8 bg-blue-900 text-white rounded-md"
          disabled={!taskNameInput && !taskDescriptionInput}
          onClick={() => {
            onUpdate(
              Math.random().toString(36).substring(2, 9),
              taskNameInput,
              new Date().toLocaleDateString(),
              taskDescriptionInput,
              taskCategoryInput,
            );
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};
