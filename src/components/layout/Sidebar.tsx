import { useState } from "react";
import { FaCalendarAlt, FaPlus, FaSun, FaMoon } from "react-icons/fa";
import { useTasks } from "../../context/TaskContext";

export default function Sidebar() {
  const [isDark, setIsDark] = useState(false);
  const { tasks } = useTasks();

  const planning = tasks.filter((t) => t.status === "planning").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length;

  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="w-64 bg-white p-4 border-r shadow-sm h-screen flex flex-col justify-between dark:bg-gray-900 dark:text-white">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          TaskForge
        </h2>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Tags
          </h3>
          <div className="space-y-1">
            <div className="cursor-pointer text-gray-600 hover:text-blue-600 dark:hover:text-blue-400">
              # Frontend
            </div>
            <div className="cursor-pointer text-gray-600 hover:text-blue-600 dark:hover:text-blue-400">
              # Backend
            </div>
            <div className="cursor-pointer text-gray-600 hover:text-blue-600 dark:hover:text-blue-400">
              # Urgent
            </div>
          </div>
        </div>

        <div className="mb-6">
          <button className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            Edit Tags
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            Progress Summary
          </h3>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Planning</span>
              <span>{planning}</span>
            </div>
            <div className="flex justify-between">
              <span>In Progress</span>
              <span>{inProgress}</span>
            </div>
            <div className="flex justify-between">
              <span>Done</span>
              <span>{done}</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Completion</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Calendar
          </h3>
          <div className="flex items-center justify-center text-gray-400 text-4xl">
            <FaCalendarAlt />
          </div>
          <p className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">
            Coming soon
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition">
          <FaPlus className="mr-2" /> Add Task
        </button>

        <button
          onClick={() => setIsDark(!isDark)}
          className="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {isDark ? (
            <>
              <FaSun className="mr-2" /> Light Mode
            </>
          ) : (
            <>
              <FaMoon className="mr-2" /> Dark Mode
            </>
          )}
        </button>
      </div>
    </div>
  );
}
