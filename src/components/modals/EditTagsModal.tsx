import { useState } from "react";
import { useTags } from "../../context/TagContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EditTagsModal({ isOpen, onClose }: Props) {
  const { tags, deleteTag, editTag } = useTags();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedLabel, setEditedLabel] = useState("");
  const [editedValue, setEditedValue] = useState("");

  if (!isOpen) return null;

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedValue(tags[index].id);
    setEditedLabel(tags[index].label);
  };

  const handleSave = () => {
    if (!editedLabel.trim() || !editedValue.trim()) return;

    const oldValue = tags[editIndex!].id;

    editTag(oldValue, {
      id: editedValue.trim(),
      label: editedLabel.trim(),
    });

    setEditIndex(null);
    setEditedLabel("");
    setEditedValue("");
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedLabel("");
    setEditedValue("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Tags</h2>

        {tags.length === 0 ? (
          <p className="text-gray-500 text-sm">No tags to edit.</p>
        ) : (
          <ul className="space-y-3">
            {tags.map((tag, index) => (
              <li
                key={tag.id}
                className="flex items-center justify-between border rounded-lg px-3 py-2"
              >
                {editIndex === index ? (
                  <div className="flex gap-2 items-center w-full">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-1/2"
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      placeholder="Value"
                    />
                    <button
                      className="text-blue-600 font-medium hover:underline"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-500 hover:underline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-gray-700">
                      {tag.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(index)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTag(tag.id)}
                        className="text-red-600 text-sm hover:underline"
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
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
