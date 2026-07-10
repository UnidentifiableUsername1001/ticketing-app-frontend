import React, { useContext } from 'react';
import { ToastContext } from './ToastContext';
import { Toast } from './Toast';

export const ToastContainer = () => {
    const { toasts, removeToast } = useContext(ToastContext);

    return (
        <div className=''>
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};