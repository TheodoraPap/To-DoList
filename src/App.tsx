import React, { useState, useEffect } from 'react';
import './App.css';

type Task = {
  text: string;
  completed: boolean;
};

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Φόρτωσε από localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Αποθήκευση στο localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() === '') return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }

    setTask('');
  };

  const handleDelete = (index: number) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleEdit = (index: number) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">To-Do List</h1>

        {/* input */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleAddTask}>{editIndex !== null ? 'Update' : 'Add'}</button>
        </div>

        {/* Δύο στήλες */}
        <div className="columns">
          {/* Όλα τα Tasks */}
          <div className="column">
            <h2>All Tasks</h2>
            <ul className="task-list">
              {tasks.map((t, index) => (
                <li key={index} className="task-item">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(index)}
                  />
                  <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                    {t.text}
                  </span>
                  <div>
                  <div className="button-group">
                    <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Ολοκληρωμένα */}
          <div className="column">
            <h2>Completed</h2>
            <ul className="task-list">
              {tasks
                .filter((t) => t.completed)
                .map((t, index) => (
                  <li key={index} className="task-item">
                    ✅ {t.text}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
