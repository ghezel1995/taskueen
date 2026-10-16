import { useState } from 'react';
import type { Task } from './types/task';
import './App.css';

function App() {
  type Filter = 'all' | 'active' | 'completed';

  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  //Handling the Add Task Button
  const handleAddTask = () => {
    //If the input is empty, the function stops immediately.
    // This makes the rest of the handler easier to read.
    if (!input.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: input.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    setInput('');
  };

  //Handling the completed button
  const handleToggle = (targetId: number) => {
    setTasks((prevTask) =>
      prevTask.map((task) =>
        task.id === targetId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  //Handling the Delete Button
  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  //Handling the Filtering
  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
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
        <button className='addBtn' onClick={handleAddTask}>
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
            <option value='active'>Activd</option>
            <option value='completed'>Completed</option>
          </select>
          <section className='taskList'>
            <ul>
              {visibleTasks.map((t) => (
                <li key={t.id}>
                  <input
                    type='checkbox'
                    checked={t.completed}
                    onChange={() => handleToggle(t.id)}
                  />
                  <span className={t.completed ? 'taskCompleted' : ''}>
                    {t.title}
                  </span>
                  <button
                    className='deleteBtn'
                    onClick={() => handleDelete(t.id)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        'There is no task to be done!'
      )}
    </>
  );
}

export default App;
