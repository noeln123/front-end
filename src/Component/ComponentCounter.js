// Counter.js
import React, { useState, useEffect } from 'react';

const Counter = ({ endNumber, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const stepTime = duration / endNumber;
        const interval = setInterval(() => {
            setCount(prevCount => (prevCount < endNumber ? prevCount + 1 : prevCount));
        }, stepTime);

        return () => clearInterval(interval);
    }, [endNumber, duration]);

    return <span>{count}</span>;
};

export default Counter;
