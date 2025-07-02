import Column from "../board/Column";
import { useTasks } from "../../context/TaskContext";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

import { FaLightbulb } from "react-icons/fa";

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
    <>
      <div className="p-4">
        <h1 className="text-xl font-semibold">Your Tasks</h1>
        <span className="flex items-center gap-1 text-base text-gray-500 mt-1">
          <FaLightbulb className="text-yellow-300" /> Drag tasks to organize your workflow
        </span>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto p-4 items-start">
          <Column title="Planning" tasks={planning} status="planning" />
          <Column title="In Progress" tasks={inProgress} status="in-progress" />
          <Column title="Done" tasks={done} status="done" />
        </div>
      </DragDropContext>
    </>
  );
}
