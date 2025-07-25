import { useState } from "react";
import { useTags } from "../../context/TagContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EditTagsModal({ isOpen, onClose }: Props) {
  const { tags, deleteTag, editTag } = useTags();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState("");

  if (!isOpen) return null;

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedValue(tags[index].id);
  };

  const handleSave = () => {
    if (!editedValue.trim()) return;

    const oldValue = tags[editIndex!].id;

    editTag(oldValue, {
      id: editedValue.trim(),
      label: editedValue.trim(),
    });

    setEditIndex(null);
    setEditedValue("");
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedValue("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700 max-h-[95vh]">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Edit Tags
        </h2>

        {tags.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No tags to edit.</p>
        ) : (
          <ul className="space-y-3 max-h-[70vh] overflow-y-auto">
            {tags.map((tag, index) => (
              <li
                key={tag.id}
                className="flex items-center justify-between gap-2 border rounded-lg px-3 py-2 border-gray-200 dark:border-gray-700"
              >
                {editIndex === index ? (
                  <div className="flex items-center justify-between gap-2 w-full">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-1/2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      placeholder="Value"
                    />
                    <div className="flex items-center gap-2">
                    <button
                      className="text-blue-600 font-medium hover:underline dark:text-blue-400"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-500 hover:underline dark:text-gray-400"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-gray-700 dark:text-gray-200 break-all">
                      {tag.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(index)}
                        className="text-blue-600 text-sm hover:underline dark:text-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTag(tag.id)}
                        className="text-red-600 text-sm hover:underline dark:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
