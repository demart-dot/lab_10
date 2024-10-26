// src/App.js
import './App.css';
import Expenses from './components/Expenses';

function App() {
    // Статичный массив данных о расходах
    const expenses = [
        { id: 'e1', title: 'Toilet Paper', amount: 94.12, date: new Date(2024, 7, 14) },
        { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2024, 2, 12) },
        { id: 'e3', title: 'Car Insurance', amount: 294.67, date: new Date(2024, 2, 28) },
        { id: 'e4', title: 'New Desk (Wooden)', amount: 450, date: new Date(2024, 5, 12) }
    ];

    return (
        <div className="App">
            <h1>Expense Tracker</h1>
            {/* Передаем массив расходов в компонент Expenses */}
            <Expenses items={expenses} />
        </div>
    );
}

export default App;