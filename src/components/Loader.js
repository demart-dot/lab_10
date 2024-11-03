// src/components/Loader.js
import React from 'react';
import './Loader.css'; // Импортируйте CSS файл для загрузчика

const Loader = () => {
    return (
        <div className="loader">
            {/* Здесь может быть ваша анимация загрузчика */}
            <div className="spinner"></div>
        </div>
    );
};

export default Loader;