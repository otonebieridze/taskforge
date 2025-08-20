import { useEffect } from "react";

import { useTasks } from "../../context/TaskContext";
import { useTags } from "../../context/TagContext";
import { useTheme } from "../../context/ThemeContext";

import CreatableSelect from "react-select/creatable";
import { components, type InputProps } from "react-select";

import { useForm, Controller } from "react-hook-form";
import type { Task } from "../../types/task";
import { getCustomSelectStyles, type OptionType } from "../../styles/selectStyles";

type Props = {
  task: Task | null;
  onClose: () => void;
};

type FormData = {
  title: string;
  description: string;
  dueDate: string;
  status: Task["status"];
  tags: { label: string; value: string }[];
};

export default function EditTaskModal({ task, onClose }: Props) {
  const { updateTask } = useTasks();
  const { tags: availableTags, addTag } = useTags();
  const { isDark } = useTheme();

  const customSelectStyles = getCustomSelectStyles(isDark);

  const CustomInput = (props: InputProps<OptionType, true>) => {
    return <components.Input {...props} maxLength={20} />;
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      status: "planning",
      tags: [],
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        dueDate: task.dueDate || "",
        status: task.status,
        tags: (task.tags || []).map((tag) => ({
          label: tag,
          value: tag,
        })),
      });
    }
  }, [task, reset]);

  const onSubmit = (data: FormData) => {
    if (!task) return;

    const updatedTask: Task = {
      ...task,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      status: data.status,
      tags: data.tags.map((tag) => tag.value),
    };

    updateTask(updatedTask);
    onClose();
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-[90vw] max-w-md border border-gray-200 dark:border-gray-700 max-h-[95vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Title
            </label>
            <input
              autoFocus
              type="text"
              placeholder="Task title"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Description
            </label>
            <textarea
              placeholder="Description (optional)"
              {...register("description")}
              rows={2}
              className="w-full max-h-24 overflow-auto border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Due Date
            </label>
            <input
              type="date"
              {...register("dueDate", { required: "Due date is required" })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
              aria-invalid={!!errors.dueDate}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Tags
            </label>
            <Controller
              control={control}
              name="tags"
              render={({ field: { onChange, value } }) => (
                <CreatableSelect
                  isMulti
                  components={{ Input: CustomInput }}
                  options={availableTags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  value={value}
                  onChange={(newValue) => onChange(newValue)}
                  onCreateOption={(label) => {
                    addTag(label);
                    onChange([
                      ...(value || []),
                      { label, value: label.toLowerCase() },
                    ]);
                  }}
                  classNamePrefix="react-select"
                  styles={customSelectStyles}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
