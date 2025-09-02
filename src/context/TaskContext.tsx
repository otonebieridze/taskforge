import { useEffect, useState, createContext, useContext } from "react";
import type { Task } from "../types/task";
import { DEFAULT_TASKS } from "../constants/constants";

type TaskContextType = {
  tasks: Task[];
  addTask: (
    title: string,
    status: Task["status"],
    description?: string,
    dueDate?: string,
    tags?: string[]
  ) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  deleteTask: (id: number) => void;
  updateTask: (updatedTask: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : DEFAULT_TASKS;
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
      return DEFAULT_TASKS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage", error);
    }
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
    <TaskContext.Provider
      value={{ tasks, addTask, setTasks, deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside <TaskProvider>");
  return context;
};
