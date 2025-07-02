import Column from "../board/Column";
import { useTasks } from "../../context/TaskContext";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

export default function Board() {
  const { tasks, updateTask } = useTasks();

  const planning = tasks.filter((t) => t.status === "planning");
  const inProgress = tasks.filter((t) => t.status === "in-progress");
  const done = tasks.filter((t) => t.status === "done");

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const draggedTask = tasks.find((t) => t.id.toString() === draggableId);
    if (!draggedTask) return;

    updateTask({ ...draggedTask, status: destination.droppableId as any });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-4">
        <Column title="Planning" tasks={planning} status="planning" />
        <Column title="In Progress" tasks={inProgress} status="in-progress" />
        <Column title="Done" tasks={done} status="done" />
      </div>
    </DragDropContext>
  );
}
