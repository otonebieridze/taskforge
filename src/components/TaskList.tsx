import TaskItem from "./TaskItem";
import type { Task } from "../App";

type Props = {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
};

export default function TaskList({ tasks, deleteTask, toggleComplete }: Props) {
  return (
    <div className="w-full max-w-md">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}
