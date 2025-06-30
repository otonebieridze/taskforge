import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

import { useTasks } from "./hooks/useTasks";

export default function App() {
  const { tasks, addTask, deleteTask, toggleComplete, editTitle } = useTasks();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <Header />
      <TaskInput addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        editTitle={editTitle}
      />
    </div>
  );
}
