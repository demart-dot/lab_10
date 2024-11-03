import React, { useState } from 'react';

function EditExpense({ expense, onSave, onCancel }) {
    const [title, setTitle] = useState(expense.title);
    const [amount, setAmount] = useState(expense.amount);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...expense, title, amount: parseFloat(amount) });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Назва витрати" 
                required 
            />
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Сума" 
                required 
            />
            <button type="submit">Зберегти</button>
            <button type="button" onClick={onCancel}>Скасувати</button>
        </form>
    );
}

export default EditExpense;