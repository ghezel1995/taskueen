import { useState } from 'react';
import type { Task } from './types/task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  //Add Task
  const handleAddTask = () => {
    //If the input is empty, the function stops immediately.
    // This makes the rest of the handler easier to read.
    if (!input.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: input,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    setInput('');
  };

  const handleToggle = (targetId: number) => {
    setTasks((prevTask) =>
      prevTask.map((task) =>
        task.id === targetId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };
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
      <section className='taskList'>
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              <input
                type='checkbox'
                checked={t.completed}
                onChange={() => handleToggle(t.id)}
              />
              <span className={t.completed ? 'taskCompleted' : ''}>
                {t.title}
              </span>
              <button className='deleteBtn' onClick={() => handleDelete(t.id)}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
