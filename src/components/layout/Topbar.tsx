import { useState } from "react";
import CreateTaskModal from "../modals/CreateTaskModal";
import { GiHamburgerMenu } from "react-icons/gi";

type TopbarProps = {
  onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-5 bg-white dark:bg-gray-800 transition-colors duration-300 shadow-sm flex justify-between lg:justify-start items-center gap-6">
        <GiHamburgerMenu
          className="text-gray-900 dark:text-gray-100 lg:hidden cursor-pointer"
          onClick={onMenuClick}
          size={25}
        />

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded cursor-pointer transition-colors duration-300"
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
