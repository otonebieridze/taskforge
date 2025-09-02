import type { Task } from "../types/task";
import type { Tag } from "../types/tag";

export const DEFAULT_TASKS: Task[] = [
  {
    id: 1,
    title: "Welcome to TaskForge!",
    description: "Organize tasks into columns like Planning, In Progress, and Done. Try dragging me to another column to get started!",
    tags: ["onboarding", "tutorial"],
    status: "planning",
    dueDate: "2025-09-25",
  },
  {
    id: 2,
    title: "Move a task",
    description: "Drag a task to another column to change its status.",
    tags: ["tutorial"],
    status: "in-progress",
    dueDate: "2025-10-06",
  },
  {
    id: 3,
    title: "Mark a task as done",
    description: "When you finish something, drag it into the Done column. Celebrate small wins 🎉",
    tags: ["motivation"],
    status: "done",
    dueDate: "2025-10-18",
  },
];

export const DEFAULT_TAGS: Tag[] = [
  { id: "onboarding", label: "onboarding" },
  { id: "tutorial", label: "tutorial" },
  { id: "motivation", label: "motivation" },
];
