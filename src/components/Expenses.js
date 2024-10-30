import React, { useState } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import Card from './Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesChart from './ExpensesChart';

function Expenses(props) {
    // Состояние для выбранного года
    const [filteredYear, setFilteredYear] = useState('2024');

    // Обработчик изменения фильтра
    const filterChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
    };

    // Фильтруем расходы по выбранному году
    const filteredExpenses = props.items.filter((expense) => {
        return expense.date.getFullYear().toString() === filteredYear;
    });

    return (
        <div>
            <Card className="expenses">
                {/* Фильтр по году */}
                <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
                {/* Гистограмма расходов */}
                <ExpensesChart expenses={filteredExpenses} />
                {/* Отображение списка расходов */}
                {filteredExpenses.length === 0 ? (
                    <p>Нет расходов за выбранный год.</p>
                ) : (
                    filteredExpenses.map((expense) => (
                        <ExpenseItem
                            key={expense.id}
                            title={expense.title}
                            amount={expense.amount}
                            date={expense.date}
                        />
                    ))
                )}
            </Card>
        </div>
    );
}

export default Expenses;