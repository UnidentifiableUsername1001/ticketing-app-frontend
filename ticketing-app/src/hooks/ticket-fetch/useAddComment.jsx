import React, {useContext} from 'react';
import { config } from '../../../config';
import { useMutation } from '@tanstack/react-query';
import { ToastContext } from '../../context/toast-notification/ToastContext';
import { useParams } from 'react-router';

export function useAddComment() {

    const jwt = sessionStorage.getItem('auth-token');
    const params = useParams();
    const url = `${config.backendUrl}/api/ticket/${params.ticketId}/add-comment`

    const {addToast} = useContext(ToastContext);

    const mutationResult = useMutation({
        mutationFn: async (payload) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON',
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
            addToast({msg: 'Comment added!', type: 'success'});
        },

        onError: (error) => {
            addToast({msg: `Error: ${error.message ? error.message : error}`});
            console.log(error);
        }
    });

    return {
        addComment: mutationResult.mutate,
        isAdding: mutationResult.isPending,
        errorAdding: mutationResult.isError
    }
};