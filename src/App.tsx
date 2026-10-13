import { useState } from 'react';
import type { Task } from './types/task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  return (
    <>
      <header>
        <h1>👑 Taskueen</h1>
        <h6>Rule your day, one task at a time!</h6>
      </header>
      <section className='taskInput'>
        <input type='text' name='' id='' placeholder='What needs to ne done?' />
        <button>Add task</button>
      </section>
      <section className="taskList">
        <p>📃 No task available!</p>
      </section>
    </>
  );
}

export default App;
