import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import CreatableSelect from "react-select/creatable";
import type { Task } from "../../types/task";
import { useTags } from "../../context/TagContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateTaskModal({ isOpen, onClose }: Props) {
  const { addTask } = useTasks();
  const { tags: availableTags, addTag } = useTags();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"planning" | "in-progress" | "done">(
    "planning"
  );
  const [dueDate, setDueDate] = useState("");
  const [selectedTags, setSelectedTags] = useState<
    { label: string; value: string }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = selectedTags.map((tag) => tag.value);

    selectedTags.forEach((tag) => {
      const exists = availableTags.some((t) => t.id === tag.value);
      if (!exists) {
        addTag(tag.label);
      }
    });

    addTask(title.trim(), status, description, dueDate, tags);
    setTitle("");
    setDescription("");
    setStatus("planning");
    setDueDate("");
    setSelectedTags([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            autoFocus
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            options={availableTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            value={selectedTags}
            onChange={(newValue) =>
              setSelectedTags(newValue as { label: string; value: string }[])
            }
            onCreateOption={(inputValue) => {
              const newTag = {
                label: inputValue,
                value: inputValue.toLowerCase(),
              };
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            classNamePrefix="react-select"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
