function TaskTable({ tasks }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Email</th>
          <th>Frequency</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>{task.name}</td>
            <td>{task.email}</td>
            <td>{task.frequency}</td>
            <td>{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
