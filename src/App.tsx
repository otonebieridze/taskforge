import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Board from "./components/layout/Board";

function App() {
  return (
    <div className="h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <Board />
      </div>
    </div>
  );
}

export default App;
