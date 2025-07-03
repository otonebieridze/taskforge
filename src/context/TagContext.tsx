import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Tag = {
  id: string;
  label: string;
};

type TagContextType = {
  tags: Tag[];
  addTag: (label: string) => void;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
};

const TagContext = createContext<TagContextType | undefined>(undefined);

export function TagProvider({ children }: { children: ReactNode }) {
  const [tags, setTags] = useState<Tag[]>(() => {
    try {
      const stored = localStorage.getItem("tags");
      return stored
        ? JSON.parse(stored)
        : [
            { id: "example", label: "example" },
            { id: "frontend", label: "frontend" },
            { id: "backend", label: "backend" },
          ];
    } catch {
      return [
        { id: "example", label: "example" },
        { id: "frontend", label: "frontend" },
        { id: "backend", label: "backend" },
      ];
    }
  });

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

  return (
    <TagContext.Provider value={{ tags, addTag, setTags }}>
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  const context = useContext(TagContext);
  if (!context) throw new Error("useTags must be used within a TagProvider");
  return context;
}
