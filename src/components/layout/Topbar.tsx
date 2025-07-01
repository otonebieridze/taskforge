import { useState } from "react";
import CreateTaskModal from "../modals/CreateTaskModal";

export default function Topbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-4 border-b bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-semibold">TaskForge</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          + New Task
        </button>
      </div>
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
