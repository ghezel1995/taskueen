import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import useTasks from './hooks/useTasks';
import './App.css';
import CursorFollower from './components/cursor-follower/CursorFollower';
import Summary from './components/Summary';
import type { Filter } from './types/task';
type Theme = 'light' | 'dark';

function App() {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem('taskueen-theme') === 'dark' ? 'dark' : 'light',
  );
  const { tasks, handleAddTask, handleToggle, handleDelete } = useTasks();

  useEffect(() => {
    document.documentElement.dataset.theme = theme; // <html data-theme="dark">
    localStorage.setItem('taskueen-theme', theme);
  }, [theme]);

  //Handling the Filtering
  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed; //If completed is false
    if (filter === 'completed') return t.completed; //If completed is true
    return true;
  });

  return (
    <>
      <button
        className='themeToggle'
        onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        aria-label={
          theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
        }
        title={theme === 'light' ? 'Dark mode' : 'Light mode'}
      >
        <span key={theme}>{theme === 'light' ? '🌙' : '☀️'}</span>
      </button>
      
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <header>
        <h1>👑 Taskueen</h1>
        <h6>Rule your day, one task at a time!</h6>
      </header>
        <CursorFollower size={240} basePath='/animation' />
      </div>

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
      <Summary tasks={tasks} setFilter={setFilter} />

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
        <>
          <p>There is no task to be done!</p>
        </>
      )}
    </>
  );
}

export default App;
