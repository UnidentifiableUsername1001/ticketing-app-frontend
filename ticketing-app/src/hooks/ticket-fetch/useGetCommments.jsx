import React, {useContext} from 'react';
import { config } from '../../../config';
import { useQuery } from '@tanstack/react-query';
import { ToastContext } from '../../context/toast-notification/ToastContext';

export function useGetComments(ticketId) {

    const jwt = sessionStorage.getItem('auth-token');
    const {addToast} = useContext(ToastContext);

    const queryResult = useQuery({
        queryKey: ['comments', ticketId],

        queryFn: async (payload) => {

            const url = `${config.backendUrl}/api/ticket/${ticketId}/get-comments`

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON',
                    Authorization: `Bearer ${jwt}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status} - ${response.message}`);
            }

            const data = await response.json();

            return data;
        },

        enabled: !!ticketId
    });

    return {
        comments: queryResult.data,
        isGettingComments: queryResult.isPending,
        errorGettingComments: queryResult.isError
    }
};