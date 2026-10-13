import { useState } from 'react';
import type { Task } from './types/task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  //Add Task
  const handleAddTask = () => {
    let newTask: Task = {
      id: Date.now(),
      title: input,
      completed: false,
      createdAt: Date.now(),
    };
    //check if there is a whitespace or not then add the task
    if (input.trim()) setTasks((prevTasks) => [...prevTasks, newTask]);

    setInput('');
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
        <button onClick={handleAddTask}>Add task</button>
      </section>
      <section className='taskList'>
        📃
        <ul>
          {tasks.map((t) => (
            <li>{t.title}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
