import { useState, useEffect } from "react";
import type { Task } from "../../types/task";
import { useTasks } from "../../context/TaskContext";
import CreatableSelect from "react-select/creatable";

type Props = {
  task: Task | null;
  onClose: () => void;
};

export default function EditTaskModal({ task, onClose }: Props) {
  const { updateTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"planning" | "in-progress" | "done">(
    "planning"
  );
  const [dueDate, setDueDate] = useState("");
  const [selectedTags, setSelectedTags] = useState<
    { label: string; value: string }[]
  >([]);

  const availableTags = [
    { value: "urgent", label: "Urgent" },
    { value: "feature", label: "Feature" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
  ];

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
      setSelectedTags(
        (task.tags || []).map((tag) => ({
          label: tag,
          value: tag,
        }))
      );
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    const updatedTask: Task = {
      ...task,
      title,
      description,
      dueDate,
      tags: selectedTags.map((tag) => tag.value),
      status,
    };

    updateTask(updatedTask);
    onClose();
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            autoFocus
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows={3}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <CreatableSelect
            isMulti
            options={availableTags}
            value={selectedTags}
            onChange={(newValue) =>
              setSelectedTags(newValue as { label: string; value: string }[])
            }
            classNamePrefix="react-select"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
