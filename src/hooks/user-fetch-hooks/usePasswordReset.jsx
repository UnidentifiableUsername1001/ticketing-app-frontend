import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { config } from '../../../config';
import { ToastContext } from '../../context/toast-notification/ToastContext';

export function usePasswordReset () {
    const url = `${config.backendUrl}/api/auth/password-reset`;
    const jwt = sessionStorage.getItem('auth-token');
    const navigate = useNavigate();

    const {addToast} = useContext(ToastContext);

    const mutationResult = useMutation({
        mutationFn: async (payload) => {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status} - ${response}`);
            };

            const data = await response.json();

            return data;
        },

        onSuccess: (result) => {
            addToast({msg: `Password updated`, type: 'success'});
            navigate('/login');
        },

        onError: (error) => {
            addToast({msg: `Error: ${error.message ? error.message : error}`});
            console.log(error);
        } 
    });

    return {
        resetPassFunc: mutationResult.mutate,
        isResetting: mutationResult.isPending,
        errorResetting: mutationResult.isError
    }
}