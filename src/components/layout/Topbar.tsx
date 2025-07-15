import { useState } from "react";
import CreateTaskModal from "../modals/CreateTaskModal";

export default function Topbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-5 bg-white dark:bg-gray-800 transition-colors duration-300 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          TaskForge
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
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
