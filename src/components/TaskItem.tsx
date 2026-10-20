import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
const TaskItem = (props: TaskItemProps) => {
  return (
    <li key={props.task.id}>
      <input
        type='checkbox'
        checked={props.task.completed}
        onChange={() => props.onToggle(props.task.id)}
      />
      <span className={props.task.completed ? 'taskCompleted' : ''}>
        {props.task.title}
      </span>
      <button
        className='deleteBtn'
        onClick={() => props.onDelete(props.task.id)}
      >
        🗑️
      </button>
    </li>
  );
};

export default TaskItem;
