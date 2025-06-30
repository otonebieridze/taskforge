export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  status: "planning" | "in-progress" | "done";
};