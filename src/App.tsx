import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Board from "./components/layout/Board";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden lg:pl-72">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <Board />
      </div>
    </div>
  );
}

export default App;
