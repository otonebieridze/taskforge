import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaPlus, FaSun, FaMoon } from "react-icons/fa";
import { useTasks } from "../../context/TaskContext";

export default function Sidebar() {
  const [isDark, setIsDark] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { tasks } = useTasks();

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
    <div className="w-64 bg-white p-4 border-r shadow-sm h-screen flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          TaskForge
        </h2>

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
          <h3 className="text-sm font-semibold mb-2 text-gray-700">
            Calendar
          </h3>
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)}
            value={selectedDate}
            tileContent={({ date, view }) => {
              const hasTasks = tasks.some(
                (task) =>
                  task.dueDate &&
                  new Date(task.dueDate).toDateString() === date.toDateString()
              );
              return hasTasks && view === "month" ? (
                <div className="text-blue-500 text-center text-xs">•</div>
              ) : null;
            }}
            tileClassName={({ date }) => {
              if (
                selectedDate &&
                date.toDateString() === selectedDate.toDateString()
              ) {
                return "bg-blue-100";
              }
            }}
            className="rounded-lg shadow-sm border border-gray-200"
          />
          {selectedDate && (
            <div className="mt-2 text-xs text-gray-700">
              {tasksDueToday.length > 0 ? (
                <>
                  {tasksDueToday.length}{" "}
                  {tasksDueToday.length === 1 ? "task" : "tasks"} due on{" "}
                  {selectedDate.toDateString()}
                </>
              ) : (
                <>No tasks due on {selectedDate.toDateString()}</>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition">
          <FaPlus className="mr-2" /> Add Task
        </button>

        <button
          onClick={() => setIsDark(!isDark)}
          className="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
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
