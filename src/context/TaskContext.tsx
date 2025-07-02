import { useEffect, useState, createContext, useContext } from "react";
import type { Task } from "../types/task";

type TaskContextType = {
  tasks: Task[];
  addTask: (
    title: string,
    status: Task["status"],
    description?: string,
    dueDate?: string,
    tags?: string[]
  ) => void;
  deleteTask: (id: number) => void;
  updateTask: (updatedTask: Task) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        console.error("Invalid JSON in localStorage");
      }
    }
    return [
      {
        id: 1,
        title: "Example task",
        completed: false,
        status: "planning",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (
    title: string,
    status: Task["status"],
    description?: string,
    dueDate?: string,
    tags?: string[]
  ) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      status,
      description,
      dueDate,
      tags,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside <TaskProvider>");
  return context;
};
