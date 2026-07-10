import React, { useEffect } from 'react';

export const Toast = ({ id, msg, type, duration = 3000, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(id), duration);
    }, [id, duration, onClose])

    return (
        <div className={`toast toast-${type}`}>
            {msg}
        </div>
    );
};