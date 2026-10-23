import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
//component composition
const TaskList = (props: TaskListProps) => {
  return (
    <ul>
      {props.tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={props.onToggle}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
