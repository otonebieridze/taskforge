import { useState } from "react";

type Props = {
  addTask: (title: string) => void;
};

export default function TaskInput({ addTask }: Props) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim() === "") return;
    addTask(title);
    setTitle("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border rounded p-2 w-64"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        onClick={handleAdd}
      >
        Add Task
      </button>
    </div>
  );
}
