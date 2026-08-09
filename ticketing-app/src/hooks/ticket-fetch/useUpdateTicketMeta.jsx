import React, { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ToastContext } from '../../context/toast-notification/ToastContext';
import { config } from '../../../config';
import { useParams } from 'react-router';

export function useUpdateTicketMeta() {

    const params = useParams();
    const url = `${config.backendUrl}/api/ticket/${params.ticketId}/update`;
    const jwt = sessionStorage.getItem('auth-token');
    const { addToast } = useContext(ToastContext);

    const mutationResult = useMutation({
        mutationFn: async (payload) => {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status} - ${response}`);
            }

            const data = await response.json();

            return data;
        },

        onSuccess: (result) => {
            addToast({msg: `Saved changes to ticket ${params.ticketId}`, type: 'success'});
        },

        onError: (error) => {
            addToast({msg: `Error: ${error.message ? error.message : error}`});
            console.log(error);
        } 
    });

    return {
        updateTicket: mutationResult.mutate,
        ticketUpdating: mutationResult.isPending,
        errorUpdatingTicket: mutationResult.isError,
        ticketUpdated: mutationResult.isSuccess
    }
}