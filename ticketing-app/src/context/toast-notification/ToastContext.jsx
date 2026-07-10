import React, { createContext, useState } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({children}) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (toastProps) => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, {id, ...toastProps}]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{toasts, addToast, removeToast}}>
            {children}
        </ToastContext.Provider>
    );
};