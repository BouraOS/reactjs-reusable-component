import React, { useState } from "react";
import { currentUser, tasks } from "./DummyData";
import { hasActionPermission } from "./hasActionPermission";

const TaskManager = () => {
  const [taskList, setTaskList] = useState(tasks);
  const [newTask, setNewTask] = useState("");

  const visibleTasks = hasActionPermission(currentUser.role, "view_all")
    ? taskList
    : taskList.filter((task) => task.userId === currentUser.id);

  const handleAddTask = () => {
    if (!hasActionPermission(currentUser.role, "add")) {
      alert("You do not have permission to add tasks.");
      return;
    }

    const newTaskObj = {
      id: taskList.length + 1,
      title: newTask,
      userId: currentUser.id,
    };

    setTaskList([...taskList, newTaskObj]);
    setNewTask("");
  };

  const handleUpdateTask = (id, newTitle, task) => {
    if (!hasActionPermission(currentUser.role, "edit", task)) {
      alert("You do not have permission to update this task.");
      return;
    }

    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const handleDeleteTask = (id, task) => {
    if (!hasActionPermission(currentUser.role, "delete", task)) {
      alert("You do not have permission to delete this task.");
      return;
    }
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <h2>Welcome, {currentUser.name}</h2>
      {currentUser.role && <h3>Role: {currentUser.role}</h3>}
      <ul>
        {visibleTasks.map((task) => (
          <li key={task.id}>
            {task.title}
            {task.status === "pending" ? " (Pending)" : " (Completed)"}
            {hasActionPermission(currentUser.role, "edit", task) ? (
              <button
                onClick={() =>
                  handleUpdateTask(task.id, `${task.title} (Updated)`, task)
                }
              >
                Update
              </button>
            ) : null}
            {hasActionPermission(currentUser.role, "delete", task) ? (
              <button onClick={() => handleDeleteTask(task.id, task)}>
                Delete
              </button>
            ) : null}
          </li>
        ))}
      </ul>
      {hasActionPermission(currentUser.role, "add") && (
        <div>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
    </div>
  );
};
export default TaskManager;
