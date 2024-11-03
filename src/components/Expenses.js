import React, { useState } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import Card from './Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesChart from './ExpensesChart';

function Expenses(props) {
    // Стан для вибраного року
    const [filteredYear, setFilteredYear] = useState('2024');

    // Обробник зміни фільтра
    const filterChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
    };

    // Фільтруємо витрати за вибраним роком
    const filteredExpenses = props.items.filter((expense) => {
        return expense.date.getFullYear().toString() === filteredYear;
    });

    return (
        <div>
            <Card className="expenses">
                {/* Фільтр по року */}
                <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
                {/* Гістограма витрат */}
                <ExpensesChart expenses={filteredExpenses} />
                {/* Відображення списку витрат */}
                {filteredExpenses.length === 0 ? (
                    <p>Немає витрат за обраний рік.</p>
                ) : (
                    filteredExpenses.map((expense) => (
                        <div key={expense.id} className="expense-item">
                            <ExpenseItem
                                title={expense.title}
                                amount={expense.amount}
                                date={expense.date}
                            />
                            {/* Кнопка редагування витрати */}
                            <button onClick={() => props.onUpdateExpense(expense)}>Редагувати</button>
                            {/* Кнопка видалення витрати */}
                            <button onClick={() => props.onDeleteExpense(expense.id)}>Видалити</button>
                        </div>
                    ))
                )}
            </Card>
        </div>
    );
}

export default Expenses;