import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Board from "./components/layout/Board";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden pl-72">
        <Topbar />
        <Board />
      </div>
    </div>
  );
}

export default App;
