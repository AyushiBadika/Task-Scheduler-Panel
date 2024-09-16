import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { name, frequency, status: "pending", email };
    addTask(newTask);
    setName(""); // Reset form fields
    setFrequency("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Task Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="frequency">Frequency:</label>
        <input type="text" id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
