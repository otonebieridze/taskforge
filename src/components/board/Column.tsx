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
    <div className="bg-gray-50 p-3 w-72 rounded shadow-sm border flex-shrink-0">
      <h2 className="font-semibold text-lg mb-3">{title}</h2>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 min-h-[100px] transition-colors duration-300
        ${snapshot.isDraggingOver ? "bg-blue-50 border-blue-400" : "bg-gray-50"}
        p-2 rounded-lg`}
          >
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
