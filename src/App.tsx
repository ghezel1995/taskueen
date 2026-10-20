import { useState } from 'react';
import type { Task } from './types/task';
import TaskList from './components/TaskList';
import './App.css';

type Filter = 'all' | 'active' | 'completed';
function App() {
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
