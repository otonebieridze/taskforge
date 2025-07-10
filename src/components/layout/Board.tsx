import { useState, useMemo } from "react";
import { FaLightbulb } from "react-icons/fa";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

import Column from "../board/Column";
import { useTasks } from "../../context/TaskContext";
import { useTags } from "../../context/TagContext";
import type { Task } from "../../types/task";
import EditTagsModal from "../modals/EditTagsModal";
import Select from "react-select";

export default function Board() {
  const { tasks, updateTask } = useTasks();
  const { tags: allTags } = useTags();

  const [showEditTags, setShowEditTags] = useState(false);
  const [selectedTagOptions, setSelectedTagOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const selectedTagIds = selectedTagOptions.map((tag) => tag.value);

  const filteredTasks = useMemo(() => {
    if (selectedTagIds.length === 0) return tasks;

    return tasks.filter((task) =>
      task.tags?.some((tagId) => selectedTagIds.includes(tagId))
    );
  }, [tasks, selectedTagIds]);

  const planning = filteredTasks.filter((t) => t.status === "planning");
  const inProgress = filteredTasks.filter((t) => t.status === "in-progress");
  const done = filteredTasks.filter((t) => t.status === "done");

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const draggedTask = tasks.find((t) => t.id.toString() === draggableId);
    if (!draggedTask) return;

    updateTask({
      ...draggedTask,
      status: destination.droppableId as Task["status"],
    });
  };

  const tagOptions = allTags.map((tag) => ({
    label: tag.label,
    value: tag.id,
  }));

  return (
    <>
      <div className="p-4">
        <h1 className="text-xl font-semibold">Your Tasks</h1>
        <span className="flex items-center gap-1 text-base text-gray-500 mt-1">
          <FaLightbulb className="text-yellow-300" />
          Drag tasks to organize your workflow
        </span>

        <div className="flex items-center gap-4 mt-4">
          <Select
            isMulti
            options={tagOptions}
            value={selectedTagOptions}
            onChange={(newValue) =>
              setSelectedTagOptions(
                newValue as { label: string; value: string }[]
              )
            }
            className="min-w-[200px] max-w-xs text-sm"
            classNamePrefix="react-select"
            placeholder="Filter by tags"
          />

          <button
            onClick={() => setShowEditTags(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Edit Tags
          </button>
        </div>

        <EditTagsModal
          isOpen={showEditTags}
          onClose={() => setShowEditTags(false)}
        />
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
