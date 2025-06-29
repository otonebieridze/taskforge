import TaskItem from "./TaskItem";

export default function TaskList() {
  return (
    <div>
      <TaskItem title="Buy groceries" completed={true} />
      <TaskItem title="Learn React" completed={false} />
      <TaskItem title="Push code to GitHub" completed={false} />
    </div>
  );
}
