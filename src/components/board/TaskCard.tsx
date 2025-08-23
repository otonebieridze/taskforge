import { FaTrashAlt } from "react-icons/fa";
import type { Task } from "../../types/task";
import { useTasks } from "../../context/TaskContext";
import EditTaskModal from "../modals/EditTaskModal";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteTask } = useTasks();

  return (
    <>
      <motion.div
        layout
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsEditing(true)}
        className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 transition duration-300 space-y-2 cursor-pointer select-none"
      >
        <div className="w-full flex items-start justify-between gap-2">
          <p lang="en" className="text-base font-semibold text-gray-800 dark:text-zinc-100 break-words hyphens-auto max-w-[85%]">
            {task.title}
          </p>
          <FaTrashAlt
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-600 min-w-[18px] min-h-[18px]"
            size={18}
          />
        </div>

        {task.description && (
          <p lang="en" className="text-sm text-gray-600 dark:text-zinc-300 break-words hyphens-auto max-w-full">
            {task.description}
          </p>
        )}

        {task.dueDate && (
          <p className="text-xs text-gray-500 dark:text-zinc-400 italic">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="flex text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-xl break-words hyphens-auto"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      <EditTaskModal
        task={isEditing ? task : null}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
}
