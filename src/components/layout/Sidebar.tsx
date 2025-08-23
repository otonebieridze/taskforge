import { useState } from "react";
import { FaPlus, FaSun, FaMoon } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import CreateTaskModal from "../modals/CreateTaskModal";
import "../../styles/sidebar.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useTasks } from "../../context/TaskContext";
import { useTheme } from "../../context/ThemeContext";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks } = useTasks();
  const { isDark, setIsDark } = useTheme();

  const planning = tasks.filter((t) => t.status === "planning").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length;

  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  const tasksDueToday = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return (
      selectedDate && taskDate.toDateString() === selectedDate.toDateString()
    );
  });

  return (
    <div
      className={`sidebar w-full sm:w-72 h-screen fixed z-50 overflow-y-auto bg-slate-50 dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-sm ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
       } flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            TaskForge
          </h2>
          <IoClose
            className="text-gray-900 dark:text-gray-100 lg:hidden cursor-pointer"
            onClick={onClose}
            size={32}
          />
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Progress Summary
          </h3>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm space-y-3">
            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Planning</span>
              <span className="text-gray-600 dark:text-gray-400">
                {planning}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">In Progress</span>
              <span className="text-gray-600 dark:text-gray-400">
                {inProgress}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Done</span>
              <span className="text-gray-600 dark:text-gray-400">{done}</span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Completion</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Calendar
          </h3>

          <div className="bg-white dark:bg-gray-800 flex justify-center items-center">
            <Calendar
              onChange={(date) => setSelectedDate(date as Date)}
              value={selectedDate}
              className="w-full text-sm"
              tileContent={({ date, view }) => {
                const hasTasks = tasks.some(
                  (task) =>
                    task.dueDate &&
                    new Date(task.dueDate).toDateString() ===
                      date.toDateString()
                );
                return hasTasks && view === "month" ? (
                  <div className="text-blue-500 text-center text-xs mt-1">
                    •
                  </div>
                ) : null;
              }}
              tileClassName={({ date }) => {
                if (
                  selectedDate &&
                  date.toDateString() === selectedDate.toDateString()
                ) {
                  return "bg-blue-100 dark:bg-blue-800 rounded-md";
                }
              }}
            />
          </div>

          {selectedDate && (
            <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 px-1">
              {tasksDueToday.length > 0 ? (
                <>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {tasksDueToday.length}
                  </span>{" "}
                  {tasksDueToday.length === 1 ? "task" : "tasks"} due on{" "}
                  <span className="font-medium">
                    {selectedDate.toDateString()}
                  </span>
                </>
              ) : (
                <>
                  No tasks due on{" "}
                  <span className="font-medium">
                    {selectedDate.toDateString()}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md cursor-pointer transition-colors duration-300"
        >
          <FaPlus className="text-sm" /> Add Task
        </button>

        <button
          onClick={() => setIsDark(!isDark)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium cursor-pointer transition-colors duration-300"
        >
          {isDark ? (
            <>
              <FaSun className="text-sm text-yellow-500" /> Light Mode
            </>
          ) : (
            <>
              <FaMoon className="text-sm text-blue-500" /> Dark Mode
            </>
          )}
        </button>
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
