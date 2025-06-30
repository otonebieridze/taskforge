import { FaCheckSquare, FaRegSquare, FaTrashAlt } from "react-icons/fa";
import type { Task } from "../../types/task";
import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const { toggleComplete, deleteTask, editTitle } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded shadow hover:shadow-md">
      <div className="flex items-center gap-2">
        <span
          onClick={() => toggleComplete(task.id)}
          className="cursor-pointer"
        >
          {task.completed ? (
            <FaCheckSquare className="text-green-600" size={18} />
          ) : (
            <FaRegSquare className="text-gray-500" size={18} />
          )}
        </span>

        {isEditing ? (
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              if (editValue.trim()) editTitle(task.id, editValue.trim());
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
                if (editValue.trim()) editTitle(task.id, editValue.trim());
              }
            }}
            className="text-sm bg-transparent border-b border-gray-300 focus:outline-none"
          />
        ) : (
          <span
            onClick={() => {
              if (!task.completed) {
                setIsEditing(true);
                setEditValue(task.title);
              }
            }}
            className={`text-sm ${
              task.completed ? "line-through text-gray-400" : "cursor-text"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>
      <FaTrashAlt
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700 cursor-pointer"
        size={18}
      />
    </div>
  );
}
