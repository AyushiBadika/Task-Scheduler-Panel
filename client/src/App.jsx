import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from API on component mount
  useEffect(() => {
    alert("Please use your email and paas key to test");
    fetchTasks();
  }, []);

  async function fetchTasks() {
    await fetch("https://task-scheduler-panel.onrender.com/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }

  // Add new task to the task list
  const addTask = async (newTask) => {
    await fetch("https://task-scheduler-panel.onrender.com/add-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then(() => setTasks([...tasks, newTask])) // Update UI after adding task
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <h1>Task Scheduler</h1>
      <TaskForm addTask={addTask} />
      <TaskTable tasks={tasks} />
    </div>
  );
}

export default App;
