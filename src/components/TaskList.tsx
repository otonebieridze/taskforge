import TaskItem from "./TaskItem";
import type { Task } from "../App";

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  return (
    <div className="w-full max-w-md">
      {tasks.map((task) => (
        <TaskItem key={task.id} title={task.title} completed={task.completed} />
      ))}
    </div>
  );
}
