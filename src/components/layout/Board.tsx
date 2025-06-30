import Column from "../board/Column";
import { useTasks } from "../../context/TaskContext";

export default function Board() {
  const { tasks } = useTasks();

  const planning = tasks.filter((t) => t.status === "planning");
  const inProgress = tasks.filter((t) => t.status === "in-progress");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      <Column title="Planning" tasks={planning} />
      <Column title="In Progress" tasks={inProgress} />
      <Column title="Done" tasks={done} />
    </div>
  );
}
