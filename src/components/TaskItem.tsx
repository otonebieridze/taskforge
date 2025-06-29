import { FaCheckSquare, FaRegSquare, FaTrashAlt } from "react-icons/fa";
import type { Task } from "../App";

type Props = {
  task: Task;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
};

export default function TaskItem({ task, deleteTask, toggleComplete }: Props) {
  return (
    <div className="flex items-center justify-between bg-white p-2 rounded shadow mb-2">
      <div
        className={`flex items-center gap-2 cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
        onClick={() => toggleComplete(task.id)}
      >
        <span>
          {task.completed ? (
            <FaCheckSquare className="text-green-600" size={20} />
          ) : (
            <FaRegSquare className="text-gray-500" size={20} />
          )}
        </span>
        <span>{task.title}</span>
      </div>
      <FaTrashAlt
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700 cursor-pointer"
        size={20}
      />
    </div>
  );
}
