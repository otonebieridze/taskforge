import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

type Props = {
  title: string;
  completed: boolean;
};

export default function TaskItem({ title, completed }: Props) {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded shadow w-full max-w-md mb-2">
      <span>{completed ? <FaCheckSquare /> : <FaRegSquare />}</span>
      <span>{title}</span>
    </div>
  );
}
