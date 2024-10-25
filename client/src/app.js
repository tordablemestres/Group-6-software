import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BudgetInputForm from './components/BudgetInputForm';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Signup from './components/Signup';

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
                            <>
                                <BudgetInputForm />
                                <TodoList />
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

function App2() {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
}

export default App;
