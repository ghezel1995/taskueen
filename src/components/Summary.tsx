import type { Task, Filter } from '../types/task';
import './Summary.css';
interface TasksProps {
  tasks: Task[];
  setFilter: (value: Filter) => void;
}

const Summary = ({ tasks, setFilter }: TasksProps) => {
  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.filter((t) => !t.completed).length;
  return (
    <div className='summary'>
      <section className='total' onClick={() => setFilter('all')}>
        <h3>{totalCount}</h3>
        <small>Total</small>
      </section>
      <section className='completed' onClick={() => setFilter('completed')}>
        <h3>{completedCount}</h3>
        <small>Completed</small>
      </section>
      <section className='remaining' onClick={() => setFilter('active')}>
        <h3>{remainingCount}</h3>
        <small>Remaining</small>
      </section>
    </div>
  );
};

export default Summary;
