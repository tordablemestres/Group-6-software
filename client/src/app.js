// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BudgetInputForm from './components/BudgetInputForm';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

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
                                <BudgetInputForm />
                                <TodoList />
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
