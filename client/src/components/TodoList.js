// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'; // Import the CSS file for styling

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskDescription, setTaskDescription] = useState('');

    // Fetch tasks on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('/api/tasks');
                setTasks(res.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    // Add a new task
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!taskDescription.trim()) {
            alert('Please enter a task description.');
            return;
        }
        try {
            const res = await axios.post('/api/tasks', { description: taskDescription });
            setTasks([...tasks, res.data]);
            setTaskDescription('');
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Error adding task');
        }
    };

    // Toggle task completion
    const handleToggleComplete = async (task) => {
        try {
            await axios.put(`/api/tasks/${task._id}`, {
                completed: !task.completed,
            });
            setTasks(
                tasks.map((t) => (t._id === task._id ? { ...t, completed: !t.completed } : t))
            );
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Separate tasks into incomplete and completed
    const incompleteTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <div className="todo-list-container">
            <h2>To-Do List</h2>
            {/* Add New Task Form */}
            <form onSubmit={handleAddTask} className="add-task-form">
                <input
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Add a new task"
                    required
                />
                <button type="submit">Add Task</button>
            </form>
            <table className="todo-table">
                <thead>
                <tr>
                    <th>Incomplete Tasks</th>
                    <th>Completed Tasks</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {/* Incomplete Tasks Column */}
                    <td>
                        <ul className="task-list">
                            {incompleteTasks.map((task) => (
                                <li key={task._id} onClick={() => handleToggleComplete(task)}>
                                    <span className="bullet-point">•</span> {task.description}
                                </li>
                            ))}
                        </ul>
                    </td>
                    {/* Completed Tasks Column */}
                    <td>
                        <ul className="task-list">
                            {completedTasks.map((task) => (
                                <li key={task._id} onClick={() => handleToggleComplete(task)}>
                                    <span className="bullet-point">•</span> {task.description}
                                </li>
                            ))}
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TodoList;
