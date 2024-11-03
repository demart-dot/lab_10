// Получение всех расходов из Local Storage
export const getExpenses = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const expenses = localStorage.getItem('expenses');
            resolve(expenses ? JSON.parse(expenses) : []);
        }, 200); // Задержка в 200 мс для имитации асинхронности
    });
};

// Добавление нового расхода в Local Storage
export const addExpense = async (expense) => {
    const expenses = await getExpenses(); // Ждем получения расходов
    const expenseWithId = { ...expense, id: Math.random().toString() }; // добавляем уникальный id
    expenses.push(expenseWithId);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    return expenseWithId; // возвращаем объект с id
};

// Обновление существующего расхода в Local Storage
export const updateExpense = async (updatedExpense) => {
    const expenses = await getExpenses(); // Ждем получения расходов
    const expenseIndex = expenses.findIndex(exp => exp.id === updatedExpense.id);
    if (expenseIndex >= 0) {
        expenses[expenseIndex] = updatedExpense;
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
};

// Удаление расхода из Local Storage
export const deleteExpense = async (expenseId) => {
    const expenses = await getExpenses(); // Ждем получения расходов
    const updatedExpenses = expenses.filter(exp => exp.id !== expenseId);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
};