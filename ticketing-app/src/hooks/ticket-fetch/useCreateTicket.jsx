import React, { useContext } from 'react';
import { config } from '../../../config';
import { useMutation } from '@tanstack/react-query';
import { ToastContext } from '../../context/toast-notification/ToastContext';
import { useNavigate } from 'react-router';

export function useCreateTicket() {

    const navigate = useNavigate();

    const urlTickets = `${config.backendUrl}/api/ticket/create`;
    const jwtInStore = sessionStorage.getItem('auth-token');

    const { addToast } = useContext(ToastContext);

    const mutationResult = useMutation({
        mutationFn: async (payload) => {

            const response = await fetch(urlTickets, {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`,

                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            return data;

        },

        onSuccess: (result) => {

            addToast({msg: `${result.message}`, type: 'success'});
        },

        onError: (error) => {
            addToast({msg: `${error.message}`, type: 'error'});

            console.log(error);
        }
    });
    
    return {
        createTicket: mutationResult.mutate,       
        isCreating: mutationResult.isPending,      
        creationError: mutationResult.error,       
  };
};