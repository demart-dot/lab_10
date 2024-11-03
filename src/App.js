import React, { useState, useEffect } from 'react';
import './App.css';
import Expenses from './components/Expenses';
import NewExpense from './components/NewExpense';
import EditExpense from './components/EditExpense';
import Loader from './components/Loader';
import { getExpenses, addExpense, updateExpense, deleteExpense } from './components/localStorageService';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [editingExpense, setEditingExpense] = useState(null);
    const [loading, setLoading] = useState(true);

    // Завантаження даних із Local Storage при першому рендері
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const loadedExpenses = await getExpenses(); // Обрабатываем промис
                setExpenses(loadedExpenses);
            } catch (error) {
                setError('Не вдалося завантажити дані про витрати');
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    // Збереження даних у Local Storage при кожній зміні expenses
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    // Додавання нової витрати
    const addExpenseHandler = async (expense) => {
        try {
            const savedExpense = await addExpense(expense); // Обрабатываем промис
            setExpenses((prevExpenses) => [savedExpense, ...prevExpenses]);
        } catch (error) {
            setError('Не вдалося додати витрату');
        }
    };

    // Оновлення існуючої витрати
    const updateExpenseHandler = async (updatedExpense) => {
        try {
            await updateExpense(updatedExpense); // Обрабатываем промис
            setExpenses((prevExpenses) =>
                prevExpenses.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp))
            );
        } catch (error) {
            setError('Не вдалося оновити витрату');
        }
    };

    // Видалення витрати
    const deleteExpenseHandler = async (expenseId) => {
        try {
            await deleteExpense(expenseId); // Обрабатываем промис
            setExpenses((prevExpenses) => prevExpenses.filter(exp => exp.id !== expenseId));
        } catch (error) {
            setError('Не вдалося видалити витрату');
        }
    };

    // Відкриття режиму редагування
    const startEditingHandler = (expense) => {
        setEditingExpense(expense);
    };

    // Збереження змін після редагування
    const saveEditHandler = async (updatedExpense) => {
        await updateExpenseHandler(updatedExpense);
        setEditingExpense(null);
    };

    // Скасування редагування
    const cancelEditHandler = () => {
        setEditingExpense(null);
    };

    return (
        <div className="App">
            <h1>Expense Tracker</h1>
            {error && <p>{error}</p>}

            {loading ? (
                <Loader />
            ) : editingExpense ? (
                <EditExpense
                    expense={editingExpense}
                    onSave={saveEditHandler}
                    onCancel={cancelEditHandler}
                />
            ) : (
                <>
                    <NewExpense onAddExpense={addExpenseHandler} />
                    <Expenses
                        items={expenses}
                        onUpdateExpense={startEditingHandler}
                        onDeleteExpense={deleteExpenseHandler}
                    />
                </>
            )}
        </div>
    );
}

export default App;