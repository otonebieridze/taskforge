export default function TaskInput() {
  return (
    <div className="flex gap-2 mb-4">
      <input className="border rounded p-2 w-64" placeholder="Add a new task" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
        Add Task
      </button>
    </div>
  );
}
