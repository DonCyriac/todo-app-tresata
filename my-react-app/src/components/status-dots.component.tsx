import { TaskCategoryText } from './types';

export const StatusDot = ({ status }: { status: TaskCategoryText }) => {
  const statusColors = {
    [TaskCategoryText.IN_PROGRESS]: 'bg-yellow-500',
    [TaskCategoryText.COMPLETED]: 'bg-green-500',
    [TaskCategoryText.PENDING]: 'bg-red-500',
  };

  return (
    <span
      className={`w-3 h-3 rounded-full ${statusColors[status]}`}
      title={status}
      content=""
    ></span>
  );
};
