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
        className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition duration-200 space-y-2 cursor-pointer select-none"
      >
        <div className="w-full flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-800">
            {task.title}
          </h3>
          <FaTrashAlt
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-600"
            size={16}
          />
        </div>

        {task.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}

        {task.dueDate && (
          <p className="text-xs text-gray-500 italic">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
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
