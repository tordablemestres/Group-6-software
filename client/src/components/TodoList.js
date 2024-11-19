// client/src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import './TodoList.css';

function TodoList() {
    const [taskName, setTaskName] = useState('');
    const [tasksPending, setTasksPending] = useState([]);
    const [tasksCompleted, setTasksCompleted] = useState([]);

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Function to fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const tasks = await taskService.getTasks();
            setTasksPending(tasks.filter((task) => !task.completed));
            setTasksCompleted(tasks.filter((task) => task.completed));
        } catch (err) {
            console.error(err);
        }
    };

    // Function to add a new task
    const addTask = async (e) => {
        e.preventDefault();
        if (taskName.trim() === '') return;

        try {
            const newTask = await taskService.addTask({ name: taskName });
            setTasksPending([newTask, ...tasksPending]);
            setTaskName('');
        } catch (err) {
            console.error(err);
        }
    };

    // Function to mark a task as completed
    const completeTask = async (id) => {
        try {
            const updatedTask = await taskService.updateTask(id, { completed: true });
            setTasksPending(tasksPending.filter((task) => task._id !== id));
            setTasksCompleted([updatedTask, ...tasksCompleted]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="todo-container">
            <h2>To-Do List</h2>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>

            <h3>Pending Tasks</h3>
            <ul>
                {tasksPending.map((task) => (
                    <li key={task._id}>
                        {task.name}
                        <button onClick={() => completeTask(task._id)}>Mark as Done</button>
                    </li>
                ))}
            </ul>

            <h3>Completed Tasks</h3>
            <ul>
                {tasksCompleted.map((task) => (
                    <li key={task._id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
