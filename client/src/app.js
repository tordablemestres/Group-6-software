// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BudgetInputForm from './components/BudgetInputForm';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Signup from './components/Signup';
import CalendarComponent from './components/CalendarComponent';
import './App.css'; // Import the new CSS file

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Login Route */}
                    <Route path="/" element={<Login />} />
                    {/* Signup Route */}
                    <Route path="/signup" element={<Signup />} />
                    {/* Main Application Route */}
                    <Route
                        path="/home"
                        element={
                            <div className="main-container">
                                <div className="sidebar">
                                    <BudgetInputForm />
                                </div>
                                <div className="calendar">
                                    <CalendarComponent />
                                </div>
                                <div className="sidebar">
                                    <TodoList />
                                </div>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
