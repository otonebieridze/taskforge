import TaskCard from "./TaskCard";
import type { Task } from "../../types/task";

type Props = {
  title: string;
  tasks: Task[];
};

export default function Column({ title, tasks }: Props) {
  return (
    <div className="bg-gray-50 p-3 w-72 rounded shadow-sm border flex-shrink-0">
      <h2 className="font-semibold text-lg mb-3">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
