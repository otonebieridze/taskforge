import { useState } from "react";
import CreateTaskModal from "../modals/CreateTaskModal";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaMoon, FaSun } from "react-icons/fa";

import { useTheme } from "../../context/ThemeContext";

type TopbarProps = {
  onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDark, setIsDark } = useTheme();

  return (
    <>
      <div className="p-5 bg-white dark:bg-gray-800 transition-colors duration-300 shadow-sm flex justify-between lg:justify-start items-center gap-8">
        <GiHamburgerMenu
          className="text-gray-900 dark:text-gray-100 lg:hidden cursor-pointer"
          onClick={onMenuClick}
          size={25}
        />

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 max-sm:hidden">
          Dashboard
        </h1>

        <div className="flex justify-between items-center gap-2 text-sm">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded cursor-pointer transition-colors duration-300"
          >
            + New Task
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="hidden items-center justify-center gap-2 px-5 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium cursor-pointer transition-colors duration-300 [@media(max-height:772px)]:flex"
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
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
