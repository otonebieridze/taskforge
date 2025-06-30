import { useEffect, useState } from "react";
import type { Task } from "../types/task";

export function useTasks() {
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

  const addTask = (title: string, status: Task["status"]) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      status,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTitle = (id: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleComplete,
    editTitle,
  };
}
