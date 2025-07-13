import TaskCard from "./TaskCard";
import type { Task } from "../../types/task";
import { Droppable, Draggable } from "@hello-pangea/dnd";

type Props = {
  title: string;
  tasks: Task[];
  status: Task["status"];
};

export default function Column({ title, tasks, status }: Props) {
  return (
    <div className="bg-white w-72 p-4 rounded-2xl shadow-md border border-zinc-200 flex-shrink-0">
      <h2 className="font-semibold text-lg text-zinc-800 mb-4">
        {title}
      </h2>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`rounded-xl p-2 min-h-[120px] space-y-3 transition-colors duration-200 border-2 border-dashed
        ${
          snapshot.isDraggingOver
            ? "border-blue-400 bg-blue-50"
            : "border-transparent"
        }`}
          >
            {tasks.length === 0 && (
              <p className="text-sm text-zinc-400 italic text-center py-6">
                No tasks here
              </p>
            )}

            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
