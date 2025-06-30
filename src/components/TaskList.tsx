import TaskItem from "./TaskItem";
import type { Task } from "../hooks/useTasks";

type Props = {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
  editTitle: (id: number, newTitle: string) => void;
};

export default function TaskList({
  tasks,
  deleteTask,
  toggleComplete,
  editTitle,
}: Props) {
  return (
    <div className="w-full max-w-md">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          editTitle={editTitle}
        />
      ))}
    </div>
  );
}
