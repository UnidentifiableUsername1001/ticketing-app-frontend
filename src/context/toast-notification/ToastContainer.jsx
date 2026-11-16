import React, { useContext } from 'react';
import { ToastContext } from './ToastContext';
import { Toast } from './Toast';

export const ToastContainer = () => {
    const { toasts, removeToast } = useContext(ToastContext);

    return (
        <div className='
            fixed top-30 right-50 w-fit flex flex-col gap-5 z-50
        '>
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};