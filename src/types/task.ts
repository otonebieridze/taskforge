export type Task = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  tags?: string[];
  status: "planning" | "in-progress" | "done";
};