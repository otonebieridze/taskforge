import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Board from "./components/layout/Board";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden pl-64">
        <Topbar />
        <Board />
      </div>
    </div>
  );
}

export default App;
