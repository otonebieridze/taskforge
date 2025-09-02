import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useTasks } from "./TaskContext";
import type { Tag } from "../types/tag";
import { DEFAULT_TAGS } from "../constants/constants";

type TagContextType = {
  tags: Tag[];
  addTag: (label: string) => void;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  deleteTag: (value: string) => void;
  editTag: (oldValue: string, newTag: Tag) => void;
};

const TagContext = createContext<TagContextType | undefined>(undefined);

export function TagProvider({ children }: { children: ReactNode }) {
  const [tags, setTags] = useState<Tag[]>(() => {
    try {
      const stored = localStorage.getItem("tags");
      return stored ? JSON.parse(stored) : DEFAULT_TAGS;
    } catch (error) {
      console.error("Failed to parse tags from localStorage", error);
      return DEFAULT_TAGS;
    }
  });

  const { tasks, setTasks } = useTasks();

  useEffect(() => {
    try {
      localStorage.setItem("tags", JSON.stringify(tags));
    } catch (error) {
      console.error("Failed to save tags to localStorage", error);
    }
  }, [tags]);

  const addTag = (label: string) => {
    const exists = tags.some(
      (tag) => tag.label.toLowerCase() === label.toLowerCase()
    );
    if (!exists) {
      const newTag: Tag = { id: label.toLowerCase(), label };
      setTags((prev) => [...prev, newTag]);
    }
  };

  const deleteTag = (id: string) => {
    const updatedTags = tags.filter((t) => t.id !== id);
    setTags(updatedTags);

    const updatedTasks = tasks.map((task) => ({
      ...task,
      tags: task.tags ? task.tags.filter((tag) => tag !== id) : [],
    }));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editTag = (oldValue: string, newTag: Tag) => {
    const updatedTags = tags.map((t) => (t.id === oldValue ? newTag : t));
    setTags(updatedTags);

    const updatedTasks = tasks.map((task) => ({
      ...task,
      tags: task.tags
        ? task.tags.map((tag) => (tag === oldValue ? newTag.id : tag))
        : [],
    }));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <TagContext.Provider value={{ tags, addTag, setTags, deleteTag, editTag }}>
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  const context = useContext(TagContext);
  if (!context) throw new Error("useTags must be used within a TagProvider");
  return context;
}
