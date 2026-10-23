import { useState } from 'react';
import TaskList from './components/TaskList';
import useTasks from './hooks/useTasks';
import './App.css';

type Filter = 'all' | 'active' | 'completed';
function App() {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const { tasks, handleAddTask, handleToggle, handleDelete } = useTasks();

  //Handling the Filtering
  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed; //If completed is false
    if (filter === 'completed') return t.completed; //If completed is true
    return true;
  });

  return (
    <>
      <header>
        <h1>👑 Taskueen</h1>
        <h6>Rule your day, one task at a time!</h6>
      </header>
      
      <section className='taskInput'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='What needs to be done?'
        />
        <button
          className='addBtn'
          onClick={() => {
            if (!input.trim()) return;

            handleAddTask(input);
            setInput('');
          }}
        >
          Add task
        </button>
      </section>

      {tasks.length > 0 ? (
        <>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
          >
            <option value='all'>All</option>
            <option value='active'>Active</option>
            <option value='completed'>Completed</option>
          </select>
          <section className='taskList'>
            <TaskList
              tasks={visibleTasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          </section>
        </>
      ) : (
        'There is no task to be done!'
      )}
    </>
  );
}

export default App;
