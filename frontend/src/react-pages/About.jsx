import React, { useState, useEffect } from 'react';
import "./About.scss";

function About() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Create or Update task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskInput.trim()) return;

    if (isEditing) {
      setTasks(tasks.map(task =>
        task.id === currentTaskId ? { ...task, text: taskInput } : task
      ));
      setIsEditing(false);
      setCurrentTaskId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setTaskInput('');
  };

  // Delete task
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Edit task
  const handleEdit = (task) => {
    setIsEditing(true);
    setTaskInput(task.text);
    setCurrentTaskId(task.id);
  };

  // Toggle complete status
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="app">
      <h1>📝 To-Do List (CRUD)</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
            <div>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;
