// client/src/App.js
import React from 'react';
import BudgetInputForm from './components/BudgetInputForm';
import TodoList from './components/TodoList';

function App() {
    return (
        <div className="App">
            <BudgetInputForm />
            <TodoList />
        </div>
    );
}

export default App;
