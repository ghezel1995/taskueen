import { useState } from 'react';
import type { Task } from '../types/task';

//Object destructuring
const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  //Handling the Add Task Button
  const handleAddTask = (title: string) => {
    const now = Date.now();

    const newTask: Task = {
      id: now,
      title: title.trim(),
      completed: false,
      createdAt: now,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
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

  return {
    tasks,
    handleAddTask,
    handleToggle,
    handleDelete,
  };
};

export default useTasks;
