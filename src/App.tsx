import { useState } from "react";

import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn React", completed: true },
    { id: 2, title: "Write Code", completed: true },
    { id: 3, title: "Push Code to GitHub", completed: false },
  ]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <Header />
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}
