import { FaTrashAlt } from "react-icons/fa";
import type { Task } from "../../types/task";
import { useTasks } from "../../context/TaskContext";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md space-y-2 cursor-pointer mt-4">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
        <FaTrashAlt
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
          size={18}
        />
      </div>

      {task.description && (
        <p className="text-sm text-gray-600">{task.description}</p>
      )}

      {task.dueDate && (
        <p className="text-sm text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-5">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
