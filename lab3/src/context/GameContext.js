import React, { createContext, useState } from 'react';

export const GameContext = createContext();

const initialTasks = [
    { id: 'tap10', title: 'Зробити 10 кліків', target: 10, current: 0, completed: false },
    { id: 'doubleTap5', title: 'Зробити подвійний клік 5 разів', target: 5, current: 0, completed: false },
    { id: 'longPress3s', title: 'Утримувати об`єкт 3 секунди', target: 1, current: 0, completed: false },
    { id: 'drag', title: 'Перетягнути об`єкт', target: 1, current: 0, completed: false },
    { id: 'swipeRight', title: 'Зробити свайп вправо', target: 1, current: 0, completed: false },
    { id: 'swipeLeft', title: 'Зробити свайп вліво', target: 1, current: 0, completed: false },
    { id: 'resize', title: 'Змінити розмір об`єкта', target: 1, current: 0, completed: false },
    { id: 'score100', title: 'Отримати 100 очок', target: 100, current: 0, completed: false },
    { id: 'customTask', title: 'Використати масштабування 5 разів', target: 5, current: 0, completed: false }
];

export const GameProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [tasks, setTasks] = useState(initialTasks);

    const updateTask = (id, amount = 1) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id && !task.completed) {
                const newCurrent = Math.min(task.current + amount, task.target);
                return { ...task, current: newCurrent, completed: newCurrent >= task.target };
            }
            return task;
        }));
    };

    const addScore = (points) => {
        setScore(prev => {
            const newScore = prev + points;
            updateTask('score100', newScore);
            return newScore;
        });
    };

    return (
        <GameContext.Provider value={{ score, tasks, addScore, updateTask }}>
            {children}
        </GameContext.Provider>
    );
};